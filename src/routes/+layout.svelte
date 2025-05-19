<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import DiceLogo from '$lib/DiceLogo.svelte';
	import GitHubIcon from '$lib/GitHubIcon.svelte';
	import { settingsStore } from '$lib/stores/settingsStore.js';

	let { children } = $props();
	let currentTheme = $state('dark'); // Default for SSR
	let sidebarOpen = $state(false); // Track sidebar state

	// Toggle theme function
	function toggleTheme() {
		// Only run in browser environment
		if (typeof document === 'undefined') return;

		const html = document.querySelector('html');
		if (!html) return;
		currentTheme = currentTheme === 'light' ? 'dark' : 'light';
		html.setAttribute('data-theme', currentTheme);

		// Save theme preference to settings store
		settingsStore.setSetting('theme', currentTheme);
	}

	// Initialise theme on mount (client-side only)
	onMount(() => {
		// This code only runs in the browser, not during SSR or static rendering

		// Check if the user has a saved preference in the settings store
		const savedTheme = settingsStore.getSetting('theme', null);

		if (!savedTheme) {
			// If no saved preference, check system preference
			const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			currentTheme = prefersDarkMode ? 'dark' : 'light';
		} else {
			// Use saved preference if available
			currentTheme = savedTheme;
		}

		// Apply the theme
		document.querySelector('html')?.setAttribute('data-theme', currentTheme);

		// Listen for system preference changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			// Only update if user hasn't set a preference
			if (!settingsStore.getSetting('theme', null)) {
				currentTheme = e.matches ? 'dark' : 'light';
				document.querySelector('html')?.setAttribute('data-theme', currentTheme);
			}
		});

		// Subscribe to sidebar state changes
		return settingsStore.subscribe((settings) => {
			if (settings.sidebarOpen !== undefined) {
				sidebarOpen = settings.sidebarOpen;
			}
			if (settings.theme !== undefined) {
				currentTheme = settings.theme;
				document.querySelector('html')?.setAttribute('data-theme', currentTheme);
			}
		});
	});
</script>

<div class="flex min-h-screen flex-col">
	<!-- Theme toggle button fixed in top right corner that slides with sidebar -->
	<button
		class={`btn btn-ghost btn-circle fixed top-4 right-4 z-[100] shadow-md transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-[-300px]' : ''}`}
		onclick={toggleTheme}
		aria-label={currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
		aria-checked={currentTheme === 'dark'}
		title={currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
		role="switch"
	>
		{#if currentTheme === 'dark'}
			<!-- Sun icon for dark mode (switch to light) -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
				/>
			</svg>
		{:else}
			<!-- Moon icon for light mode (switch to dark) -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
				/>
			</svg>
		{/if}
	</button>
	<header class="navbar bg-base-300">
		<div class="navbar-start">
			<div class="flex items-center">
				<div class="ml-3"><DiceLogo size={36} /></div>
				<h1 class="mt-4 mb-6 ml-3 text-3xl font-bold">
					<a href="/" class="btn btn-ghost text-xl">RPG Character Name Generator</a>
				</h1>
			</div>
		</div>
		<div class="navbar-end"></div>
	</header>

	<main class="flex-grow p-4">
		{@render children()}
	</main>

	<footer class="footer footer-center bg-base-300 text-base-content p-4">
		<div class="flex flex-col items-center gap-2">
			<p>Copyright &copy; 2025 - RPG Character Name Generator</p>
			<div class="flex items-center gap-2">
				<span>View source on</span>
				<GitHubIcon size={32} />
			</div>
			<div class="flex items-center gap-2">
				<div>
					<a
						href="https://rpg-name-generator.perturbatio.com/v1"
						class="link link-primary hover:link- text-sm"
					>
						Looking for v1?
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>
