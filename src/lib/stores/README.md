# Settings Store

A central settings interface for the application that allows saving user settings to local storage
and retrieving them from any component or plain JS file.

## Features

- Centralised store for all user settings
- Persistent storage using localStorage
- Type-safe access to settings
- Default values for settings
- Reactive updates across components

## Usage

### Basic Usage

```javascript
import { settingsStore } from '$lib/stores/settingsStore';

// Get a setting with a default value
const pattern = settingsStore.getSetting('pattern', 'default-pattern');

// Set a setting
settingsStore.setSetting('nameCount', 20);

// Reset all settings to defaults
settingsStore.resetSettings();
```

### Subscribing to Settings Changes

```javascript
import { settingsStore } from '$lib/stores/settingsStore';
import { onMount } from 'svelte';

let pattern = '';
let nameCount = 12;

onMount(() => {
	// Get initial values
	pattern = settingsStore.getSetting('pattern', 'default-pattern');
	nameCount = settingsStore.getSetting('nameCount', 12);

	// Subscribe to changes
	const unsubscribe = settingsStore.subscribe((settings) => {
		pattern = settings.pattern;
		nameCount = settings.nameCount;
	});

	// Clean up subscription on component unmount
	return unsubscribe;
});
```

### Using in a Svelte Component

```svelte
<script>
	import { settingsStore } from '$lib/stores/settingsStore';
	import { onMount } from 'svelte';

	let mySettings = {};

	onMount(() => {
		// Initialize with stored settings
		mySettings = {
			pattern: settingsStore.getSetting('pattern', 'default-pattern'),
			nameCount: settingsStore.getSetting('nameCount', 12)
		};

		// Subscribe to changes
		return settingsStore.subscribe((settings) => {
			mySettings = settings;
		});
	});

	function updateSetting(key, value) {
		settingsStore.setSetting(key, value);
	}
</script>

<div>
	<input
		type="text"
		bind:value={mySettings.pattern}
		on:change={() => updateSetting('pattern', mySettings.pattern)}
	/>
</div>
```

## API Reference

### Store Methods

#### `settingsStore.subscribe(callback)`

Subscribe to changes in the settings store. Returns an unsubscribe function.

#### `settingsStore.setSetting(key, value)`

Set a specific setting value.

#### `settingsStore.getSetting(key, defaultValue)`

Get a specific setting value with an optional default.

#### `settingsStore.resetSettings()`

Reset all settings to their default values.

#### `settingsStore.importSettings(settingsObject)`

Import settings from a JSON object.

### Convenience Exports

The store provides convenience exports for commonly used settings:

#### `getPattern()`

Get the current pattern setting with the default value.

#### `getNameCount()`

Get the current nameCount setting with the default value.

#### `getSidebarOpen()`

Get the current sidebarOpen setting with the default value.

#### `getAstVisible()`

Get the current astVisible setting with the default value.

#### `getTheme()`

Get the current theme setting with the default value.

Example usage:

```javascript
import { getPattern, getNameCount, getTheme } from '$lib/stores/settingsStore';

const currentPattern = getPattern();
const currentNameCount = getNameCount();
const currentTheme = getTheme();
```

## Default Settings

The default settings are defined in the `DEFAULT_SETTINGS` object in the store:

```javascript
const DEFAULT_SETTINGS = {
	pattern: 'c(a|v)C(a|v)',
	nameCount: 12,
	astVisible: false,
	sidebarOpen: false,
	theme: 'dark'
	// Add more default settings as needed
};
```

## Adding New Settings

To add a new setting, update the `DEFAULT_SETTINGS` object with your new setting and its default value.
