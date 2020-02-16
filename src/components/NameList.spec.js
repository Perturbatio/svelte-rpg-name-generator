import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from "@testing-library/svelte"
import NameList from './NameList.svelte'

test( '<NameList /> renders a list', () => {
    const wrapper = render(NameList, {props: {names: [
      'Bob', 'Samantha', 'Craig', 'Moira', 'Angus', 'Mhairi'
    ]}})

    let list = wrapper.getByTestId('name-list')
    expect(list).toHaveTextContent('Bob')
    expect(list).toHaveTextContent('Samantha')
    expect(list).toHaveTextContent('Craig')
    expect(list).toHaveTextContent('Moira')
    expect(list).toHaveTextContent('Angus')
    expect(list).toHaveTextContent('Mhairi')
} )