<script lang="ts">
	import { DropdownMenu as BitsDropdownMenu, type DropdownMenuCheckboxGroupProps } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		value?: string[];
		children: Snippet;
	};

	let { value = $bindable([]), children, ...restProps }: Props &
		Partial<DropdownMenuCheckboxGroupProps> = $props();
</script>

<BitsDropdownMenu.CheckboxGroup bind:value {...restProps}>
	{@render children()}
</BitsDropdownMenu.CheckboxGroup>
