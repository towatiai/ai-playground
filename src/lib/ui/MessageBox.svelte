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
		</Select>

		<div class="h-6 flex-1" {@attach sortableCtx().attachHandle}></div>

		<div class="flex justify-end gap-1">
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
						{#each Object.keys(tools) as tool}
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
