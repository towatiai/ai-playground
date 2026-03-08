<script lang="ts">
	import { Select, SelectItem } from '$lib/components/select';
	import { autoResize } from '$lib/utils/autoResize';

	let messageType = $state('system');
</script>

<div
	class="divide-y divide-neutral-700 rounded-md border border-neutral-700 bg-neutral-800"
	style="min-width: min(calc(100vw - 200px), 650px)"
>
	<div class="p-1">
		<Select bind:value={messageType}>
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
	</div>
	<div class="px-2.5 pt-2.5">
		<textarea class="w-full outline-none" rows="3" placeholder="Message" {@attach autoResize}
		></textarea>
	</div>
</div>
