import { derived, writable } from 'svelte-persistent-store/local'
import { onDestroy } from 'svelte'

const userSettingDarkMode = writable( 'user_setting.dark_mode', false )
const userSettingPattern = writable( 'user_setting.pattern', 'fl' )
const userSettingNumberToGenerate = writable( 'user_setting.number_to_generate', 40 )

const userSettings = derived( 'userSettings',
  [userSettingDarkMode, userSettingPattern, userSettingNumberToGenerate],
  ([userSettingDarkMode, userSettingPattern, userSettingNumberToGenerate],
    set) => {
      let settings = {
          darkMode: userSettingDarkMode,
          pattern: userSettingPattern,
          numberToGenerate: userSettingNumberToGenerate,
      }
      set( JSON.stringify( settings ) )
  } )


export function getUserSettings() {
    let result = {}
    let unsubscribe = userSettings.subscribe( settings => {
        result = JSON.parse( settings )
    } )

    onDestroy( unsubscribe )
    return result
}

export function setUserSettings(settings) {
    userSettingDarkMode.set( settings.darkMode )
    userSettingPattern.set( settings.pattern )
    userSettingNumberToGenerate.set( settings.numberToGenerate )
}