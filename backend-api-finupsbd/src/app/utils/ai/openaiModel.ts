import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const opanAiModel = async (imageData: string) => {
  const model = 'gpt-4o-mini';

  const response = await openai.chat.completions.create({
    model: model,
    messages: [
      {
        role: 'user',
        content: 'Please transcribe all the text in this image, exactly as it appears.',
      },
    ],
  });

  return response.choices[0].message.content as string;
};

export default opanAiModel;
