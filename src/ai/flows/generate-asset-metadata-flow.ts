'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating and refining asset metadata.
 *
 * - generateAssetMetadata - A function that leverages AI to suggest relevant tags and refine captions for portfolio assets.
 * - GenerateAssetMetadataInput - The input type for the generateAssetMetadata function.
 * - GenerateAssetMetadataOutput - The return type for the generateAssetMetadata function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateAssetMetadataInputSchema = z.object({
  assetUrl: z.string().url().describe('The URL of the asset (image or video).'),
  currentCaption: z.string().describe('The current caption provided by the user.').optional(),
  imageDataUri: z
    .string()
    .describe(
      "Optional: The image data as a data URI if the asset is an image. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
    .optional(),
});
export type GenerateAssetMetadataInput = z.infer<typeof GenerateAssetMetadataInputSchema>;

const GenerateAssetMetadataOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe('An array of relevant and concise tags suggested by the AI.'),
  refinedCaption: z
    .string()
    .describe('A refined, engaging, and descriptive version of the original caption.'),
});
export type GenerateAssetMetadataOutput = z.infer<typeof GenerateAssetMetadataOutputSchema>;

export async function generateAssetMetadata(
  input: GenerateAssetMetadataInput
): Promise<GenerateAssetMetadataOutput> {
  return generateAssetMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAssetMetadataPrompt',
  input: { schema: GenerateAssetMetadataInputSchema },
  output: { schema: GenerateAssetMetadataOutputSchema },
  prompt: `You are an expert portfolio curator and content strategist. Your task is to analyze an asset and its provided caption, then generate a list of 5-10 highly relevant and concise tags, and also refine the existing caption to be more engaging, descriptive, and suitable for a professional portfolio, focusing on clarity, impact, and discoverability.

Instructions:
1. Analyze the asset provided by its URL and optionally its image data.
2. Review the 'currentCaption'. If it's empty, create a new, compelling caption.
3. Generate an array of 5-10 short, relevant keywords or phrases as 'suggestedTags'. Consider the content, style, and potential audience of the asset.
4. Refine the 'currentCaption' into 'refinedCaption'. Enhance its descriptiveness, improve flow, and ensure it highlights the key aspects of the asset in a professional tone. Make it concise yet informative.

Asset URL: {{{assetUrl}}}
{{#if currentCaption}}Current Caption: {{{currentCaption}}}{{/if}}
{{#if imageDataUri}}Image Context: {{media url=imageDataUri}}{{/if}}
`,
});

const generateAssetMetadataFlow = ai.defineFlow(
  {
    name: 'generateAssetMetadataFlow',
    inputSchema: GenerateAssetMetadataInputSchema,
    outputSchema: GenerateAssetMetadataOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
