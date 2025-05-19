<script>
	import { astProcessor } from '$lib/ruleRegistry.js';

	// Props
	let { ast, count = 12 } = $props();

	// State
	let processor = $state(astProcessor);

	// Generate multiple names
	/**
	 * @param {Object} ast - The AST to process.
	 * @param {number} count - The number of names to generate.
	 * @returns {string[]} - An array of generated names.
	 *
	 */
	function generateNames(ast, count) {
		if (!ast) return [];

		const names = [];
		for (let i = 0; i < count; i++) {
			const name = processor.process(ast);
			// Capitalize each word in the name
			const formattedName = name
				.split(' ')
				.map((word) => (word !== '' ? word.slice(0, 1)?.toUpperCase() + word.slice(1) : ''))
				.join(' ');
			names.push(formattedName);
		}
		return names;
	}

	let characterNames = $derived(generateNames(ast, count));
</script>

<div class="character-names-container">
	<div class="character-names-grid">
		{#each characterNames as name, index (index)}
			<div class="character-name-card">
				<span class="name">{name}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	@import 'tailwindcss';
	.character-names-container {
		@apply mt-2;
	}

	.character-names-grid {
		@apply mt-4 grid grid-cols-1 gap-4;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}

	.character-name-card {
		@apply rounded-lg px-2 py-1;
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
		border: 1px solid var(--bg-accent-100);
		text-align: center;
		font-weight: bold;
		font-family:
			'Segoe UI', BlinkMacSystemFont, Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
			sans-serif;
		transition:
			background-color 0.3s,
			color 0.3s,
			box-shadow 0.3s,
			transform 0.2s ease;
		@apply break-words;

		/* Hover effects for both light and dark modes */
		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
			background-color: var(--bg-accent-100);
			.name {
				color: var(--text-on-accent);
			}
		}
	}

	/* Adjust shadow for dark mode */
	:global([data-theme='dark']) .character-name-card {
		box-shadow: 0 1px 3px rgba(255, 255, 255, 0.1);
	}

	:global([data-theme='dark']) .character-name-card:hover {
		box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
	}
</style>
