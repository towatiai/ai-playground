<script lang="ts">
	import { cn, noop } from '$lib/utils';

	let { children, class: className = '', onClick = noop } = $props();
</script>

<button
	onclick={onClick}
	class={cn(
		'flex cursor-pointer items-center gap-1 rounded-md bg-neutral-800 p-1 px-2 transition-colors hover:bg-neutral-700',
		className
	)}
>
	{@render children()}
</button>
