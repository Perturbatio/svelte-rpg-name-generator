import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from "@testing-library/svelte"
import PatternEditor from './PatternEditor.svelte'

test( '<PatternEditor /> renders a list', () => {
    const wrapper = render(PatternEditor, {props: { pattern: 'cvS' }})

    let input = wrapper.getByTestId('pattern-input')
    expect(input.value).toBe('cvS')
} )