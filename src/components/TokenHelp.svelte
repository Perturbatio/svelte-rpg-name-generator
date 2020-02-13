<script>
	import { slide } from 'svelte/transition'

	export let visible = false
	export let tokens = []

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
</script>

<button on:click={() => visible = !visible}>
	Help
</button>
{#if visible}
	<div class:visible class="help-text" transition:slide="{{delay: 0, duration: 300}}">
		<p>
			Using a combination of the tokens listed below, you can generate a variety of different names (The
			randomness
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
{/if}

<style>
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
</style>