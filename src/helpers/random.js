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
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}