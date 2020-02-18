import Vowel from './vowel_op'

test( 'Vowel op returns a valid vowel', () => {
    const op = new Vowel()
    const validChars = 'aeiou'
    const generatedValue = op.handle()

    expect( op.token ).toBe( 'v' )
    expect( op.description ).toBe( 'A single vowel' )
    expect( generatedValue.length ).toBe(1)
    expect( validChars.includes(generatedValue)).toBe( true )
} )

test( 'Vowel op can exclude chars', () => {
    const op = new Vowel()
    const vowels = 'aeiou'
    let validChars
    let invalidChars
    let generatedValue

    // iterate through all vowels and ensure none are generated if excluded
    for (let i = 0; i < vowels.length; i++){
        validChars = vowels.slice(i)
        invalidChars = vowels.slice(0,i)
        generatedValue = op.handle(invalidChars)

        expect( validChars.includes(generatedValue)).toBe( true )
        expect( invalidChars.includes(generatedValue)).not.toBe( true )
    }

} )