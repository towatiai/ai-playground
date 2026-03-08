<script lang="ts">
	import Select from '$lib/components/Select.svelte';

	let messageType = $state('system');

	const messageTypes = [
		{ label: 'System', value: 'system' },
		{ label: 'User', value: 'user' },
		{ label: 'Assistant', value: 'assistant' }
	];
</script>

<div
	class="divide-y divide-neutral-700 rounded-md border border-neutral-700 bg-neutral-800"
	style="min-width: min(calc(100vw - 200px), 650px)"
>
	<div class="p-1">
		<Select type="single" items={messageTypes} bind:value={messageType} />
	</div>
	<div class="p-2.5">
		<textarea class="w-full outline-none" rows="3" placeholder="Message"></textarea>
	</div>
</div>
