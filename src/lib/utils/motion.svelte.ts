import { animate } from "motion";

type MotionParams = {
    keyframes: Parameters<typeof animate>[1];
    options?: Parameters<typeof animate>[2];
}

export function motion(node: HTMLElement, params: MotionParams) {
    animate(node, params.keyframes, params.options);

    return {
        delay: typeof params.options?.delay === "number" ? params.options.delay * 1000 : 0,
        duration: params.options?.duration ? params.options.duration * 1000 : 400,
    }
};