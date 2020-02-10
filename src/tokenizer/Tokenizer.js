import {Token} from './Token'
import {tokenTypes} from './tokenTypes'


/**
 *
 */
export class Tokenizer {

    /**
     *
     * @param validOperations
     */
    constructor( validOperations ) {
        this._tokens = []
        this._initialOperations = validOperations
        this._operations = new Map()
        this._insideString = false
        validOperations.forEach( op => this.registerOperation( op ) )
    }

    /**
     *
     * @param operation
     */
    registerOperation( operation ) {
        if ( !this.hasOperation( operation.token ) ) {
            this._operations.set( operation.token, operation )
        } else {
            throw new Error( `Operation token already registered ${operation.token}` )
        }
    }

    /**
     *
     * @param operation
     * @returns {boolean}
     */
    hasOperation( operation ) {
        return this._operations.has( operation )
    }

    /**
     *
     * @param token
     * @returns {*}
     */
    handleOperation( token ) {
        return this._operations.get( token ).handle()
    }

    /**
     *
     * @returns {[]}
     */
    get tokens() {
        return this._tokens
    }

    /**
     *
     * @param expression
     * @returns {Tokenizer}
     */
    tokenize( expression ) {
        this._tokens = []
        //TODO: why am I avoiding a tree?
        let stringBuffer = ''
        let stringStartPos = -1
        let lookahead = ''
        let lookahead2 = ''
        let depth = 0

        this._insideString = false

        expression.split( '' ).forEach( ( char, index ) => {
            lookahead = expression.substr( index + 1, 1 )
            lookahead2 = expression.substr( index + 2, 1 )
            if ( this._insideString ) {
                //TODO: make the look-ahead work for escaped quotes
                if ( !this.isStringEnd( char, lookahead, lookahead2 ) ) {
                    stringBuffer += char
                } else {
                    this._insideString = false
                    this._tokens.push( new Token( tokenTypes.string, stringBuffer, depth, index ) )
                    stringBuffer = ''
                }
            } else {

                if ( this.isOperation( char ) ) {
                    this._tokens.push( new Token( tokenTypes.operation, this.getOperation( char ), depth, index ) )
                } else if ( this.isLeftParenthesis( char ) ) {
                    console.log(char)
                    this._tokens.push( new Token( tokenTypes.subExpressionStart, char, depth, index ) )
                    depth++
                } else if ( this.isRightParenthesis( char ) ) {
                    console.log(char)
                    depth--
                    this._tokens.push( new Token( tokenTypes.subExpressionEnd, char, depth, index ) )
                } else if ( this.isOr( char ) ) {
                    this._tokens.push( new Token( tokenTypes.or, char, depth, index ) )
                } else if ( this.isStringStart( char ) ) {
                    this._insideString = true
                    stringStartPos = index
                } else if ( this.isPrintableChar( char ) ) {
                    this._tokens.push( new Token( tokenTypes.string, char, depth, index ) )
                }
            }

            // this._tokens.push();
        } )

        // check for unterminated strings
        if ( this._insideString ) { // if we never finished the string
            //console.log( this, stringBuffer, lookahead )
            console.log( `Unterminated string literal starting at position ${stringStartPos}` )
        }

        return this
    }

    isOperation( char ) {
        return this._operations.has( char )
    }

    getOperation( char ) {
        return this._operations.get( char )
    }

    /**
     *
     * @param char
     * @returns {boolean}
     */
    isLetter( char ) {
        return /[a-z]/i.test( char )
    }

    /**
     *
     * @param char
     * @returns {boolean}
     */
    isOperator( char ) {
        return /[|]/.test( char )
    }

    /**
     *
     * @param char
     * @returns {boolean}
     */
    isLeftParenthesis( char ) {
        return char === '('
    }

    /**
     *
     * @param char
     * @returns {boolean}
     */
    isRightParenthesis( char ) {
        return char === ')'
    }

    /**
     *
     * @param char
     * @returns {boolean}
     */
    isStringStart( char ) {
        return char === '"' && !this._insideString
    }

    /**
     *
     * @param char
     * @param lookahead
     * @param lookahead2
     * @returns {boolean}
     */
    isStringEnd( char, lookahead, lookahead2 ) {
        // console.log({char, cond:char === '"' && this._insideString })

        // console.log({char, lookahead, inString: this._insideString, v: char === '"' && this._insideString &&
        // lookahead !== '"'}) nextCharIsEscapedQuote = (lookahead + lookahead2 === '\\"')
        return char === '"' && this._insideString //&& lookahead !== '"'
    }

    /**
     *
     * @param char
     * @returns {boolean}
     */
    isOr( char ) {
        return char === '|'
    }

    isPrintableChar( char ) {
        let allowed = [' ', '\'']

        return allowed.includes( char )
    }
}


/**
 *
 * @param validOperations
 * @returns {Tokenizer}
 */
export function tokenizerFactory( validOperations ) {
    return new Tokenizer( validOperations )
}