import Root from './PopoverRoot.svelte';
import Trigger from './PopoverTrigger.svelte';
import Content from './PopoverContent.svelte';

const Popover = Object.assign(Root, { Trigger, Content });
export { Popover };
