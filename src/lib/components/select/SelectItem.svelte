<script lang="ts">
	import { selectContext } from './select.ctx.svelte';
	import { onMount, type Snippet } from 'svelte';

	type Props = {
		value: string;
		disabled?: boolean;
		children: Snippet;
	};

	let { value, disabled, children: itemContent }: Props = $props();

	const ctx = selectContext.get();

	onMount(() => {
		ctx.register(value, itemContent, disabled);
		return () => ctx.unregister(value);
	});
</script>
