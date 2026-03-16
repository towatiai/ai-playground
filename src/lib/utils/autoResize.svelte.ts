import type { Attachment } from 'svelte/attachments';

export function autoResize(value: string): Attachment<HTMLTextAreaElement> {
	return (input) => {
		input.style.setProperty('resize', 'none');
		input.style.setProperty('overflow', 'hidden');
		input.style.setProperty('height', 'auto');

		function update() {
			input.style.setProperty('height', 'auto');
			input.style.setProperty('height', `${input.scrollHeight}px`);
		}

		input.addEventListener('input', update);

		$effect(() => {
			value;
			update();
		});

		return () => {
			input.removeEventListener('input', update);
		};
	};
}
