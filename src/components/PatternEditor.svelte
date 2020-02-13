<script>
	export let pattern
</script>

<div>
	<label>
	<textarea
			class="pattern-input"
			bind:value={pattern}></textarea>
	</label>
</div>

<style>
	.pattern-input {
		max-width: 100%;
		min-width: 20rem;
		min-height: 6rem;
		width: 100%;
	}
</style>