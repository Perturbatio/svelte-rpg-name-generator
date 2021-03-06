import AccentedVowel from './accented_vowel_op'

test( 'Accented vowel returns a value', () => {
    const op = new AccentedVowel()
    const validChars = 'æåàéèêëēìœøöòŭù'
    const generatedValue = op.handle()

    expect( op.token ).toBe( 'a' )
    expect( op.description ).toBe( 'A single accented vowel' )
    expect( generatedValue.length ).toBe(1)
    // ensure that it's at least not within the ASCII A-z set
    expect(generatedValue.charCodeAt(0)).toBeGreaterThan(122)
    expect( validChars.includes(generatedValue)).toBe( true )
} )


test( 'AccentedVowel op can exclude chars', () => {
    const op = new AccentedVowel()
    const vowels = 'æåàéèêëēìœøöòŭù'
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