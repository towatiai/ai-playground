<script lang="ts">
	import { Select, type SelectSingleRootProps, type WithoutChildren } from 'bits-ui';
	import { Checkmark, ChevronExpand } from 'svelte-ionicons';

	type Props = WithoutChildren<SelectSingleRootProps> & {
		placeholder?: string;
		items: { value: string; label: string; disabled?: boolean }[];
		align?: Select.ContentProps['align'];
		// any other specific component props if needed
	};

	let {
		value = $bindable(),
		type,
		items,
		placeholder,
		align = 'start',
		...restProps
	}: Props = $props();

	const selectedLabel = $derived(items.find((item) => item.value === value)?.label);
</script>

<Select.Root {type} bind:value {...restProps}>
	<Select.Trigger
		class="flex cursor-pointer items-center gap-1 rounded-sm py-0.5 pr-0.5 pl-1.5 transition-colors hover:bg-neutral-700 data-[state=open]:bg-neutral-700"
	>
		{selectedLabel ? selectedLabel : placeholder}
		<ChevronExpand size="16" class="text-neutral-500" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content {align} class="rounded-md border border-neutral-700 bg-neutral-800 p-1">
			<Select.Viewport class="grid" style="grid-template-columns: 1fr auto;">
				{#each items as { value, label, disabled }}
					<Select.Item
						{value}
						{label}
						{disabled}
						class="col-span-2 grid cursor-pointer grid-cols-subgrid items-center gap-x-2 rounded-sm py-0.5 pr-1 pl-1.5 data-highlighted:bg-neutral-700"
					>
						{#snippet children({ selected })}
							<span>{label}</span>
							<span>
								{#if selected}
									<Checkmark size="16" />
								{/if}
							</span>
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
