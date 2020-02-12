import { writable } from 'svelte-persistent-store/local'
import { onDestroy } from 'svelte'

const defaultSettings = {
    darkMode: false,
    pattern: 'fl',
    numberToGenerate: 40,
}
const userSettings = writable( 'user_settings', JSON.stringify( defaultSettings ) )

export function getUserSettings() {
    let result = {}
    let unsubscribe = userSettings.subscribe( settings => {
        if (settings) {
            result = JSON.parse( settings )
        }
    } )

    onDestroy( unsubscribe )
    return result
}

export function setUserSettings(settings) {
    settings = settings || defaultSettings
    userSettings.set( JSON.stringify( settings ) )
}