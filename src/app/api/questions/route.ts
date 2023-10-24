import { db } from '@/db';
import { getUser } from '@/lib/auth';
import { openai } from '@/lib/openai';
import { getPineconeClient } from '@/lib/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { fileId, lang } = body;


  const user = await getUser();
  const loggedInUserId = user?.id

  if (!loggedInUserId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Configuration
  const openAIApiKey = process.env.OPENAI_API_KEY;
  const modelName = process.env.OPENAI_LANGUAGE_MODEL!;
  const maxResults = 5;
  const temperature = 0.2;
  const assistantName = 'PDF Genius';

  // 1: Vectorize message
  const embeddings = new OpenAIEmbeddings({ openAIApiKey });
  const pinecone = await getPineconeClient();
  const pineconeIndex = pinecone.Index('genius');

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: fileId,
  });

  const results = await vectorStore.similaritySearch('', maxResults);

  const prevMessages = await db.message.findMany({
    where: {
      fileId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 6,
  });


  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage ? 'user' : 'assistant',
    content: msg.text,
  }));

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
  `;

  const promptLanguage:any = {
    'en': `Generate 5 possible questions based on the following context:\n\n${contextDescription}, 
           Important: try to anticipate the questions that the user may have and provide them accordingly`,
    'pt-br': `Gere 5 possíveis perguntas com base no seguinte contexto:\n\n${contextDescription}, 
              Importante: tente antecipar as perguntas que o usuário pode ter e forneça-as de acordo`
  };


  // AI QUESTIONS GENERATED
  const questionGenerationResponse = await openai.chat.completions.create({
    model: modelName,
    temperature,
    messages: [
      {
        role: 'system',
        content: promptLanguage[lang] || promptLanguage['en']
      },
    ],
    n: 5,
  });

  function removeQuestionPrefix(question: string): string {
    return question.replace(/^\d+\.\s/, '');
  }

  if (questionGenerationResponse && questionGenerationResponse.choices) {
    const generatedQuestionsArray = questionGenerationResponse.choices[0]?.message?.content?.split('\n').filter((question) => question.trim() !== '');

    if (generatedQuestionsArray) {
      const questionsWithoutPrefix = generatedQuestionsArray.map(removeQuestionPrefix);

      return new Response(JSON.stringify(questionsWithoutPrefix), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    return new Response('Unable to generate questions', { status: 500 });
  }
};
