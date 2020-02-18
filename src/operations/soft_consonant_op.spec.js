import SoftConsonant from './soft_consonant_op'

test( 'SoftConsonant op returns something', () => {
    const op = new SoftConsonant()
    const generatedValue = op.handle()

    expect( op.token ).toBe( 's' )
    expect( op.description ).toBe( 'A single soft consonant' )
    expect( generatedValue.length ).toBe( 1 )
    expect( "fhjlmnrswy".includes( generatedValue ) ).toBe( true )

} )
