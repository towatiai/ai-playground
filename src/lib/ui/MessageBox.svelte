<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { DropdownMenu } from '$lib/components/dropdown-menu';
	import { Select, SelectItem } from '$lib/components/select';
	import { sortableContext } from '$lib/components/SortableItem.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import { tools } from '$lib/resources/tools';
	import { type Message, messagesContext } from '$lib/services/Messages.svelte';
	import { autoResize } from '$lib/utils/autoResize.svelte';
	import { Checkmark, Close, Hammer, Navigate } from 'svelte-ionicons';

	let { message }: { message: Message } = $props();

	const ctx = messagesContext.get();
	const sortableCtx = sortableContext.get();
</script>

<div class="divide-y divide-neutral-700 rounded-md border border-neutral-700 bg-neutral-800">
	<div class="flex items-center justify-between p-1">
		<Select type="single" bind:value={message.role}>
			{#if ctx.messages.indexOf(message) === 0 && ctx.messages.filter((m) => m.role === 'system').length <= 1}
				<SelectItem value="system">
					<span class="border-l-4 border-blue-500 pl-2">System</span>
				</SelectItem>
			{/if}
			<SelectItem value="user">
				<span class="border-l-4 border-green-500 pl-2">User</span>
			</SelectItem>
			<SelectItem value="assistant">
				<span class="border-l-4 border-yellow-500 pl-2">Assistant</span>
			</SelectItem>
			<SelectItem value="tool">
				<span class="border-l-4 border-white pl-2">Tool</span>
			</SelectItem>
		</Select>

		<div class="h-6 flex-1" {@attach sortableCtx().attachHandle}>
			{#if message.toolCallId}
				<span class="px-2 font-mono text-sm text-neutral-500">{message.toolCallId}</span>
			{/if}
		</div>

		<div class="flex justify-end gap-1">
			{#if ctx.messages.length > 1}
				<Button class="p-1" onclick={() => ctx.removeMessage(message)}>
					<Close size="16" />
				</Button>
			{/if}
		</div>
	</div>
	{#if message.toolCalls.length > 0}
		<div class="flex flex-col gap-2 p-2.5">
			{#each message.toolCalls as tc (tc.toolCallId)}
				<div class="rounded border border-neutral-600 bg-neutral-900 text-sm">
					<div class="flex items-center gap-1.5 border-b border-neutral-600 py-1 pr-1 pl-2.5">
						<Hammer size="14" class="shrink-0 text-yellow-400" />
						<span class="font-mono font-semibold text-yellow-400">{tc.toolName}</span>
						<span class="flex-1"></span>
						<Button
							class="self-end bg-neutral-900 hover:bg-neutral-800"
							onclick={() => ctx.addToolMessage(tc.toolCallId)}
						>
							Add response
						</Button>
					</div>
					<pre class="overflow-x-auto px-2.5 py-2 text-xs text-neutral-300">{tc.input}</pre>
				</div>
			{/each}
		</div>
	{:else}
		<div class="px-2.5 pt-2.5">
			<textarea
				bind:value={message.content}
				class="w-full outline-none"
				rows="3"
				placeholder="Message"
				{@attach autoResize(message.content)}
			></textarea>
		</div>
	{/if}

	{#if message.role === 'assistant' && ctx.messages.indexOf(message) === ctx.messages.length - 1}
		<div class="flex items-center justify-between p-1">
			<DropdownMenu>
				<DropdownMenu.Trigger class="flex items-center gap-1.5">
					<Hammer size="16" />
					Tools
					{#if ctx.tools.length > 0}
						<span>
							({ctx.tools.length})
						</span>
					{/if}
				</DropdownMenu.Trigger>

				<DropdownMenu.Content>
					<DropdownMenu.CheckboxItem bind:checked={ctx.forceToolUsage}>
						{#snippet children({ checked })}
							Choice required
							<Switch value={checked} />
						{/snippet}
					</DropdownMenu.CheckboxItem>

					<DropdownMenu.Separator />

					<DropdownMenu.CheckboxGroup bind:value={ctx.tools}>
						{#each Object.keys(tools) as tool (tool)}
							<DropdownMenu.CheckboxItem value={tool} class="flex items-center justify-between">
								{#snippet children({ checked })}
									{tool}
									{#if checked}
										<Checkmark size="16" />
									{/if}
								{/snippet}
							</DropdownMenu.CheckboxItem>
						{/each}
					</DropdownMenu.CheckboxGroup>
				</DropdownMenu.Content>
			</DropdownMenu>

			<Button class="py-0.5" onclick={() => ctx.generate(message)}>
				<Navigate size="16" />
				Generate
			</Button>
		</div>
	{/if}
</div>
