<script>
	export let enabled = false;

	$: buttonTitle = (enabled)? 'Toggle dark mode off' : 'Toggle dark mode on'

	function toggleDarkMode(){
		enabled = !enabled
		setDarkMode();
	}

	function setDarkMode(){
		window.document.body.classList.toggle( 'dark-mode', enabled )
	}

	setDarkMode();
</script>
<button class="dark-mode-toggle" on:click={toggleDarkMode} class:enabled title={buttonTitle}>
	{#if enabled}[LM]{:else}[DM]{/if}
</button>

<svelte:body class:dark-mode={enabled}/>
<style type="text/css">
	:global(body),
	:global(body input),
	:global(body button:not(-toggle)),
	:global(body select),
	:global(body textarea ) {
		background-color: #fff;
		color: #222;
		transition: background-color, color 1s;
	}
	:global(body.dark-mode),
	:global(body.dark-mode input),
	:global(body.dark-mode button:not(.dark-mode-toggle)),
	:global(body.dark-mode select),
	:global(body.dark-mode textarea ) {
		/* this will apply to <body> */
		background-color: #333;
		color: #eee;
		transition: background-color, color 1s;
	}

	.dark-mode-toggle:not(.enabled) {
		background-color: #333;
		color: #eee;
	}
</style>
