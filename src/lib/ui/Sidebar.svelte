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
			<Sheet.Content class="h-screen w-75 p-4">
				<Sheet.BleedingBackground class="bg-neutral-800" />
				<div>
					<h1>ai-playground</h1>
				</div>
			</Sheet.Content>
		</Sheet.View>
	</Sheet.Portal>
</Sheet.Root>
