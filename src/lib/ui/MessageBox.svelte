<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Select, SelectItem } from '$lib/components/select';
	import { sortableContext } from '$lib/components/SortableItem.svelte';
	import { messagesContext } from '$lib/services/Messages.svelte';
	import { autoResize } from '$lib/utils/autoResize.svelte';
	import { Close, Navigate, ReorderThree } from 'svelte-ionicons';

	let { message } = $props();

	const ctx = messagesContext.get();
	const sortableCtx = sortableContext.get();
</script>

<div class="divide-y divide-neutral-700 rounded-md border border-neutral-700 bg-neutral-800">
	<div class="flex items-center justify-between p-1" {@attach sortableCtx().attachHandle}>
		<Select bind:value={message.role}>
			<SelectItem value="system">
				<span class="border-l-4 border-blue-500 pl-2">System</span>
			</SelectItem>
			<SelectItem value="user">
				<span class="border-l-4 border-green-500 pl-2">User</span>
			</SelectItem>
			<SelectItem value="assistant">
				<span class="border-l-4 border-yellow-500 pl-2">Assistant</span>
			</SelectItem>
		</Select>

		<div class="flex flex-1 justify-end gap-1">
			{#if ctx.messages.length > 1}
				<Button class="p-1" onclick={() => ctx.removeMessage(message)}>
					<Close size="16" />
				</Button>
			{/if}
		</div>
	</div>
	<div class="px-2.5 pt-2.5">
		<textarea
			bind:value={message.content}
			class="w-full outline-none"
			rows="3"
			placeholder="Message"
			{@attach autoResize(message.content)}
		></textarea>
	</div>

	{#if message.role === 'assistant'}
		<div class="flex items-center justify-between p-1">
			<span></span>
			<Button class="py-0.5" onClick={() => ctx.generate(message)}>
				<Navigate size="16" />
				Generate
			</Button>
		</div>
	{/if}
</div>
