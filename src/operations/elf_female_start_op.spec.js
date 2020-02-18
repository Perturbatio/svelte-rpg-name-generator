import ElfFemaleStart from './elf_female_start_op'

test( 'ElfFemaleStart op returns a value', () => {
    const op = new ElfFemaleStart()
    let generatedValue = op.handle()

    expect( op.token ).toBe('f')
    expect( op.description ).toBe('The beginning of an elven style name')
    expect( generatedValue.length ).toBeGreaterThan(1)

} )