import Examples from './Examples.svelte'
import { fireEvent, render } from "@testing-library/svelte"
import '@testing-library/jest-dom/extend-expect'

test( '<Examples /> renders a list', () => {
    let pattern = ''
    let options = { props: { pattern: pattern } }
    const wrapper = render( Examples, options )
    let list = wrapper.getByTestId( 'example-list' )

    expect( list.tagName ).toBe( 'UL' )
} )

test( '<Examples /> first example is clickable', async() => {
    const wrapper = render( Examples, { props: { pattern: '' } } )
    let example1 = wrapper.getByTestId( 'example-item-0' )

    expect( example1.tagName ).toBe( 'BUTTON' )
    await fireEvent.click( example1 )

    //TODO: figure out how to test for prop changes
    // expect( pattern ).toBe('cvS')

} )