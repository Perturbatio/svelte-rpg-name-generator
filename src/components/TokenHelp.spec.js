import '@testing-library/jest-dom/extend-expect'
import { render } from "@testing-library/svelte"
import TokenHelp from './TokenHelp.svelte'

test( '<TokenHelp /> is not visible by default', () => {
    const wrapper = render( TokenHelp )

    let button = wrapper.getByTestId( 'help-button' )
    // can't use getByTestId since the element won't be in the DOM
    let helpText = document.querySelector( '[data-testid="help-text"]' )

    expect( button ).toHaveTextContent( 'Help' )
    expect( helpText ).toBeNull()
} )


test( '<TokenHelp /> renders the token descriptions', () => {
    let tokenDescriptionsProp = [
        { token: 'z', description: 'Z Description' },
        { token: 'g', description: 'G Description' },
        { token: 't', description: 'T Description' },
        { token: 'a', description: 'A Description' },
    ]
    const wrapper = render( TokenHelp, {
        props: {
            visible: true, tokenDescriptions: tokenDescriptionsProp,
        },
    } )

    let button = wrapper.getByTestId( 'help-button' )
    // can't use getByTestId since the element won't be in the DOM
    let helpText = document.querySelector( '[data-testid="help-text"]' )
    let tokenKeywords = document.querySelectorAll('[data-testid^="token-keyword"]')
    let tokenDescriptions = document.querySelectorAll('[data-testid^="token-description"]')

    expect( helpText ).not.toBeNull()
    expect( tokenKeywords.length ).toBe(4)
    // assert that the four items passed to tokenDescriptions are sorted alphabetically by token
    expect(tokenKeywords[0].textContent).toBe('a')
    expect(tokenKeywords[1].textContent).toBe('g')
    expect(tokenKeywords[2].textContent).toBe('t')
    expect(tokenKeywords[3].textContent).toBe('z')

    // assert that the descriptions have rendered
    expect(tokenDescriptions[0].textContent).toBe('A Description')
    expect(tokenDescriptions[1].textContent).toBe('G Description')
    expect(tokenDescriptions[2].textContent).toBe('T Description')
    expect(tokenDescriptions[3].textContent).toBe('Z Description')

    // assert that the default operator descriptions are rendered
    expect( helpText ).toHaveTextContent('OR operator')
    expect( helpText ).toHaveTextContent('Literal string value')
    expect( helpText ).toHaveTextContent('A sub expression')

} )