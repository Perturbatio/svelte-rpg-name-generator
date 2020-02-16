import ElfFemaleEnd from './elf_female_end_op'

test( 'ElfFemaleEnd op returns a value', () => {
    const op = new ElfFemaleEnd()
    let generatedValue = op.handle()

    expect( op.token ).toBe('l')
    expect( op.description ).toBe('The end of an elven style name')
    expect( generatedValue.length ).toBeGreaterThan(1)

} )