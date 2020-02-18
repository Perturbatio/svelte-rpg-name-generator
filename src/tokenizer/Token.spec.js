import { tick } from 'svelte'
import { fireEvent, render } from "@testing-library/svelte"
import '@testing-library/jest-dom/extend-expect'
import { Token } from './Token'

test( 'Token can be instantiated with parameters', () => {
    const token = new Token('test', 'TEST TOKEN', 100, 100)
    expect( typeof token ).toBe( 'object' )
    expect( token.type ).toBe( 'test' )
    expect( token.value ).toBe( 'TEST TOKEN' )
    expect( token.depth ).toBe( 100 )
    expect( token.position ).toBe( 100 )
} )
