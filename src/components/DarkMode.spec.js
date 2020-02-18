import DarkMode from './DarkMode.svelte'
import { render, fireEvent } from "@testing-library/svelte";
import '@testing-library/jest-dom/extend-expect'

test( '<DarkMode enabled={false} />', () => {
    const wrapper = render( DarkMode, { props: { enabled: false } } )

    // wrapper.debug()

    let button = wrapper.getByTestId( 'darkmode-button' )
    // console.log( button )

    expect( button.tagName ).toBe( 'BUTTON' )
    expect( button.title ).toBe( 'Toggle dark mode on' )
} )

test( '<DarkMode enabled={true} />', () => {
    const wrapper = render( DarkMode, { props: { enabled: true } } )
    // wrapper.debug()

    let button = wrapper.getByTestId( 'darkmode-button' )

    expect( button.tagName ).toBe( 'BUTTON' )
    expect( button.title ).toBe( 'Toggle dark mode off' )
} )

test( '<DarkMode is clickable and toggles />', async () => {
    const wrapper = render( DarkMode, { props: { enabled: false } } )
    let button = wrapper.getByTestId( 'darkmode-button' )

    expect( button.tagName ).toBe( 'BUTTON' )
    expect( button.textContent ).toBe( '[DM]' )

    await fireEvent.click( button );

    expect( wrapper.container.classList.contains('dark-mode')).toBe(true)
    expect( button.textContent ).toBe( '[LM]' )
    expect( button.title ).toBe( 'Toggle dark mode off' )
} )

test( '<DarkMode is accessible />', async () => {
    const wrapper = render( DarkMode, { props: { enabled: false } } )

    // wrapper.debug()

    let button = wrapper.getByTestId( 'darkmode-button' )

    expect( button.title ).toBe( 'Toggle dark mode on' )
    expect( button.getAttribute('role') ).toBe( 'switch' )
} )