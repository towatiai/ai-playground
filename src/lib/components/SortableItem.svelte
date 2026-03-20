<script lang="ts" module>
	import { Context } from 'runed';

	export const sortableContext = new Context<() => ReturnType<typeof createSortable>>('sortable');
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import { createSortable } from '@dnd-kit/svelte/sortable';

	let {
		children,
		class: className = '',
		id,
		index
	}: { children: Snippet; class?: string; id: string; index: number } = $props();

	const sortable = $derived(createSortable({ id, index }));
	sortableContext.set(() => sortable);
</script>

<li
	class={cn('', className, sortable.isDragging && 'scale-[1.03] shadow-2xl')}
	{@attach sortable.attach}
>
	{@render children()}
</li>

<style>
	li {
		position: relative;
		transition: scale 0.3s ease;
	}
</style>
