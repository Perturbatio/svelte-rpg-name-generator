<script>
	export let pattern;

	let space = ' ' // hack to prevent IDE auto-trimming spaces inside template strings
	let examples = [
		// {title: 'depth test', pattern: 'fl(c|(vv|(c|v)))'},
		// {title: 'sub test', pattern: '"test"(c|v)'},
		{title: 'Simple name', pattern: 'cvS'},
		{title: 'Simple names', pattern: 'ysv (f|y)sv'},
		{title: 'Optional strings', pattern: '("Illy"|"Al")Vcv'},
		{title: 'Alternating values', pattern: 'cvS(v|"")("ni"|"ane"|"nia"|"ellia")(c|"")'},
		{title: 'Elf Female', pattern: 'fl'},
		{title: 'Exotic', pattern: 'fc h\'Vl'},
		{title: 'Exotic 2', pattern: 'fc hw\'Vl'},
		{title: 'Exotic 3', pattern: 'a|fc hw\'Vl'},
		{title: 'Exotic 4', pattern: 'cvw hw\'("s"|"m"|"h"|"j")vS'},
		{
			title: 'Dwarven',
			pattern: `(c|"")vs(
"dorth"|"grim"|"grid"|"grith"|"kili"|"ven"|"vald"|"var"|"vard"|"wold"
)
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
		},
		{
			title: 'Nordic Female',
			pattern: `(
	"Ald"|"Asf"|"As"|"Ast"|
	"Be"|"Berg"|"Brin"|"Dag"|"Dal"|
	"Ed"|"El"|"Eld"|"Eil"|"Er"|"Eyd"|"Fre"|"Fri"|"Est"|
	"Gei"|"Ger"|"Grim"|"Gud"|"Gund"|"Gunn"|"Hal"|"Hall"|"Hel"|
	"Hild"|"Hol"|"In"|"Ingi"|"Ing"|"Lif"|"Lin"|"Kel"|
	"Rag"|"Ru"|"Brun"|"Sal"|"Sig"|"Sol"|"Thor"|"Ulf"|"Una"|
	"Un"|"Val"|"Vig"|"Wal"
)(
	"is"|"rif"|"rid"|"ny"|"rith"|"ra"|"dis"|"hild"|"mar"|
	"la"|"na"|"if"|"da"|"rild"|"her"|"run"|"ra"|"dora"|
	"ga"|"ma"|"a"|"veig"|"leif"
)`
		},
		{
			title: 'Reptilian names',
			pattern: `(s|S|"")w
("ss"|"sss"|"sh"|"ssh"|"sna"|"sne"|"sse"|"nass"|"fas"|"shafa")
(""|""|""|"ha"|"saros"|"sauros"|"lass"|"asa"|"azha")
`
		}
	]

	function switchPattern(newPattern) {
		pattern = newPattern
		document.body.blur()
	}

</script>

<h2>
	Examples
</h2>
<ul class="examples" data-testid="example-list">
	{#each examples as example, index}
		<li class="item" class:active={pattern === example.pattern}>
			<button on:click={() => switchPattern(example.pattern)} title={example.title}
					data-testid={`example-item-${index}`}>{example.title}</button>
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

	html body ul.examples li.item.active button {
		border: #3378b5 1px solid;
		border-radius: 0;
		outline: #4944b5 1px solid;
	}

	html body.dark-mode ul.examples li.item.active button {
		border: #81b548 1px solid;
		border-radius: 0;
		outline: #b5a900 1px solid;
	}

</style>