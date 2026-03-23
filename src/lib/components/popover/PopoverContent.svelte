<script lang="ts">
	import { Popover as BitsPopover, type PopoverContentProps } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		align?: 'start' | 'center' | 'end';
		children: Snippet;
	};

	let { align = 'start', children, ...restProps }: Props & Partial<PopoverContentProps> = $props();
</script>

<BitsPopover.Portal>
	<BitsPopover.Content
		sideOffset={2}
		{align}
		class="rounded-md border border-neutral-700 bg-neutral-800 p-2"
		{...restProps}
	>
		{@render children()}
	</BitsPopover.Content>
</BitsPopover.Portal>
