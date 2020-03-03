<script>
	// import {blur} from 'svelte/transition'
	import {blur} from '../transitions/blur'
	export let names;
	function beforeTransition(node){
		node.classList.add('transitioning')
	}
	function afterTransition(node){
		node.classList.remove('transitioning')
	}
</script>
<div class="name-list" data-testid="name-list" aria-live="assertive">
	{#each names as name}
		<div class="item" transition:blur={{
			duration: 500,
			amount: 200,
			onStart: beforeTransition,
			onEnd: afterTransition
		}}>
			{name}
		</div>
	{/each}
</div>
<style type="scss">

	.name-list {
		max-width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		.item {
			word-wrap: break-word;
			padding: 0.25rem 0.5rem;
		}
	}

	@media screen and (min-width: 64em) {
		/* medium or greater */
		.name-list {
			max-width: 100%;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
		}
	}
	// change colour of transitioning items
	:global(.name-list .item.transitioning) {
		color: #ff4921;
	}
</style>
