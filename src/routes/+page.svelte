<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { messagesContext, MessagesViewModel } from '$lib/services/Messages.svelte';
	import MessageBox from '$lib/ui/MessageBox.svelte';
	import { Add } from 'svelte-ionicons';

	const viewModel = new MessagesViewModel();
	messagesContext.set(viewModel);
</script>

<div class="h-screen overflow-y-auto">
	<div class="flex min-h-screen items-center justify-center py-28">
		<div class="flex flex-col gap-2" style="min-width: min(calc(100vw - 40px), 650px)">
			<ul class="flex flex-col gap-2">
				{#each viewModel.messages as message}
					<MessageBox {message} />
				{/each}
			</ul>

			<div class="flex justify-between">
				<Button
					onClick={() =>
						viewModel.addMessage(viewModel.messages.at(-1)?.role === 'user' ? 'assistant' : 'user')}
				>
					<Add size="16" />
					Add message
				</Button>
			</div>
		</div>
	</div>
</div>
