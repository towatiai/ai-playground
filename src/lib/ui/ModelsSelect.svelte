<script lang="ts">
	import { Select, SelectItem } from '$lib/components/select';
	import { getModels } from '$lib/services/ai';
	import type { LlamaModel } from '$types';
	import { onMount } from 'svelte';
	import { model } from '$lib/services/ai';

	let models: LlamaModel[] = [];

	onMount(async () => {
		models = await getModels();
	});
</script>

<Select bind:value={model.current} placeholder="Select a model">
	{#each models as model}
		<SelectItem value={model.model}>
			{@const creator = model.name.split('/')[0]}
			{@const modelName = model.name.split('/')[1].split(':')[0]}
			{@const quant = model.name.split(':')[1]}

			<span class="flex">
				<span class="text-neutral-500">{creator + '/'}</span>
				<span>{modelName}</span>
				<span class="text-neutral-500">:{quant}</span>
			</span>
		</SelectItem>
	{/each}
</Select>
