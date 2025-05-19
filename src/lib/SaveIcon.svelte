<script>
	/**
	 * @typedef {Object} Props
	 * @property {number} [size] - Props for customization - Default size in pixels
	 * @property {any} [onClick] - Default no-op function
	 * @property {string} [title] - Default title
	 */

	/** @type {Props} */
	let { size = 24, onClick = () => {}, title = 'Save' } = $props();
</script>

<button onclick={onClick} class="save-icon-button" {title} aria-label={title}>
	<svg
		width={size}
		height={size}
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		class="save-icon"
		fill="currentColor"
	>
		<path
			d="M15.173 2H4c-1.101 0-2 .9-2 2v12c0 1.1.899 2 2 2h12c1.101 0 2-.9 2-2V5.127L15.173 2zM14 8c0 .549-.45 1-1 1H7c-.55 0-1-.451-1-1V3h8v5zm-1-4h-2v4h2V4z"
		/>
	</svg>
</button>

<style>
	.save-icon-button {
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

	.save-icon-button:hover {
		transform: scale(1.1);
		background-color: rgba(0, 0, 0, 0.1);
		svg {
			fill: var(--bg-accent-100);
		}
	}

	.save-icon-button:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
		svg {
			fill: var(--bg-accent-100);
		}
	}
</style>
