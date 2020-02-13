import { writable } from 'svelte-persistent-store/local'
import { onDestroy } from 'svelte'
import LZString from 'lz-string'

// increment each time something changes to help migration of future settings
export const SETTINGS_VERSION = 2;
/**
 *
 * @type {{pattern: string | string, numberToGenerate: number, darkMode: boolean, version: number}}
 */
const defaultSettings = {
    darkMode: false,
    pattern: 'fl',
    numberToGenerate: 40,
    version: SETTINGS_VERSION,
}

const userSettings = writable( 'user_settings', JSON.stringify( defaultSettings ) )

export function getUserSettings() {
    let result = {}
    let versionNumber = 0;
    let unsubscribe = userSettings.subscribe( settings => {
        if (settings) {
            result = JSON.parse( settings )
            if (result.version) {
                versionNumber = parseInt(result.version, 10) // for future use
                if (versionNumber !== SETTINGS_VERSION){
                    console.log(`userSettings is a different version (${versionNumber}) from the current settings version (${SETTINGS_VERSION})`)
                }
            }
        }
    } )

    onDestroy( unsubscribe )

    return result
}

/**
 *
 * @param settings
 *
 * @returns {{pattern: string | string, numberToGenerate: number, darkMode: boolean, version: number}}
 */
function upgradeSettings(settings) {
    let defaultSettingsKeys = Object.getOwnPropertyNames(defaultSettings);

    defaultSettingsKeys.forEach((property) => {
        if (typeof settings[property] === 'undefined'){
            settings[property] = defaultSettings[property];
        }
    })

    //strip unknown properties out
    Object.keys(settings).forEach( (property) => {
        if (typeof defaultSettings[property] === 'undefined') {
            delete settings[property];
        }
    } )

    return settings;
}

export function setUserSettings(settings) {
    settings = upgradeSettings(settings);
    settings = settings || defaultSettings

    userSettings.set( JSON.stringify( settings ) )
}