import type { Tool } from 'ai';
import { z } from 'zod';

export const celebrity = {
	description: 'Get information about a celebrity.',
	inputSchema: z.object({
		name: z.string().describe('The name of the celebrity.')
	})
} satisfies Tool;

export const ready = {
	description: 'Continues the process.',
	inputSchema: z.null()
} satisfies Tool;

export const tools = {
	celebrity,
	ready
};
