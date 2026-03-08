import type { Attachment } from "svelte/attachments";

export const autoResize: Attachment<HTMLTextAreaElement> = (input) => {
    input.style.setProperty("resize", "none");
    input.style.setProperty("overflow", "hidden");
    input.style.setProperty("height", "auto");

    function update() {
        input.style.setProperty("height", "auto");
        input.style.setProperty("height", `${input.scrollHeight}px`);
    }

    input.addEventListener("input", update);

    return () => {
        input.removeEventListener("input", update);
    }
};