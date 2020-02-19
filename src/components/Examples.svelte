<script>
	export let pattern;

	let space = ' ' // hack to prevent IDE auto-trimming spaces inside template strings
	let examples = [
		// {title: 'depth test', pattern: 'fl(c|(vv|(c|v)))'},
		// {title: 'sub test', pattern: '"test"(c|v)'},
		{ title: 'Simple name', pattern: 'cvS' },
		{ title: 'Simple names', pattern: 'ysv (f|y)sv' },
		{ title: 'Alternating string endings', pattern: 'cvSv|c"ni"|"ane"|"nia"|"ellia"' },
		{ title: 'Optional strings', pattern: '"Illy"|"Al"Vcv' },
		{ title: 'Elf Female', pattern: 'fl' },
		{ title: 'Exotic', pattern: 'fc h\'Vl' },
		{ title: 'Exotic 2', pattern: 'fc hw\'Vl' },
		{ title: 'Exotic 3', pattern: 'a|fc hw\'Vl' },
		{
			title: 'Dwarven',
			pattern: `(c|"")vs("grim"|"vald"|"wold"|"ven"|"grith"|"kili"|"dorth")
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
		{
			title: 'Nordic Male',
			pattern: `(
	"aeg"|"ag"|"ag"|"alf"|"arn"|"ar"|"bain"|"bal"|"bard"|"bern"|"brag"|
	"bjar"|"Bir"|"Bar"|"Bjorn"|"Bryn"|
	"brand"|"dag"|"dom"|"dren"|"eg"|"ei"|"eir"|"erl"|"far"|"fast"|
	"folk"|"gal"|"gaut"|"geir"|"jar"|"jarl"|"joalf"|"joar"|"jofur"|
	"leif"|"leik"|"lif"|"lod"|"lom"|"mag"|"mor"|"mun"|"nar"|"ner"|
	"od"|"odd"|"orn"|"ott"|"rein"|"run"|"sax"|"sig"|"skar"|"tor"|"thor"|
	"ulf"|"val"|"van"|"var"
)(
	"an"|"gor"|"goth"|"grin"|"ginn"|"dimarr"|"arr"|"fill"|"wold"|
	"vold"|"wald"|"vald"|"fast"|"rald"|"narr"|"dur"|"mund"|"ward"|
	"vid"|"dan"|"ulf"|"wulf"|"xulf"|"olf"|"nald"|"sten"|"stan"
)`
		}
	]
</script>

<h2>
	Examples
</h2>
<ul class="examples" data-testid="example-list">
	{#each examples as example, index}
		<li class="item">
			<button on:click={() => (pattern = example.pattern)} title={example.pattern} data-testid={`example-item-${index}`}>{example.title}</button>
		</li>
	{/each}
</ul>

<style lang="scss">
.examples {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 0 0 2rem;

	.item {
		margin: 0 0.5rem;
		list-style: none;
	}
}

</style>