<script lang="ts">
	import { cn } from '$lib/utils';
	import { DropdownMenu as BitsDropdownMenu, type DropdownMenuCheckboxItemProps } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		checked?: boolean;
		value?: string;
		disabled?: boolean;
		children: Snippet | Snippet<[{ checked: boolean }]>;
	};

	let {
		checked = $bindable(false),
		value,
		disabled = false,
		children: userChildren,
		class: className = '',
		...restProps
	}: Props & Partial<Omit<DropdownMenuCheckboxItemProps, 'children'>> = $props();
</script>

<BitsDropdownMenu.CheckboxItem
	bind:checked
	{value}
	{disabled}
	closeOnSelect={false}
	class={cn(
		'flex cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 text-sm transition-colors hover:bg-neutral-700 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[highlighted]:bg-neutral-700',
		className
	)}
	{...restProps}
>
	{#snippet children({ checked: isChecked })}
		{@render (userChildren as Snippet<[{ checked: boolean }]>)({ checked: isChecked })}
	{/snippet}
</BitsDropdownMenu.CheckboxItem>
