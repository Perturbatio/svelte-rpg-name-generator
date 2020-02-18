import HardConsonant from './hard_consonant_op'

test( 'HardConsonant op returns a value', () => {
    const op = new HardConsonant()
    let generatedValue = op.handle()

    expect( op.token ).toBe('h')
    expect( op.description ).toBe('A single hard consonant')
    expect( generatedValue.length ).toBe(1)
    expect('bcdgkpqtxz'.includes(generatedValue)).toBe(true)

} )