<script>
	import { getUserSettings, setUserSettings } from './stores/userSettings.store'
	import { generateName, tokens } from './NameGenerator.js'
	import { slide } from 'svelte/transition'
	import DarkMode from './components/DarkMode.svelte'
	import PatternEditor from './components/PatternEditor.svelte'
	import { onMount, tick } from 'svelte'
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'

	let userSettings = getUserSettings()

	let darkMode = userSettings.darkMode || false
	let pattern = userSettings.pattern || 'cvS'
	let numberToGenerate = userSettings.numberToGenerate || 40
/**
* */
	$: notificationThemes = { // These are the defaults
		danger: '#bb2124',
		success: (darkMode) ? '#ffffff' : '#7a9a74',
		warning: '#f0ad4e',
		info: '#5bc0de',
		default: '#aaa' // relates to simply '.show()'
	}
	let notificationDisplay;

	let visible = false
	let names = []
	let space = ' '; // hack to prevent IDE auto-trimming spaces inside template strings
	let patternUrlInput;
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

	$:sortedTokens = tokens.sort( (a, b) => {
		if (a.token.toLowerCase() < b.token.toLowerCase()) {
			return -1
		}
		if (a.token.toLowerCase() > b.token.toLowerCase()) {
			return 1
		}
		// a must be equal to b
		return 0
	} )

	$: patternURI = encodeURI( `${window.location.origin}?pattern=${pattern}` )

	$: {
		userSettings.darkMode = darkMode
		userSettings.pattern = pattern
		userSettings.numberToGenerate = numberToGenerate
		setUserSettings( userSettings )
	}

	onMount( async () => {
		await tick();

		let linkPattern = new URLSearchParams( window.location.search ).get( 'pattern' );

		pattern = linkPattern || userSettings.pattern
	} );

	$: names = generateNamesList( pattern )

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
		visible = !visible
	}

	function generateNamesList(pattern) {
		let result = []
		for (let i = 0; i < numberToGenerate; i++) {
			result.push( capitalize( generateName( pattern ) ) )
		}
		return result
	}

	function copyPatternUri(){
		patternUrlInput.select();
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

{#if visible}
<div class:visible class="help-text" transition:slide="{{delay: 0, duration: 300}}">
	<p>
		Using a combination of the tokens listed below, you can generate a variety of different names (The randomness
		will mean that not every name is as useful as others)
	</p>
	<dl class="token-list">
		{#each sortedTokens as kw}
			<dt>{kw.token}</dt>
			<dd>{kw.description}</dd>
		{/each}

		<dt>|</dt>
		<dd>OR operator</dd>
		<dt>"value"</dt>
		<dd>Literal string value</dd>
		<dt>(expression)</dt>
		<dd>A sub expression</dd>
	</dl>
</div>
{/if}
<div>
	<PatternEditor bind:pattern={pattern}/>
</div>

<div class="pattern-controls">
	<div class="primary">
		<button on:click={() => names = generateNamesList(pattern)}>
			Refresh
		</button>
	</div>
	<div class="secondary">
		<div class="pattern-url">
			<label>Pattern URL: <input type="url" value="{patternURI}" bind:this={patternUrlInput}/>
				<button on:click={copyPatternUri}>Copy</button></label>
		</div>
	</div>
</div>

<label for="number_to_generate">Number to generate: <input type="number" bind:value={numberToGenerate}
														 id="number_to_generate"/></label><br>

<div class="name-list">
	{#each names as name}
		<div class="item">
			{name}
		</div>
	{/each}
</div>

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
<style>

	.help-text {
		display: none;
	}

	.help-text.visible {
		display: block;
	}

	.token-list {
		display: grid;
		grid-template-columns: 1fr 15fr;
	}

	.token-list dt {
		font-weight: bold;
		text-align: right;
	}

	.token-list dd {
		text-align: left;
	}

	.name-list {
		max-width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (min-width: 64em) {
		/* medium or greater */
		.name-list {
			max-width: 100%;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.name-list .item {
		word-wrap: break-word;
		padding: 0.25rem 0.5rem;
	}

	.examples {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.example-item {
		margin: 0 0.5rem;
	}
	:global(.dark-mode-toggle){
		float:right;
	}

	.pattern-controls {
		display: grid;
		grid-template-columns: repeat(16, 1fr)
	}
	.pattern-controls .primary {
		grid-column-start: 1;
		grid-column-end: 8;
	}
	.pattern-controls .secondary {
		grid-column-start: 9;
		grid-column-end: 17;
		text-align: right;
		align-self: end;
	}
	.pattern-url input {
		margin-right: 0.5rem;
	}
	:global(.dark-mode .toasts .toast .content){
		color: #000;
	}
</style>