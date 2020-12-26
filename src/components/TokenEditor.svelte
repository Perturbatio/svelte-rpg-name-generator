<script>
	import PatternEditor from './PatternEditor.svelte'
	let token = '';
	let description = '';
	let pattern = '';
</script>

<div class="token-editor">
	<label>Name: <input type="text" bind:value={token} /></label>
	<label>Description: <input type="text" bind:value={description} /></label>
	<PatternEditor bind:pattern={pattern}/>
</div>

<div>
	{token}: {pattern}
</div>