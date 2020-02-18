import VowelPair from './vowel_pair_op'

test( 'VowelPair op returns a valid vowel', () => {
    const op = new VowelPair()
    const generatedValue = op.handle()

    expect( op.token ).toBe( 'V' )
    expect( op.description ).toBe( 'A "nice" vowel pair' )
    expect( generatedValue.length ).toBe(2)
    expect([ // certain vowel pairs are disallowed
      'ae', 'ai', 'ao', 'au',
        'ea', 'ee', 'ei', 'eo', 'eu',
        'ia', 'ie', 'io', 'iu',
        'oa', 'oe', 'oi', 'oo', 'ou',
        'ua', 'ue', 'ui', 'uo'].includes(generatedValue)).toBe(true)
    expect( generatedValue.length ).toBe(2)
} )
