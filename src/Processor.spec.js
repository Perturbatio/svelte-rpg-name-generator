import '@testing-library/jest-dom/extend-expect'
import { tokenizerFactory, Tokenizer } from './tokenizer/Tokenizer'
import Vowel from './operations/vowel_op'
import Consonant from './operations/consonant_op'
import { Processor, process } from './Processor'

test( 'Processor can be instantiated and run with no operations in tokenizer', () => {
    const tokenizer = tokenizerFactory( [] ).tokenize( '("test"|"other")\' ' )
    const tokens = tokenizer.tokens
    const result = process(tokens)
    const possibleResults = [
      'test\' ',
      'other\' ',
    ]
    expect(possibleResults.includes(result)).toBe(true)
} )

test( 'Processor handles operations', () => {
    const tokenizer = tokenizerFactory( [
      new Vowel(),
      new Consonant(),
    ] ).tokenize( 'cv' )
    const tokens = tokenizer.tokens
    const result = process(tokens)

    expect(result.length).toBe(2)
} )

test( 'Processor handles operations with OR', () => {
    const tokenizer = tokenizerFactory( [
      new Vowel(),
      new Consonant(),
    ] ).tokenize( 'c|v' )
    const tokens = tokenizer.tokens
    const result = process(tokens)

    expect(result.length).toBe(1)
} )

test( 'Processor handles sub expression with OR', () => {
    const tokenizer = tokenizerFactory( [
      new Vowel(),
      new Consonant(),
    ] ).tokenize( '("test"|(ccvv))' )
    const tokens = tokenizer.tokens
    const result = process(tokens)

    expect(result.length).toBe(4)
} )

describe('Test processor errors', () => {
    test( 'Processor returns message when no tokens present', () => {
        const result = process([])
        expect(result).toBe('Empty expression encountered')
    } )

    test( 'Processor errors when a double OR encountered', () => {
        const originalConsole = {
            warn: console.warn,
            error: console.error,
            log: console.log,
        }
        let consoleOutput = []
        const mockConsoleError = output => consoleOutput.push( output )
        console.error = mockConsoleError
        try {
            const tokenizer = tokenizerFactory( [] ).tokenize( 'v||v' )
            const tokens = tokenizer.tokens
            const processor = new Processor( tokens )
            processor.process()

            expect( consoleOutput ).toEqual( [
                'Double OR encountered at position 0',
                'Double OR encountered at position 1',
            ] )

        } catch (e) {
            console.log(e)
        } finally {
            console.warn = originalConsole.warn
            console.error = originalConsole.error
            console.log = originalConsole.log
        }
    } )
})