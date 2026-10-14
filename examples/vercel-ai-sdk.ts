import { openai } from '@ai-sdk/openai';
import { generateText, wrapLanguageModel } from 'ai';
import { createConverraMiddleware } from '@converra/ai-sdk-middleware';

const apiKey = process.env.CONVERRA_API_KEY;
if (!apiKey) throw new Error('CONVERRA_API_KEY is required');
const model = wrapLanguageModel({
  model: openai('gpt-4o-mini'),
  middleware: createConverraMiddleware({
    apiKey,
    promptName: 'Support agent',
    batchSize: 1,
  }),
});

// Running this calls a model and uploads a captured run. Obtain authority first.
const result = await generateText({ model, prompt: 'How can I contact support?' });
console.log(result.text);
