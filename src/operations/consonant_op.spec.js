import Consonant from './consonant_op'

test( 'Consonant op returns a valid consonant', () => {
    const op = new Consonant()
    const validChars = 'bcdfghjklmnpqrstvwxyz'
    const generatedValue = op.handle()

    expect( op.token ).toBe( 'c' )
    expect( op.description ).toBe( 'A single consonant' )
    expect( generatedValue.length ).toBe(1)
    expect( validChars.includes(generatedValue)).toBe( true )
} )