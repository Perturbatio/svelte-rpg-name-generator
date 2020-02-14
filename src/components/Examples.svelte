<script>
	export let pattern;

	let space = ' ' // hack to prevent IDE auto-trimming spaces inside template strings
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
			title: 'Dwarven', pattern: `(c|"")vs("grim"|"vald"|"wold"|"ven"|"grith"|"kili"|"dorth")
${space}
(
"Stone"|"Gold"|"Iron"|"Copper"|
"silver"|"Mountain"|"Hill"|"Fire"|"cold"|
"Golden"|"Storm"|"Wind"
)

(
"Shield"|"Axe"|"Tooth"|"Hammer"|
"Forge"|"Hearth"|"House"|"Helm"|
"Heart"|"shaper"|"biter"|"eater"|
"Fist"|"splitter"|"crusher"|"cleaver"
)`,
		},
	]
</script>

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
.examples {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 2rem;
}

.example-item {
	margin: 0 0.5rem;
}
</style>