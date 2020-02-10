<script>
	import { generateName, tokens } from './NameGenerator.js'

	let pattern = '("Thor"|"Gol")("grim"|"findel")'
	let visible = false
	let names = []
	let numberToGenerate = 1

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
		{ title: 'Dwarven test', pattern: '("Thor"|"Gol")("grim"|"findel")' },
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

	$:names = generateNamesList( pattern )

	function regenNames() {
		names = generateNamesList( pattern )
	}

	function setPattern(value) {
		pattern = value
		regenNames()
	}

</script>
<button on:click={toggleHelp}>
	Help
</button>
<br>

<div class:visible class="help-text">
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

<input class="pattern-input" type="text" bind:value={pattern}/>
<button on:click={regenNames}>
	Refresh
</button>
<label for="number_to_generate">Number to generate<input type="number" bind:value={numberToGenerate}
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
			<button on:click={() => setPattern(example.pattern)} title={example.pattern}>{example.title}</button>
		</div>
	{/each}
</div>
<style>
	.pattern-input {
		width: 100%;
	}

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
		grid-template-columns: repeat(4, 1fr);
	}

	.name-list .item {
		word-wrap: break-word;
	}

	.examples {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-content: stretch;
		align-items: flex-start;
	}

	.example-item {
		margin: 0 0.5rem;
	}
</style>