import { tokenTypes } from './tokenizer/tokenTypes'
import {rand} from './helpers/random'

export class Processor {
    constructor(tokens) {
        this._tokens = tokens
    }

    process() {
        if (!this._tokens.length) {
            return 'Empty expression encountered'
        }

        let depth = this._tokens[0].depth
        let result = ''
        let currentString = ''
        let subExpressionEndIndex = 0
        let orResult = []
        let stringStack = []
        let isProcessingOr = false
        let commitOr = false
        let previous

        this._tokens.forEach( (token, index) => {

            if (index < subExpressionEndIndex) {
                return
            }

            if (index > 0) {
                previous = this._tokens[index - 1]
            }

            let lookahead = this._tokens[index + 1]
            let tokenIsOr = !!token && this.isOr( token )
            let lookAheadIsOr = !!lookahead && this.isOr( lookahead )
            let previousIsOr = !!previous && this.isOr( previous )

            if ((tokenIsOr && lookAheadIsOr) || (previousIsOr && tokenIsOr)) {
                throw new Error( `Double OR encountered at position ${index}` )
            }

            isProcessingOr = (tokenIsOr || lookAheadIsOr || previousIsOr)

            switch (token.type) {
                case tokenTypes.string:
                    if (isProcessingOr) {
                        stringStack.push( token.value )
                    } else {
                        result += token.value
                    }
                    break
                case tokenTypes.operation:
                    if (isProcessingOr) {
                        stringStack.push( token.value.handle() )
                    } else {
                        result += token.value.handle()
                    }
                    break
                case tokenTypes.subExpressionStart:
                    // find all tokens between this start and the subexpression end
                    let subTokens = this._getSubTokens( index + 1, depth )
                    let subValue = process( subTokens )

                    subExpressionEndIndex = index + subTokens.length
                    if (isProcessingOr) {
                        stringStack.push( subValue )
                    } else {
                        result = result + subValue
                    }
                    break
            }

            if ((!isProcessingOr && stringStack.length) || isProcessingOr && index === this._tokens.length - 1) {
                result += stringStack[rand(0, stringStack.length -1)]
                stringStack = []
                commitOr = false
            }

        } )

        return result
    }

    /**
     *
     * @param token {Token}
     * @returns {boolean}
     */
    isOr(token) {
        return token && token.type === tokenTypes.or
    }

    _getSubTokens(start, depth) {
        let expressionEnded = false
        return this._tokens.splice( start ).filter( (token, index) => {
            if (token.depth === depth) {
                expressionEnded = true
            }
            return !expressionEnded
        } )
    }
}

function* idMaker() {
    var index = 0
    while (true)
        yield 'tkn_' + (index++)
}

/**
 *
 * @type {Generator<string, void, ?>}
 */
const idGenerator = idMaker()
export function process(tokens) {
    console.log( idGenerator.next().value );
    return (new Processor( tokens )).process()
}