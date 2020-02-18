import VowelPair from './vowel_pair_op'

/**
 * Mock the random function to test that we never get duplicated (preventDoublesOf)
 * (i.e. force a to be the first value and e to be the second)
 *
 * NOTE: this is in a separate file because we want random in the other tests
 */
jest.mock('./../helpers/random.js', () => (
  {
      ...(jest.requireActual('./../helpers/random.js')),
      rand: (min, max) => {
          return 0;
      }
  }
))

test( 'VowelPair op returns a valid vowel without duping', () => {
    const op = new VowelPair()
    const generatedValue = op.handle()

    expect( op.token ).toBe( 'V' )
    expect( op.description ).toBe( 'A "nice" vowel pair' )
    expect( generatedValue.length ).toBe(2)
    expect(generatedValue).toBe('ae')
    expect( generatedValue.length ).toBe(2)
} )
