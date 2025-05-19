<script>
	import { rules } from './ruleRegistry.js';
	import { settingsStore } from './stores/settingsStore.js';
	import { onMount } from 'svelte';

	// Props - kept for backward compatibility
	let { drawerOpen, toggleDrawer } = $props();

	// Local state that will be synced with the store
	let sidebarOpen = $state(drawerOpen);

	// Initialise and sync with the settings store
	onMount(() => {
		// Get initial value from the settings store
		sidebarOpen = settingsStore.getSetting('sidebarOpen', drawerOpen);

		// Subscribe to the store to keep the local state in sync
		return settingsStore.subscribe((settings) => {
			if (settings.sidebarOpen !== undefined) {
				sidebarOpen = settings.sidebarOpen;
				// Update the prop for backward compatibility
				drawerOpen = sidebarOpen;
			}
		});
	});

	// Local toggle function that updates the store
	function handleToggle() {
		sidebarOpen = !sidebarOpen;
		settingsStore.setSetting('sidebarOpen', sidebarOpen);
		// Call the provided toggle function for backward compatibility
		toggleDrawer();
	}

	// Get rules with their syntax and descriptions
	const rulesList = rules.map((rule) => {
		const ruleType = rule.getType().toLowerCase();
		const syntax = rule.getTokenSyntax();
		const description = rule.getSummary ? rule.getSummary() : '';

		return {
			type: ruleType,
			syntax,
			description
		};
	});
</script>

<!-- Pattern Rules Sidebar - fixed width of 300px -->
<div
	class={`sidebar-container bg-base-100 fixed top-0 right-0 bottom-0 z-50 w-[300px] transform shadow-xl transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
>
	<div class="h-full overflow-y-auto p-4 pt-16">
		<!-- Added pt-16 to account for the header -->
		<div class="mb-4 flex items-center justify-between">
			<h3 class="text-xl font-bold">Pattern Rules</h3>
			<button
				class="btn btn-sm btn-circle btn-ghost"
				onclick={handleToggle}
				aria-label="Close pattern rules sidebar"
				title="Close pattern rules sidebar"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<ul class="list-disc space-y-2 pl-5">
			{#each rulesList as rule (rule.type)}
				<li>
					<code class="rounded px-1">{rule.syntax}</code> - {@html rule.description}
				</li>
			{/each}
		</ul>
	</div>
</div>

<!-- Floating toggle button -->
<button
	class={`btn btn-circle btn-toggle-sidebar bg-accent text-base-content fixed right-0 bottom-16 z-40 h-10 w-8 transform rounded-l-lg shadow-lg transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-[-300px]' : ''}`}
	onclick={handleToggle}
	aria-label={sidebarOpen ? 'Close pattern rules sidebar' : 'Open pattern rules sidebar'}
	aria-expanded={sidebarOpen}
	title={sidebarOpen ? 'Close pattern rules sidebar' : 'Open pattern rules sidebar'}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		viewBox="0 0 24 24"
		class={`h-6 w-6 transform transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`}
	>
		<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
	</svg>
</button>

<style>
	@import 'tailwindcss';
	@import '../colours.css';

	.sidebar-container {
		&:before {
			content: '';
			background-color: var(--bg-accent);
			width: 2px;
			height: 100%;
			position: absolute;
		}
	}
</style>
