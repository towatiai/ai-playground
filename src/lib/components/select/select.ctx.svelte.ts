import { Context } from 'runed';
import type { Snippet } from 'svelte';

export type SelectItemData = {
	value: string;
	disabled?: boolean;
	snippet: Snippet;
};

export class SelectContext {
	type = $state<'single' | 'multiple'>('single');
	value = $state<string | string[] | undefined>();
	items = $state<SelectItemData[]>([]);

	register(value: string, snippet: Snippet, disabled?: boolean) {
		if (!this.items.some((item) => item.value === value)) {
			this.items.push({ value, snippet, disabled });
		}
	}

	unregister(value: string) {
		this.items = this.items.filter((item) => item.value !== value);
	}

	get selectedSnippet(): Snippet | undefined {
		if (this.type !== 'single' || this.value === undefined || Array.isArray(this.value))
			return undefined;
		return this.items.find((item) => item.value === this.value)?.snippet;
	}

	get selectedSnippets(): Snippet[] {
		if (this.type !== 'multiple' || !Array.isArray(this.value)) return [];
		return this.items
			.filter((item) => (this.value as string[]).includes(item.value))
			.map((item) => item.snippet);
	}
}

export const selectContext = new Context<SelectContext>('SelectContext');
