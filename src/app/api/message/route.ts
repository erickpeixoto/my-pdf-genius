import { db } from '@/db'
import { openai } from '@/lib/openai'
import { getPineconeClient } from '@/lib/pinecone'
import { SendMessageValidator } from '@/lib/validators/SendMessageValidator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { NextRequest } from 'next/server'

import { OpenAIStream, StreamingTextResponse } from 'ai'


export const POST = async (req: NextRequest) => {


  const body = await req.json()
  const { getUser } = getKindeServerSession()
  const user = getUser()

  const { id: loggedInUserId } = user

  if (!loggedInUserId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { fileId, message, lang } = SendMessageValidator.parse(body)

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: loggedInUserId,
    },
  })

  if (!file) {
    return new Response('File not found', { status: 404 })
  }

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId: loggedInUserId,
      fileId,
    },
  })

  // Configuration
  const openAIApiKey = process.env.OPENAI_API_KEY
  const modelName = process.env.OPENAI_LANGUAGE_MODEL!
  const maxResults = 5
  const temperature = 0.2
  const assistantName = 'PDF Genius'

  // 1: Vectorize message
  const embeddings = new OpenAIEmbeddings({ openAIApiKey })
  const pinecone = await getPineconeClient()
  const pineconeIndex = pinecone.Index('genius')

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: file.id,
  })

  const results = await vectorStore.similaritySearch(message, maxResults)

  const prevMessages = await db.message.findMany({
    where: {
      fileId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 6,
  })

  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage ? 'user' : 'assistant',
    content: msg.text,
  }))

  
  const contextDescription = `
  ${lang === 'pt-br' ? 'CONVERSA ANTERIOR:' : 'PREVIOUS CONVERSATION:'}
  ${formattedPrevMessages
   .map((message) => {
     if (message.role === 'user') return `${lang === 'pt-br' ? 'Usuário' : 'User'}: ${message.content}\n`;
     return `${assistantName}: ${message.content}\n`;
   })
   .join('')}
   ----------------
   ${lang === 'pt-br' ? 'CONTEXTO:' : 'CONTEXT:'}
   ${results.map((r) => r.pageContent).join('\n\n')}
   
   ----------------
   
   ${lang === 'pt-br' ? 'MENSAGEM DO USUÁRIO:' : 'USER INPUT:'}
   ${message}
 `;

 const promptLanguage:any = {
  'en': {
    system: `Use the following pieces of context to answer the user's question in markdown format`,
    user: contextDescription
  },
  'pt-br': {
    system: `Use os seguintes pedaços de contexto para responder à pergunta do usuário no formato markdown`,
    user: contextDescription  
  }
};


  const response = await openai.chat.completions.create({
    model: modelName,
    temperature,
    stream: true,
    messages: [
      {
        role: 'system',
        content: promptLanguage[lang!]?.system || promptLanguage['en'].system,
      },
      {
        role: 'user',
        content: promptLanguage[lang!]?.user || promptLanguage['en'].user,
      },
    ],
  })

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      await db.message.create({
        data: {
          text: completion,
          isUserMessage: false,
          fileId,
          userId: loggedInUserId,
        },
      })
    },
  })
  
  return new StreamingTextResponse(stream)
}
