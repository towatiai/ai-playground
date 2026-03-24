<script lang="ts">
	import { cn } from '$lib/utils';
	import { DropdownMenu as BitsDropdownMenu, type DropdownMenuTriggerProps } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let {
		children,
		class: className = '',
		...restProps
	}: Props & Partial<DropdownMenuTriggerProps> = $props();
</script>

<BitsDropdownMenu.Trigger
	class={cn(
		'flex cursor-pointer items-center gap-1 rounded-sm px-1.5 py-0.5 transition-colors hover:bg-neutral-700 data-[state=open]:bg-neutral-700',
		className
	)}
	{...restProps}
>
	{@render children()}
</BitsDropdownMenu.Trigger>
