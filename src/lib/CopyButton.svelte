<script>
	/**
	 * @typedef {Object} Props
	 * @property {number} [size] - Props for customization - Default size in pixels
	 * @property {any} [onClick] - Default no-op function
	 * @property {string} [title] - Default title
	 * @property {string} [classes] - Default classes for additional styling
	 */

	/** @type {Props} */
	let { size = 24, onClick = () => {}, title = 'Copy to clipboard', classes = '' } = $props();
</script>

<button onclick={onClick} class="copy-icon-button {classes}" {title} aria-label={title}>
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		class="copy-icon"
	>
		<path
			fill="currentColor"
			d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
		/>
	</svg>
</button>

<style>
	.copy-icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: inherit;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
		border-radius: 4px;
		transition:
			transform 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
	}

	.copy-icon-button:hover {
		transform: scale(1.1);
		background-color: rgba(0, 0, 0, 0.1);
	}

	.copy-icon-button:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
</style>
