import _ from 'lodash'
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
        let subExpressionEndIndex = 0
        let stringStack = []
        let isProcessingOr = false
        let commitOr = false
        let previous

        this._tokens.forEach( (token, index) => {
            if (index < subExpressionEndIndex) {
                return result;
            }

            if (index > 0) {
                previous = this._tokens[index - 1]
            }

            let lookahead = this._tokens[index + 1]
            let tokenIsOr = !!token && this.isOr( token )
            let lookAheadIsOr = !!lookahead && this.isOr( lookahead )
            let previousIsOr = !!previous && this.isOr( previous )

            if ((tokenIsOr && lookAheadIsOr) || (previousIsOr && tokenIsOr)) {
                console.error( `Double OR encountered at position ${index}` )
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

                    subExpressionEndIndex = index + subTokens.length+1

                    if (isProcessingOr) {
                        stringStack.push( process( subTokens, 'sub' ) )
                    } else {
                        result = result + process( subTokens, 'sub' )
                    }
                    break
                case tokenTypes.subExpressionEnd:
                    console.log('sub expression ended');
                break;
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
        return this._tokens.filter( (token, index) => {
            if (index < start ){
                return false;
            }
            if (token.depth === depth) {
                expressionEnded = true
            }
            return !expressionEnded
        } )
    }
}
let lastTokens = null;
let processor = null;

export function process(tokens) {
    if (!(lastTokens && tokens && _.difference( tokens, lastTokens ).length === 0 && processor)) {
        processor = new Processor( tokens )
    }

    return processor.process()
}