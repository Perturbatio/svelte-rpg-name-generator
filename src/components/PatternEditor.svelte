<script>
	export let pattern
</script>

<label>
	<textarea
			class="pattern-input"
			bind:value={pattern}></textarea>
</label>

<style>

	.pattern-input {
		max-width: 100%;
		min-width: 20rem;
		width: 100%;
	}

</style>