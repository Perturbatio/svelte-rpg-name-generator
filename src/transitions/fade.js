import {linear} from 'svelte/easing'

export function fade(node, { delay = 0, duration = 400, easing: easing$1 = linear, onStart = () => {}, onEnd = () => {} }) {

    const o = +getComputedStyle(node).opacity;
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
        css: t => {
            return `opacity: ${t * o}`
        }
    };
}