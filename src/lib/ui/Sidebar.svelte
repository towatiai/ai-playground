<script lang="ts">
	import { Sheet } from 'silky-svelte';
	import { Menu } from 'svelte-ionicons';
</script>

<Sheet.Root>
	<Sheet.Trigger
		class="flex cursor-pointer items-center gap-1 rounded-md p-1 transition-colors hover:bg-neutral-800"
	>
		<Menu size="16" />
	</Sheet.Trigger>

	<Sheet.Portal>
		<Sheet.View placement={'left'}>
			<Sheet.Backdrop class="bg-black/50" />
			<Sheet.Content class="h-screen w-75 p-3">
				<div class="h-full rounded-md border border-neutral-700 bg-neutral-800 p-2">
					<h1 class="flex text-lg font-semibold">
						<span class="text-orange-500">ai</span>
						<span>playground</span>
					</h1>
				</div>
			</Sheet.Content>
		</Sheet.View>
	</Sheet.Portal>
</Sheet.Root>
