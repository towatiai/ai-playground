import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function endWithPeriod(str: string) {
    return str.endsWith('.') ? str : str + '.';
}

export function cleanUp(str: string) {
    return str.replace(/^"|"$/g, '');
}

export function isPromise(value: unknown): boolean {
    return !!(value && typeof value === "object" && "then" in value);
}

export function deferred<T>() {
    const obj = {} as { promise: Promise<T>; resolve: (value: T) => void; reject: (reason?: any) => void };
    obj.promise = new Promise<T>((res, rej) => {
        obj.resolve = res;
        obj.reject = rej;
    });
    return obj;
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function triggerOnce(element: HTMLElement, eventName: string, callback: Function) {
    const listener = (e: Event) => {
        element.removeEventListener(eventName, listener);
        callback(e);
    };

    element.addEventListener(eventName, listener);
}

export function splitText(element: HTMLElement) {
    // Get the text content of the element
    const text = element.textContent || element.innerText || '';

    // Clear the original content
    element.innerHTML = '';

    // Array to store the created span elements
    const spanElements = [];

    // Split text into words (preserving multiple spaces)
    const words = text.split(/(\s+)/);

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        // Skip empty strings
        if (word === '') continue;

        const wordSpan = document.createElement('span');
        wordSpan.className = 'split-word';
        wordSpan.style.display = 'inline-block';

        // If it's whitespace, handle it specially
        if (/^\s+$/.test(word)) {
            wordSpan.textContent = word;
            wordSpan.style.whiteSpace = 'pre';
        } else {
            // Split the word into individual character spans
            for (let j = 0; j < word.length; j++) {
                const char = word[j];
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.className = 'split-char';
                charSpan.style.display = 'inline-block';

                wordSpan.appendChild(charSpan);
                spanElements.push(charSpan);
            }
        }

        // Append word span to the original element
        element.appendChild(wordSpan);
    }

    return spanElements;
}
