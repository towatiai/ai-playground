<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ModelsSelect from '$lib/ui/ModelsSelect.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div data-tauri-drag-region class="fixed inset-x-0 top-0 flex h-8 justify-between p-1">
	<span></span>
	<ModelsSelect />
</div>
{@render children()}
