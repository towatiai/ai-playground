<script lang="ts">
	import { cn } from '$lib/utils';
	import { DropdownMenu as BitsDropdownMenu, type DropdownMenuContentProps } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		align?: 'start' | 'center' | 'end';
		children: Snippet;
		class?: string;
	};

	let {
		align = 'start',
		children,
		class: className = '',
		...restProps
	}: Props & Partial<DropdownMenuContentProps> = $props();
</script>

<BitsDropdownMenu.Portal>
	<BitsDropdownMenu.Content
		sideOffset={2}
		{align}
		class={cn('rounded-md border border-neutral-700 bg-neutral-800 p-1', className)}
		{...restProps}
	>
		{@render children()}
	</BitsDropdownMenu.Content>
</BitsDropdownMenu.Portal>
