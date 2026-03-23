import { streamText, tool, type ModelMessage } from 'ai';
import { Context, PersistedState } from 'runed';
import { llama } from './ai';
import { sleep } from '$lib/utils';
import { nanoid } from 'nanoid';
import { tools as availableTools } from '$lib/resources/tools';

const messageCache = new PersistedState<Omit<Message, 'id'>[]>('message-cache', []);
const toolCache = new PersistedState<(keyof typeof availableTools)[]>('tool-cache', []);

type Role = Exclude<ModelMessage['role'], 'tool'>;

export class Message {
	id = nanoid();
	role = $state<Role>('user');
	content = $state('');

	constructor(role: Role = 'user', content: string = '') {
		this.role = role;
		this.content = content;
	}
}

export class MessagesViewModel {
	private isStreaming = false;

	messages = $state<Message[]>([]);
	tools = $state<(keyof typeof availableTools)[]>(toolCache.current ?? []);

	constructor() {
		this.messages = messageCache.current.length
			? messageCache.current.map((m) => new Message(m.role, m.content))
			: [new Message('system')];

		$effect(() => {
			if (this.isStreaming) return;
			messageCache.current = this.messages.map((m) => ({
				id: m.id,
				role: m.role,
				content: m.content
			}));
		});

		$effect(() => {
			if (this.isStreaming) return;
			toolCache.current = this.tools;
		});
	}

	addMessage(role: Role) {
		this.messages.push(new Message(role));
	}

	removeMessage(message: Message) {
		this.messages = this.messages.filter((m) => m !== message);
	}

	async generate(message: Message) {
		message.content = '';
		const messages = this.messages.slice(0, this.messages.indexOf(message));

		const params: Parameters<typeof streamText>[0] = {
			model: llama(),
			messages: messages
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

		const { textStream, ...result } = streamText(params);

		this.isStreaming = true;
		for await (const textPart of textStream) {
			message.content = message.content + textPart;
			await sleep(16);
		}

		this.isStreaming = false;
		messageCache.current = this.messages.map((m) => ({ role: m.role, content: m.content }));

		console.log(result);
	}
}

export const messagesContext = new Context<MessagesViewModel>('messagesViewModel');
