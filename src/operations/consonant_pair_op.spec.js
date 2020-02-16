import ConsonantPair from './consonant_pair_op'

test( 'ConsonantPair op returns a valid double consonant', () => {
    const op = new ConsonantPair()
    const validPairs = ['bs', 'ck', 'dh', 'll', 'lk', 'mn', 'th', 'lm', 'sp', 'dz', 'ym', 'zh']
    const generatedValue = op.handle()

    expect( op.token ).toBe( 'C' )
    expect( op.description ).toBe( 'A "nice" consonant pair' )
    expect( generatedValue.length ).toBe(2)
    expect( validPairs.includes(generatedValue)).toBe(true)
} )