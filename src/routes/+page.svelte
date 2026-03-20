<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { messagesContext, MessagesViewModel } from '$lib/services/Messages.svelte';
	import MessageBox from '$lib/ui/MessageBox.svelte';
	import { Add } from 'svelte-ionicons';
	import { DragDropProvider, type DragDropEventHandlers } from '@dnd-kit/svelte';
	import { move } from '@dnd-kit/helpers';
	import SortableItem from '$lib/components/SortableItem.svelte';

	const viewModel = new MessagesViewModel();
	messagesContext.set(viewModel);

	const onDragEnd: DragDropEventHandlers['onDragEnd'] = (event) => {
		viewModel.messages = move(viewModel.messages, event);
	};
</script>

<div class="h-screen overflow-y-auto">
	<div class="flex min-h-screen items-center justify-center py-28">
		<div class="flex flex-col gap-2" style="min-width: min(calc(100vw - 40px), 650px)">
			<DragDropProvider {onDragEnd}>
				<ul class="flex flex-col gap-2">
					{#each viewModel.messages as message, index (message.id)}
						<SortableItem id={message.id} {index}>
							<MessageBox {message} />
						</SortableItem>
					{/each}
				</ul>
			</DragDropProvider>

			<div class="flex justify-between">
				<Button
					onclick={() =>
						viewModel.addMessage(viewModel.messages.at(-1)?.role === 'user' ? 'assistant' : 'user')}
				>
					<Add size="16" />
					Add message
				</Button>
			</div>
		</div>
	</div>
</div>
