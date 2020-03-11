<script>
	export let enabled = false;

	$: buttonTitle = (enabled)? 'Toggle dark mode off' : 'Toggle dark mode on'
	$: window.document.body.classList.toggle( 'dark-mode', enabled );
</script>
<button role="switch" class="dark-mode-toggle" on:click={()=>{enabled = !enabled}} class:enabled title={buttonTitle} data-testid="darkmode-button">
	{#if enabled}[LM]{:else}[DM]{/if}
</button>

<svelte:body class:dark-mode={enabled}/>
<style type="scss" global>
	body,
	body input,
	body button:not(.dark-mode-toggle),
	body select,
	body textarea {
		background-color: #fff;
		color: #222;
		transition: background-color, color 1s;
	}
	body.dark-mode {
		background-color: #222;
		color: #eee;
		transition: background-color, color 1s;
	}
	body.dark-mode {
		input,
		button:not(.dark-mode-toggle),
		select,
		textarea {
			background-color: #222;
			color: #eee;
			transition: background-color, color 1s;
		}
	}
	.dark-mode-toggle:not(.enabled) {
		background-color: #333;
		color: #eee;
	}
</style>
