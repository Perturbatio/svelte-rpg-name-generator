import { flip, rand } from './random'

test( 'flip returns only true or false', () => {
    // we'll just run through a bunch of flips
    // it's possible that we'd get the same value
    // each time, but it should still only be true or false
    const validValues = [true, false]
    const flips = []
    let flipResult
    for (let i = 0; i < 100; i++) {
        flipResult = flip()
        flips.push( flipResult )
        expect( validValues.includes( flipResult ) ).toBe( true )

    }
    let total = flips.reduce( (result, flipValue) => {
        return result += (flipValue) ? 1 : 0
    }, 0 )

    expect( total ).toBeLessThanOrEqual( 100 )
    expect( total ).toBeGreaterThanOrEqual( 0 )
} )

test( 'rand returns values within the range', () => {
    let min
    let max
    let value

    min = 0
    max = 1
    value = rand( min, max )
    // console.log({testing:`rand(${min},${max})`, value})
    expect( [min, max].includes( value ) ).toBe( true )

    min = 99
    max = 100
    value = rand( min, max )
    // console.log({testing:`rand(${min},${max})`, value})
    expect( [min, max].includes( value ) ).toBe( true )

    min=0
    max=10000
    value = rand( min, max );
    // console.log({testing:`rand(${min},${max})`, value})
    expect( value ).toBeLessThanOrEqual( max )
    expect(value).toBeGreaterThanOrEqual(min)
} )

test( 'rand handles negative values', () => {
    let min
    let max
    let value

    min = -2
    max = -1
    expect( [min, max].includes( rand( min, max ) ) ).toBe( true )

} )
