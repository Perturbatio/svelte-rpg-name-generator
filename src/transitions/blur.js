import {cubicInOut} from 'svelte/easing'

export function blur(node, { delay = 0, duration = 400, easing: easing$1 = cubicInOut, amount = 5, opacity = 0,  onStart = () => {}, onEnd = () => {} }) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const f = style.filter === 'none' ? '' : style.filter;
    const od = target_opacity * (1 - opacity);

    // chrome doesn't always fire the end events (boo)
    node.addEventListener("animationstart", () => {
        onStart(node)
    });
    node.addEventListener("animationend", () => {
        onEnd(node)
    });
    node.addEventListener("animationcancel", () => {
        onEnd(node)
    });
    return {
        delay,
        duration,
        easing: easing$1,
        css: (t, u) => {
            return `opacity: ${target_opacity - (od * u)}; filter: ${f} blur(${u * amount}px);`
        }
    };
}