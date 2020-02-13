<script>
	export let names;
</script>
<div class="name-list">
	{#each names as name}
		<div class="item">
			{name}
		</div>
	{/each}
</div>
<style>

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
</style>