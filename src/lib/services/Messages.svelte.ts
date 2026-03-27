import {
	smoothStream,
	streamText,
	tool,
	type AssistantModelMessage,
	type ModelMessage,
	type SystemModelMessage,
	type ToolCallPart,
	type ToolModelMessage,
	type ToolResultPart,
	type UserModelMessage
} from 'ai';
import { Context, PersistedState } from 'runed';
import { llama } from './ai';
import { nanoid } from 'nanoid';
import { tools as availableTools } from '$lib/resources/tools';

const messageCache = new PersistedState<Omit<Message, 'id' | 'toModelMessage'>[]>(
	'message-cache',
	[]
);
const toolCache = new PersistedState<(keyof typeof availableTools)[]>('tool-cache', []);

type Role = ModelMessage['role'];

export type ToolCall = {
	toolName: string;
	input: string;
	toolCallId: string;
};

export class Message {
	id = nanoid();
	role = $state<Role>('user');
	content = $state('');
	toolCalls = $state<ToolCall[]>([]);
	toolCallId: string = '';

	constructor(m: Partial<Omit<Message, 'id'>>) {
		this.role = m.role ?? 'user';
		this.content = m.content ?? '';
		this.toolCalls = m.toolCalls ?? [];
		this.toolCallId = m.toolCallId ?? '';
	}

	toModelMessage() {
		if (this.role === 'user' || this.role === 'system') {
			return {
				role: this.role,
				content: this.content
			} satisfies UserModelMessage | SystemModelMessage;
		}

		if (this.role === 'assistant') {
			if (this.toolCalls?.length) {
				return {
					role: this.role,
					content: [
						{
							type: 'tool-call',
							toolCallId: this.toolCalls[0].toolCallId,
							toolName: this.toolCalls[0].toolName,
							input: this.toolCalls[0].input
						} satisfies ToolCallPart
					]
				} satisfies AssistantModelMessage;
			}
			return {
				role: this.role,
				content: this.content
			} satisfies AssistantModelMessage;
		}

		if (this.role === 'tool') {
			return {
				role: this.role,
				content: [
					{
						type: 'tool-result',
						toolCallId: this.toolCallId,
						toolName: 'celebrity',
						output: {
							type: 'text',
							value: this.content
						}
					} satisfies ToolResultPart
				]
			} satisfies ToolModelMessage;
		}
	}
}

export class MessagesViewModel {
	private isStreaming = $state(false);

	messages = $state<Message[]>([]);
	tools = $state<(keyof typeof availableTools)[]>(toolCache.current ?? []);
	_forceToolUsage = $state(false);

	get forceToolUsage() {
		return this._forceToolUsage;
	}
	set forceToolUsage(value: boolean) {
		this._forceToolUsage = value;
	}

	constructor() {
		this.messages = messageCache.current.length
			? messageCache.current.map((m) => new Message(m))
			: [new Message({ role: 'system' })];

		$effect(() => {
			if (this.isStreaming) return;
			messageCache.current = this.messages.map((m) => ({
				role: m.role,
				content: m.content,
				toolCalls: m.toolCalls,
				toolCallId: m.toolCallId
			}));
		});

		$effect(() => {
			if (this.isStreaming) return;
			toolCache.current = this.tools;
		});
	}

	addMessage(role: Role) {
		this.messages.push(new Message({ role }));
	}

	addToolMessage(toolCallId: string) {
		const mes = new Message({ role: 'tool', toolCallId });
		this.messages.push(mes);
	}

	removeMessage(message: Message) {
		this.messages = this.messages.filter((m) => m !== message);
	}

	async generate(message: Message) {
		message.content = '';
		message.toolCalls = [];
		const messages = this.messages
			.slice(0, this.messages.indexOf(message))
			.map((m) => m.toModelMessage());

		console.log(messages);

		const params: Parameters<typeof streamText>[0] = {
			model: llama(),
			messages: messages,
			experimental_transform: smoothStream(),
			maxOutputTokens: 500
		};

		if (this.tools.length) {
			params.tools = this.tools.reduce(
				(acc, key) => {
					acc[key] = tool(availableTools[key]);
					return acc;
				},
				{} as Record<string, any>
			);
		}

		if (this.forceToolUsage) {
			params.toolChoice = 'required';
		}

		const result = streamText(params);

		this.isStreaming = true;
		for await (const textPart of result.textStream) {
			message.content += textPart;
		}

		message.content = await result.text;
		console.log(await result.text);
		this.isStreaming = false;

		const toolCalls = await result.toolCalls;
		if (toolCalls.length) {
			message.toolCalls = toolCalls.map((tc) => ({
				toolName: tc.toolName,
				input: JSON.stringify(tc.input, null, 2),
				toolCallId: tc.toolCallId.substring(0, 9)
			}));
		}

		messageCache.current = this.messages.map((m) => ({
			role: m.role,
			content: m.content,
			toolCalls: m.toolCalls,
			toolCallId: m.toolCallId
		}));
	}
}

export const messagesContext = new Context<MessagesViewModel>('messagesViewModel');
