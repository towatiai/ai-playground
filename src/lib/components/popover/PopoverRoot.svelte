<script lang="ts">
	import { Popover as BitsPopover, type PopoverRootProps } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		open?: boolean;
		children: Snippet;
	};

	let { open = $bindable(false), children, ...restProps }: Props & Partial<PopoverRootProps> =
		$props();
</script>

<BitsPopover.Root bind:open {...restProps}>
	{@render children()}
</BitsPopover.Root>
