import LogicalGroup from './logical_group_op'

test( 'LogicalGroup op returns group of letters', () => {
    const op = new LogicalGroup()
    const generatedValue = op.handle()

    expect( op.token ).toBe( 'g' )
    expect( op.description ).toBe( 'A set of letters best grouped together (works well for high fantasy names)' )
    expect( generatedValue.length).toBe( 3 )
} )
