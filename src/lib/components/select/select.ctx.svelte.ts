import { Context } from 'runed';
import type { Snippet } from 'svelte';

export type SelectItemData = {
	value: string;
	disabled?: boolean;
	snippet: Snippet;
};

export class SelectContext {
	value = $state<string>();
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
		if (this.value === undefined) return undefined;
		return this.items.find((item) => item.value === this.value)?.snippet;
	}
}

export const selectContext = new Context<SelectContext>('SelectContext');
