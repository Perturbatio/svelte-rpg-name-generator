/**
 *
 * @returns {boolean}
 */
export function flip() {
    return !!rand(0,1)
}

/**
 *
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
export function rand(min, max){
    return Math.round( Math.random() * max ) + min;
}