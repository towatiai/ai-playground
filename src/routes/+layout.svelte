<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div data-tauri-drag-region class="fixed inset-x-0 top-0 h-8"></div>
{@render children()}
