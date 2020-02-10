export class Token {
    /**
     *
     * @param type {string}
     * @param value {*}
     * @param depth {number}
     */
    constructor( type, value, depth) {
        this._type = type
        this._value = value
        this._depth = depth
    }

    /**
     *
     * @returns {*}
     */
    get type() {
        return this._type
    }

    /**
     *
     * @returns {*}
     */
    get value() {
        return this._value
    }

    /**
     *
     * @returns {number}
     */
    get depth() {
        return this._depth
    }

}
