<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ModelsSelect from '$lib/ui/ModelsSelect.svelte';
	import { Sheet } from 'silky-svelte';
	import Sidebar from '$lib/ui/Sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Sheet.Base>
	<div data-tauri-drag-region class="top-bar fixed inset-x-0 top-0 flex h-8 justify-between p-1">
		<Sidebar />
		<ModelsSelect />
	</div>
	{@render children()}
</Sheet.Base>

<style>
	.top-bar:before {
		content: '';
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 200%;
		z-index: -1;
		background: linear-gradient(var(--color-neutral-900), transparent);
	}
</style>
