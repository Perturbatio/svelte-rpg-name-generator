<script>
	import {blur} from 'svelte/transition'
	export let names;

</script>
<div class="name-list" data-testid="name-list" aria-live="assertive">
	{#each names as name}
		<div class="item">
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
	// change colour of animating items
	:global(.name-list .item[style^="animation"]) {
		color: #ff4921;
	}
</style>
