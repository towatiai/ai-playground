import Root from './DropdownMenuRoot.svelte';
import Trigger from './DropdownMenuTrigger.svelte';
import Content from './DropdownMenuContent.svelte';
import CheckboxItem from './DropdownMenuCheckboxItem.svelte';
import CheckboxGroup from './DropdownMenuCheckboxGroup.svelte';
import Separator from './DropdownMenuSeparator.svelte';

const DropdownMenu = Object.assign(Root, {
	Trigger,
	Content,
	CheckboxItem,
	CheckboxGroup,
	Separator
});

export { DropdownMenu };
