import { db } from '@/db';
import { openai } from '@/lib/openai';
import { getPineconeClient } from '@/lib/pinecone';
import { SendMessageValidator } from '@/lib/validators/SendMessageValidator';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { fileId } = body;

  const { getUser } = getKindeServerSession();
  const user = getUser();

  const { id: loggedInUserId } = user;

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
    PREVIOUS CONVERSATION:
    ${formattedPrevMessages
      .map((message) => {
        if (message.role === 'user') return `User: ${message.content}\n`;
        return `${assistantName}: ${message.content}\n`;
      })
      .join('')}
    ----------------
    CONTEXT:
    ${results.map((r) => r.pageContent).join('\n\n')}
  `;

  // AI QUESTIONS GENERATED
  const questionGenerationResponse = await openai.chat.completions.create({
    model: modelName,
    temperature,
    messages: [
      {
        role: 'system',
        content: `Generate 5 possible questions based on the following context:\n\n${contextDescription}, 
        Important: try to anticipate the questions that the user may have and provide them accordingly`,
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
