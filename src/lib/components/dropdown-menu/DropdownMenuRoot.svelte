<script lang="ts">
	import { DropdownMenu as BitsDropdownMenu, type DropdownMenuRootProps } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		open?: boolean;
		children: Snippet;
	};

	let { open = $bindable(false), children, ...restProps }: Props & Partial<DropdownMenuRootProps> =
		$props();
</script>

<BitsDropdownMenu.Root bind:open {...restProps}>
	{@render children()}
</BitsDropdownMenu.Root>
