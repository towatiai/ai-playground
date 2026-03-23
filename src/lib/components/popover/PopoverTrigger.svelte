<script lang="ts">
	import { Popover as BitsPopover, type PopoverTriggerProps } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children, ...restProps }: Props & Partial<PopoverTriggerProps> = $props();
</script>

<BitsPopover.Trigger
	class="flex cursor-pointer items-center gap-1 rounded-sm py-0.5 px-1.5 transition-colors hover:bg-neutral-700 data-[state=open]:bg-neutral-700"
	{...restProps}
>
	{@render children()}
</BitsPopover.Trigger>
