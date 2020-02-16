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