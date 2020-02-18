import SoftSyllable from './soft_syllable_op'

test( 'SoftSyllable op returns something', () => {
    const op = new SoftSyllable()
    const generatedValue = op.handle()

    expect( op.token ).toBe( 'y' )
    expect( op.description ).toBe( 'A soft sounding syllable' )
    expect( generatedValue.length >= 2 ).toBe(true)
    expect( generatedValue.length <= 3 ).toBe(true)

} )
