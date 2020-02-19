import '@testing-library/jest-dom/extend-expect'
import { getUserSettings, setUserSettings } from './userSettings.store'

test( 'User settings returns defaults if no settings available', () => {
    let settings = getUserSettings()

    expect( typeof settings ).toBe( 'object' )
    expect( typeof settings.darkMode ).toBe( 'boolean' )
    expect( typeof settings.pattern ).toBe( 'string' )
    expect( typeof settings.numberToGenerate ).toBe( 'number' )
    expect( typeof settings.version ).toBe( 'number' )
} )

test( 'User settings can be set', () => {
    let settings = getUserSettings()
    settings.darkMode = true
    settings.pattern = 'cv'
    settings.numberToGenerate = 1
    setUserSettings( settings )
    settings = getUserSettings()
    expect( settings.darkMode ).toBe( true )
    expect( settings.pattern ).toBe( 'cv' )
    expect( settings.numberToGenerate ).toBe( 1 )
} )

test( 'User settings gets upgraded when saving', () => {
    let settings = getUserSettings()
    settings.darkMode = true
    settings.pattern = 'cv'
    settings.numberToGenerate = 1
    settings.version = 1
    setUserSettings( settings )
    settings = getUserSettings()
    expect( settings.version ).toBe( 2 )
} )

test( 'User settings get restored if missing', () => {
    let settings = {
          version: 0,
      }
    setUserSettings( settings )
    settings = null
    settings = getUserSettings()
    expect( settings.darkMode ).toBe( false )
    expect( settings.pattern ).toBe( 'fl' )
    expect( settings.numberToGenerate ).toBe( 40 )
    expect( settings.version ).toBe( 2 )
} )

test( 'User settings get stripped if not expected', () => {
    let settings

    setUserSettings( {
        version: 0,
        test_property: 'deleteme',
    } )

    settings = getUserSettings()
    expect( settings.test_property ).toBeUndefined()
} )
