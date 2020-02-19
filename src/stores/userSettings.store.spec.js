// import { fireEvent, render } from "@testing-library/svelte"
// import '@testing-library/jest-dom/extend-expect'
// import {getUserSettings, setUserSettings} from './userSettings.store'

// jest.mock( './../helpers/random.js', () => (
//   {
//       ...(jest.requireActual( './../helpers/random.js' )),
//       rand: (min, max) => {
//           return 0;
//       }
//   }
// ) )
//
// test('User settings returns defaults if no settings available', () => {
//     let settings = render(getUserSettings);
//     console.log(settings);
// })
test('User settings returns defaults if no settings available', () => {
    // TODO: figure out how to test this when it includes the svelte onDestroy method
})