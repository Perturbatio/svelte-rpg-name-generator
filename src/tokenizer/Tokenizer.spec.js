import '@testing-library/jest-dom/extend-expect'
import { tokenizerFactory, Tokenizer } from './Tokenizer'
import Vowel from '../operations/vowel_op'
import VowelPair from '../operations/vowel_pair_op'
import Consonant from '../operations/consonant_op'
import ConsonantPair from '../operations/consonant_pair_op'
import SoftConsonant from '../operations/soft_consonant_op'
import SoftConsonantPair from '../operations/soft_consonant_pair_op'
import HardConsonant from '../operations/hard_consonant_op'
import LighterVowel from '../operations/lighter_vowel_op'
import LogicalGroup from '../operations/logical_group_op'
import AccentedVowel from '../operations/accented_vowel_op'
import ElfFemaleStart from '../operations/elf_female_start_op'
import ElfFemaleEnd from '../operations/elf_female_end_op'
import SoftSyllable from '../operations/soft_syllable_op'
import SoftSyllablePairs from '../operations/soft_syllable_with_pairs_op'

test( 'Tokenizer can be instantiated with no operations', () => {
    const tokenizer = tokenizerFactory( [] )
    expect( typeof tokenizer ).toBe( 'object' )
} )

test( 'Tokenizer can be instantiated with no operations and still parse an expression', () => {
    const tokenizer = tokenizerFactory( [] ).tokenize( '("test"|"other")\' ' )
    const tokens = tokenizer.tokens

    expect( tokens.length ).toBe( 7 )
    expect( tokens[0].type ).toBe( 'subExpressionStart' )
    expect( tokens[1].type ).toBe( 'string' )
    expect( tokens[1].value ).toBe( 'test' )
    expect( tokens[2].type ).toBe( 'or' )
    expect( tokens[3].type ).toBe( 'string' )
    expect( tokens[3].value ).toBe( 'other' )
    expect( tokens[4].type ).toBe( 'subExpressionEnd' )
    expect( tokens[5].type ).toBe( 'string' )
    expect( tokens[5].value ).toBe( "'" )
    expect( tokens[6].type ).toBe( 'string' )
    expect( tokens[6].value ).toBe( ' ' )

} )

test( 'Tokenizer can be instantiated with operations', () => {
    const ops = [
        new Vowel,
        new VowelPair,
        new Consonant(),
        new ConsonantPair(),
        new SoftConsonant(),
        new SoftConsonantPair(),
        new HardConsonant,
        new LighterVowel,
        new LogicalGroup,
        new AccentedVowel,
        new ElfFemaleStart,
        new ElfFemaleEnd,
        new SoftSyllable,
        new SoftSyllablePairs(),
    ]
    const tokenizer = tokenizerFactory( ops ).tokenize( `cv(C|V)` )
    const tokens = tokenizer.tokens

    expect( typeof tokenizer ).toBe( 'object' )
    expect( tokens.length ).toBe( 7 )
    expect( tokens[0].type ).toBe( 'operation' )
    expect( tokens[0].value.token ).toBe( 'c' )
    expect( tokens[1].type ).toBe( 'operation' )
    expect( tokens[1].value.token ).toBe( 'v' )
    expect( tokens[2].type ).toBe( 'subExpressionStart' )
    expect( tokens[3].type ).toBe( 'operation' )
    expect( tokens[3].value.token ).toBe( 'C' )
    expect( tokens[4].type ).toBe( 'or' )
    expect( tokens[5].type ).toBe( 'operation' )
    expect( tokens[5].value.token ).toBe( 'V' )
    expect( tokens[6].type ).toBe( 'subExpressionEnd' )

} )


test( 'Tokenizer handles unterminated strings', () => {
    const originalConsole = {
        warn: console.warn,
        error: console.error,
        log: console.log,
    }
    let consoleOutput = []
    const mockConsoleError = output => consoleOutput.push( output )
    console.error = mockConsoleError
    try {
        tokenizerFactory( [] ).tokenize( '"test' )
    } catch (e){
        expect( consoleOutput ).toEqual( [
            'Unterminated string literal starting at position 0',
        ] )
    } finally {
        console.warn = originalConsole.warn
        console.error = originalConsole.error
        console.log = originalConsole.log
    }
} )

test( 'Tokenizer handles duplicate token registration', () => {
    const ops = [
        new Vowel,
        new Vowel,
    ]
    expect(() => tokenizerFactory(ops)).toThrow(Error)
} )
