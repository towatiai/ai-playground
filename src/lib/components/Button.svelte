<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { children, class: className = '', ...props }: HTMLButtonAttributes = $props();
</script>

<button
	class={cn(
		'flex cursor-pointer items-center gap-1 rounded-md bg-neutral-800 p-1 px-2 transition-colors hover:bg-neutral-700',
		className
	)}
	{...props}
>
	{@render children?.()}
</button>
