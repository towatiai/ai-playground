<script lang="ts">
	import { Switch as BitsSwitch, type SwitchRootProps } from 'bits-ui';

	type Props = {
		value?: boolean;
		disabled?: boolean;
	};

	let {
		value = $bindable(false),
		disabled = false,
		...restProps
	}: Props & Partial<Omit<SwitchRootProps, 'checked'>> = $props();
</script>

<BitsSwitch.Root
	bind:checked={value}
	{disabled}
	class="inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-md border border-neutral-700 bg-neutral-800 transition-colors data-[state=checked]:border-sky-500 data-[state=checked]:bg-sky-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
	{...restProps}
>
	<BitsSwitch.Thumb
		class="pointer-events-none block size-3.5 rounded-sm bg-neutral-400 transition-transform data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white data-[state=unchecked]:translate-x-[2px]"
	/>
</BitsSwitch.Root>
