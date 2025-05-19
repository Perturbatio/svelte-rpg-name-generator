<script>
	/**
	 * @typedef {Object} Props
	 * @property {number} [size] - Props for customization - Default size in pixels
	 */

	/** @type {Props} */
	let { size = 40 } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
	class="dice-logo"
>
	<!-- Glow filter -->
	<defs>
		<filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
			<feGaussianBlur stdDeviation="3" result="blur" />
			<feComposite in="SourceGraphic" in2="blur" operator="over" />
		</filter>
	</defs>

	<!-- Dice outline with glow effect -->
	<g filter="url(#glow)">
		<!-- Dice faces with red fill and white outline -->
		<!-- Front face (showing 6) -->
		<polygon
			points="25,35 75,35 75,85 25,85"
			fill="red"
			stroke="white"
			stroke-width="1.5"
			stroke-linejoin="round"
		/>

		<!-- Top face (showing 1) -->
		<polygon
			points="25,35 75,35 90,20 45,20"
			fill="red"
			stroke="white"
			stroke-width="1.5"
			stroke-linejoin="round"
		/>

		<!-- Right face (showing 3) -->
		<polygon
			points="75,35 90,20 90,70 75,85"
			fill="red"
			stroke="white"
			stroke-width="1.5"
			stroke-linejoin="round"
		/>

		<!-- Front face dots (6) -->

		<!-- Top dots -->
		<circle cx="38" cy="46" r="4" fill="white" />
		<circle cx="62" cy="46" r="4" fill="white" />

		<!-- Center dots -->
		<circle cx="38" cy="60" r="4" fill="white" />
		<circle cx="62" cy="60" r="4" fill="white" />

		<!-- Bottom dots -->
		<circle cx="38" cy="74" r="4" fill="white" />
		<circle cx="62" cy="74" r="4" fill="white" />

		<!-- Top face dots (2) -->
		<ellipse cx="45" cy="29" rx="4" ry="2" fill="white" />
		<ellipse cx="70" cy="25" rx="4" ry="2" fill="white" />

		<!-- Right face dots (3) -->
		<ellipse cx="80" cy="39" rx="2.5" ry="3.5" fill="white" />
		<ellipse cx="83" cy="52" rx="2.5" ry="3.5" fill="white" />
		<ellipse cx="86" cy="65" rx="2.5" ry="3.5" fill="white" />
	</g>
</svg>

<style>
	@import 'tailwindcss';
	@keyframes dice-pulse {
		50% {
			opacity: 0.75;
		}
	}

	@layer theme {
		@theme default {
			--animate-dice-pulse: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		}
	}
	.dice-logo {
		/* Add a subtle glow effect with CSS as well */
		filter: drop-shadow(0 0 3px rgba(255, 0, 0, 0.7));
		&:hover {
			@apply motion-safe:animate-(--animate-dice-pulse);
		}
	}

	/* Make the SVG responsive */
	svg {
		display: block;
	}
</style>
