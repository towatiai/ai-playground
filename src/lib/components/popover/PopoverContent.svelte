<script lang="ts">
	import { cn } from '$lib/utils';
	import { Popover as BitsPopover, type PopoverContentProps } from 'bits-ui';
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
	}: Props & Partial<PopoverContentProps> = $props();
</script>

<BitsPopover.Portal>
	<BitsPopover.Content
		sideOffset={2}
		{align}
		class={cn('rounded-md border border-neutral-700 bg-neutral-800 p-2', className)}
		{...restProps}
	>
		{@render children()}
	</BitsPopover.Content>
</BitsPopover.Portal>
