export class Token {
    /**
     *
     * @param type {string}
     * @param value {*}
     * @param depth {number}
     * @param position {number}
     */
    constructor( type, value, depth, position) {
        this._type = type
        this._value = value
        this._depth = depth
        this._position = position
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
    /**
     *
     * @returns {number}
     */
    get position() {
        return this._position
    }

}
