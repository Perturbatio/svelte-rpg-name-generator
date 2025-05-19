<script>
	/**
	 * @typedef {Object} Props
	 * @property {number} [size] - Props for customization - Default size in pixels
	 * @property {any} [onClick] - Default no-op function
	 * @property {string} [title] - Default title
	 */

	/** @type {Props} */
	let { size = 24, onClick = () => {}, title = '' } = $props();
</script>

<button onclick={onClick} class="folder-icon-button" {title} aria-label={title}>
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		class="folder-icon"
		fill="currentColor"
	>
		<path
			d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
		/>
	</svg>
</button>

<style>
	.folder-icon-button {
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

	.folder-icon-button:hover {
		transform: scale(1.1);
		background-color: rgba(0, 0, 0, 0.1);
		svg {
			fill: var(--bg-accent-100);
		}
	}

	.folder-icon-button:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
		svg {
			fill: var(--bg-accent-100);
		}
	}
</style>
