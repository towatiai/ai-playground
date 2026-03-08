<script lang="ts">
	import { Select as BitsSelect } from 'bits-ui';
	import { Checkmark, ChevronExpand } from 'svelte-ionicons';
	import { selectContext, SelectContext } from './select.ctx.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		value?: string;
		placeholder?: string;
		align?: 'start' | 'center' | 'end';
		children: Snippet;
	};

	let {
		value = $bindable(),
		placeholder,
		align = 'start',
		children,
		...restProps
	}: Props = $props();

	const ctx = selectContext.set(new SelectContext());

	$effect(() => {
		ctx.value = value;
	});
</script>

{@render children()}

<BitsSelect.Root type="single" bind:value {...restProps}>
	<BitsSelect.Trigger
		class="flex cursor-pointer items-center gap-1 rounded-sm py-0.5 pr-0.5 pl-1.5 transition-colors hover:bg-neutral-700 data-[state=open]:bg-neutral-700"
	>
		{#if ctx.selectedSnippet}
			{@render ctx.selectedSnippet()}
		{:else}
			{placeholder}
		{/if}
		<ChevronExpand size="16" class="text-neutral-500" />
	</BitsSelect.Trigger>
	<BitsSelect.Portal>
		<BitsSelect.Content {align} class="rounded-md border border-neutral-700 bg-neutral-800 p-1">
			<BitsSelect.Viewport class="grid" style="grid-template-columns: 1fr auto;">
				{#each ctx.items as item (item.value)}
					<BitsSelect.Item
						value={item.value}
						disabled={item.disabled}
						class="col-span-2 grid cursor-pointer grid-cols-subgrid items-center gap-x-2 rounded-sm py-0.5 pr-1 pl-1.5 data-highlighted:bg-neutral-700"
					>
						{#snippet children({ selected })}
							<span>{@render item.snippet()}</span>
							<span>
								{#if selected}
									<Checkmark size="16" />
								{/if}
							</span>
						{/snippet}
					</BitsSelect.Item>
				{/each}
			</BitsSelect.Viewport>
		</BitsSelect.Content>
	</BitsSelect.Portal>
</BitsSelect.Root>
