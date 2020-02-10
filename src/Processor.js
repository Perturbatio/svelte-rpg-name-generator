import { tokenTypes } from './tokenizer/tokenTypes'
import {rand} from './helpers/random'

export class Processor {
    constructor(tokens) {
        this._tokens = tokens
        console.log('processor tokens', JSON.stringify(this._tokens))
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
            console.log( 'index:', index);
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
                throw new Error( `Double OR encountered at position ${index}` )
            }

            isProcessingOr = (tokenIsOr || lookAheadIsOr || previousIsOr)

    // console.log( token.type);

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
                    console.log( 'sub expression started' );
                    // find all tokens between this start and the subexpression end
                    let subTokens = this._getSubTokens( index + 1, depth )

                    subExpressionEndIndex = index + subTokens.length+1
                    console.log({ subExpressionEndIndex, subTokens})
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
export function process(tokens, id = 'root') {
    id = `${id}_${idGenerator.next().value}`
    let processor = new Processor( tokens )
    processor.id = id;
    console.log(processor);
    return processor.process()
}