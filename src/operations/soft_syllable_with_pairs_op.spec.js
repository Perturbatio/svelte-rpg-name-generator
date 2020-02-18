import SoftSyllablePairs from './soft_syllable_with_pairs_op'

test( 'SoftSyllablePairs op returns something', () => {
    const op = new SoftSyllablePairs()
    const generatedValue = op.handle()

    expect( op.token ).toBe( 'Y' )
    expect( op.description ).toBe( 'A soft sounding syllable allowing pairs of consonants or vowels' )
    expect( generatedValue.length >= 2 ).toBe(true)
    expect( generatedValue.length <= 4 ).toBe(true)

} )
