import { fireEvent, render } from "@testing-library/svelte"
import '@testing-library/jest-dom/extend-expect'
import TestEnforceNumericConstraints from './_testing/TestEnforceNumericConstraints.svelte'
import enforceNumericConstraints from './enforceNumericConstraints'
import { tick } from 'svelte'

test( 'enforceNumericConstraints restricts values', async() => {
    const wrapper = render( TestEnforceNumericConstraints, { props: { value: 5 } } )
    let input = wrapper.getByTestId( 'numeric-input' )
    const valueOutput = wrapper.getByTestId( 'input-value' )

    wrapper.debug()

    expect( input ).toHaveValue( 5 )
    await fireEvent.input( input, { target: { value: '0' } } )
    await tick()

    expect( input ).toHaveValue( 1 )
} )

test( 'enforceNumericConstraints', () => {
    let input = document.createElement( 'INPUT' )
    let result
    input.type = 'number'
    input.setAttribute( 'min', "1" )
    input.setAttribute( 'max', "10" )
    input.setAttribute( 'value', "10" )
    document.body.appendChild( input )
    result = enforceNumericConstraints( input )

    expect( typeof result ).toBe( 'object' )
    expect( typeof result.destroy ).toBe( 'function' )
} )
