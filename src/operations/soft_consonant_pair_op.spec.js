import SoftConsonantPair from './soft_consonant_pair_op'

test( 'SoftConsonantPair op returns something', () => {
    const op = new SoftConsonantPair()
    const generatedValue = op.handle()

    expect( op.token ).toBe( 'S' )
    expect( op.description ).toBe( 'A soft consonant pair' )
    expect( generatedValue.length >= 2 ).toBe(true)
    expect( generatedValue.length <= 4 ).toBe(true)

} )
