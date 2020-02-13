<script>
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
	import { onMount, tick } from 'svelte'

	import { getUserSettings, setUserSettings } from './stores/userSettings.store'
	import { generateName, tokens } from './NameGenerator.js'
	import DarkMode from './components/DarkMode.svelte'
	import PatternEditor from './components/PatternEditor.svelte'
	import NameList from './components/NameList.svelte'
	import TokenHelp from './components/TokenHelp.svelte'
	import Examples from './components/Examples.svelte'

	//------------------[ Interal Vars ]------------------//

	let userSettings = getUserSettings()
	let darkMode = userSettings.darkMode || false
	let pattern = userSettings.pattern || 'cvS'
	let numberToGenerate = userSettings.numberToGenerate || 20
	let notificationDisplay
	let names = []
	let patternUrlInput
	//------------------[ REACTIVE PROPS ]------------------//

	/**
	 * */
	$: notificationThemes = { // These are the defaults
		danger: '#bb2124',
		success: (darkMode) ? '#fff' : '#7a9a74',
		warning: '#f0ad4e',
		info: '#5bc0de',
		default: '#aaa', // relates to simply '.show()'
	}
	// auto generate the pattern uri each time the pattern changes
	$: patternURI = encodeURI( `${window.location.origin}?pattern=${pattern}` )

	// auto save the user settings each time something changes
	$: {
		if (numberToGenerate < 1) {
			numberToGenerate = 1
		}
		userSettings.darkMode = darkMode
		userSettings.pattern = pattern
		userSettings.numberToGenerate = numberToGenerate
		setUserSettings( userSettings )
	}

	onMount( async() => {
		await tick()
		pattern = new URLSearchParams( window.location.search ).get( 'pattern' ) || userSettings.pattern
	} )

	/**
	 * Dynamically re-calculate the names (requires the variables to be referred to in the function
	 ***/
	$: names = (() => {
		if (numberToGenerate > 0) {
			return generateNamesList( pattern )
		}
	})()

	/**
	 * Capitalize all words
	 *
	 * @param value
	 * @returns {string}
	 */
	function capitalize(value) {
		return value.split( ' ' )
				.map( v => (v.length) ? v[0].toUpperCase() + v.substr( 1 ).toLowerCase() : '' ).join( ' ' )
	}

	function generateNamesList(pattern) {
		let result = []
		for (let i = 0; i < numberToGenerate; i++) {
			result.push( capitalize( generateName( pattern ) ) )
		}
		return result
	}

	function copyPatternUri() {
		patternUrlInput.select()
		patternUrlInput.setSelectionRange( 0, patternURI.length )
		if (document.execCommand( "copy" )) {
			notifier.success( 'Copied!', 1500 )
		} else {
			notifier.warning( 'Unable to copy to clipboard, this might be caused by your browser\'s security settings. (you can still copy it manually)', 2500 )
		}
		patternUrlInput.setSelectionRange( 0, 0 )
	}
</script>

<NotificationDisplay bind:this={notificationDisplay} themes={notificationThemes}/>
<DarkMode bind:enabled={darkMode}/>
<TokenHelp {tokens}/>
<PatternEditor bind:pattern={pattern}/>

<button on:click={() => names = generateNamesList(pattern)}>
	Refresh
</button>
<label for="number_to_generate">Number to generate:
<input
	type="number"
	bind:value={numberToGenerate}
	id="number_to_generate" min="1"
/></label>

<NameList names={names}/>
<Examples bind:pattern={pattern}/>

<div class="pattern-url">
	<label>Pattern URL: <input type="url" value="{patternURI}" bind:this={patternUrlInput}/>
		<button on:click={copyPatternUri}>Copy Pattern URL</button>
	</label>
</div>

<style>
	:global(.dark-mode-toggle) {
		float: right;
	}

	.pattern-url input {
		margin-right: 0.5rem;
		width: 80%;
	}

	:global(.dark-mode .toasts .toast .content) {
		color: #000;
	}
</style>