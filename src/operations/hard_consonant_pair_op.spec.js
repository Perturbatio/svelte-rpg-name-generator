import HardConsonantPair from './hard_consonant_pair_op'

test( 'HardConsonantPair op returns a value', () => {
    const op = new HardConsonantPair()
    let generatedValue = op.handle()

    expect( op.token ).toBe('H')
    expect( op.description ).toBe('A double hard consonant')
    expect( generatedValue.length ).toBe(2)
    expect(['ck', 'dz', 'tz', 'cz', 'pt'].includes(generatedValue)).toBe(true)

} )