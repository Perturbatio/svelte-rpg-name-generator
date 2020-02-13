<script>
	import { getUserSettings, setUserSettings } from './stores/userSettings.store'
	import { generateName, tokens } from './NameGenerator.js'
	import DarkMode from './components/DarkMode.svelte'
	import PatternEditor from './components/PatternEditor.svelte'
	import { onMount, tick } from 'svelte'
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
	import NameList from './components/NameList.svelte'
	import TokenHelp from './components/TokenHelp.svelte'

	let userSettings = getUserSettings()

	let darkMode = userSettings.darkMode || false
	let pattern = userSettings.pattern || 'cvS'
	let numberToGenerate = userSettings.numberToGenerate || 20

	/**
	 * */
	$: notificationThemes = { // These are the defaults
		danger: '#bb2124',
		success: (darkMode) ? '#fff' : '#7a9a74',
		warning: '#f0ad4e',
		info: '#5bc0de',
		default: '#aaa', // relates to simply '.show()'
	}
	let notificationDisplay

	let helpVisible = false
	let names = []
	let space = ' ' // hack to prevent IDE auto-trimming spaces inside template strings
	let patternUrlInput
	let examples = [
		// {title: 'depth test', pattern: 'fl(c|(vv|(c|v)))'},
		// {title: 'sub test', pattern: '"test"(c|v)'},
		{ title: 'Simple name', pattern: 'cvS' },
		{ title: 'Alternating string endings', pattern: 'cvSv|c"ni"|"ane"|"nia"|"ellia"' },
		{ title: 'Optional strings', pattern: '"Illy"|"Al"Vcv' },
		{ title: 'Elf Female', pattern: 'fl' },
		{ title: 'Exotic', pattern: 'fc h\'Vl' },
		{ title: 'Exotic 2', pattern: 'fc hw\'Vl' },
		{ title: 'Exotic 3', pattern: 'a|fc hw\'Vl' },
		{
			title: 'Dwarven name (test)', pattern: `(c|"")vs("grim"|"vald"|"wold"|"ven"|"grith"|"kili"|"dorth")
${space}
(
"Stone"|"Gold"|"Iron"|"Copper"|
"silver"|"Mountain"|"Hill"|"Fire"|"cold"|
"Golden"
)

(
"Shield"|"Axe"|"Tooth"|"Hammer"|
"Forge"|"Hearth"|"House"|"Helm"|
"Heart"|"shaper"|"biter"|"eater"|
"Fist"|"splitter"|"crusher"|"cleaver"
)`,
		},
	]


	$: patternURI = encodeURI( `${window.location.origin}?pattern=${pattern}` )

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

		let linkPattern = new URLSearchParams( window.location.search ).get( 'pattern' )

		pattern = linkPattern || userSettings.pattern
	} )

	$: names = (()=>{
		if (numberToGenerate > 0){
			return generateNamesList(pattern)
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

	/**
	 *
	 */
	function toggleHelp() {
		helpVisible = !helpVisible
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

<button on:click={toggleHelp}>
	Help
</button>
<TokenHelp visible={helpVisible} tokens={tokens}/>
<div>
	<PatternEditor bind:pattern={pattern}/>
</div>

<div class="pattern-controls">
	<div class="primary">
		<button on:click={() => names = generateNamesList(pattern)}>
			Refresh
		</button>
		<label for="number_to_generate">Number to generate:
			<input
					type="number"
					bind:value={numberToGenerate}
					id="number_to_generate" min="1"
			/></label>

	</div>
	<div class="secondary">
	</div>
</div>

<NameList names={names}/>

<h2>
	Examples
</h2>
<div class="examples">
	{#each examples as example}
		<div class="example-item">
			<button on:click={() => (pattern = example.pattern)} title={example.pattern}>{example.title}</button>
		</div>
	{/each}
</div>

<div class="pattern-url">
	<label>Pattern URL: <input type="url" value="{patternURI}" bind:this={patternUrlInput}/>
		<button on:click={copyPatternUri}>Copy Pattern URL</button>
	</label>
</div>
<style>

	.help-text {
		display: none;
	}

	.help-text.visible {
		display: block;
	}

	.examples {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.example-item {
		margin: 0 0.5rem;
	}

	:global(.dark-mode-toggle) {
		float: right;
	}

	.pattern-controls {

	}

	.pattern-controls .primary {
		display: block;
	}

	.pattern-controls .secondary {
		display: block;
	}

	.pattern-url input {
		margin-right: 0.5rem;
		width: 80%;
	}

	:global(.dark-mode .toasts .toast .content) {
		color: #000;
	}
</style>