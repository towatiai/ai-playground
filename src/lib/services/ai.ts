import {
	OpenAICompatibleChatLanguageModel,
	type OpenAICompatibleProvider
} from '@ai-sdk/openai-compatible';
import {
	extractReasoningMiddleware,
	wrapLanguageModel,
	experimental_generateSpeech as _generateSpeech
} from 'ai';
import { PersistedState } from 'runed';
import type { LlamaModel } from '$types';

export const model = new PersistedState<string>('model', '');

const IP = '192.168.1.38';
export const BASE_URL = `https://${IP}`;
const LLAMA_PORT = 20000;

let _openai: OpenAICompatibleProvider | null = null;

export function llama() {
	const languageModel = new OpenAICompatibleChatLanguageModel(model.current, {
		provider: 'llama.cpp',
		url: ({ path }) => `${BASE_URL}:${LLAMA_PORT}/v1${path}`,
		headers: () => ({}),
		supportsStructuredOutputs: true
	});

	return wrapLanguageModel({
		model: languageModel,
		middleware: extractReasoningMiddleware({
			tagName: 'think',
			separator: '\n'
		})
	});
}

export async function pingLlama() {
	const result = await fetch(`${BASE_URL}:${LLAMA_PORT}/health`);
	return result.ok;
}

export async function getModels() {
	const result = await fetch(`${BASE_URL}:${LLAMA_PORT}/models`);
	if (!result.ok) return [];
	return (await result.json()).models as LlamaModel[];
}
