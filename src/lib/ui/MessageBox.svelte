<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Popover } from '$lib/components/popover';
	import { Select, SelectItem } from '$lib/components/select';
	import { sortableContext } from '$lib/components/SortableItem.svelte';
	import { tools } from '$lib/resources/tools';
	import { type Message, messagesContext } from '$lib/services/Messages.svelte';
	import { autoResize } from '$lib/utils/autoResize.svelte';
	import { Close, Hammer, Navigate } from 'svelte-ionicons';

	let { message }: { message: Message } = $props();

	const ctx = messagesContext.get();
	const sortableCtx = sortableContext.get();

	let tool = $state<string | undefined>(undefined);

	function onToolSelected(value: string) {
		if (value) {
			ctx.tools.push(value as keyof typeof tools);
			tool = undefined;
		}
	}
</script>

<div class="divide-y divide-neutral-700 rounded-md border border-neutral-700 bg-neutral-800">
	<div class="flex items-center justify-between p-1">
		<Select bind:value={message.role}>
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

	{#if message.role === 'assistant'}
		<div class="flex items-center justify-between p-1">
			<Popover>
				<Popover.Trigger>Generation options</Popover.Trigger>
				<Popover.Content>
					<p>foobar</p>
				</Popover.Content>
			</Popover>

			<Button class="py-0.5" onclick={() => ctx.generate(message)}>
				<Navigate size="16" />
				Generate
			</Button>
		</div>
	{/if}

	{#if message.role === 'system'}
		<div class="flex flex-wrap items-center gap-2.5 p-1">
			{#each ctx.tools as tool}
				<button
					onclick={() => (ctx.tools = ctx.tools.filter((t) => t !== tool))}
					class="group cursor-pointer rounded-sm px-1.5 py-0.5 transition-colors hover:bg-neutral-700"
				>
					<span class="flex items-center gap-1.5">
						<span class="relative size-4">
							<Close
								size="16"
								class="absolute top-0 left-0 opacity-0 transition-opacity group-hover:opacity-100"
							/>
							<Hammer
								size="16"
								class="absolute top-0 left-0 opacity-100 transition-opacity group-hover:opacity-0"
							/>
						</span>

						{tool}
					</span>
				</button>
			{/each}

			{#if ctx.tools.length < Object.keys(tools).length}
				<Select placeholder="Add tool" bind:value={tool} onValueChange={onToolSelected}>
					{#each Object.keys(tools).filter((t) => !ctx.tools.includes(t as keyof typeof tools)) as key (key)}
						<SelectItem value={key}>
							<span class="flex items-center gap-1.5">
								<Hammer size="16" />
								{key}
							</span>
						</SelectItem>
					{/each}
				</Select>
			{/if}
		</div>
	{/if}
</div>
