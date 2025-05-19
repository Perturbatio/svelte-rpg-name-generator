<script>
	import { run } from 'svelte/legacy';

	import { parsePattern } from '$lib/patternParser';
	import AstTreeView from '$lib/AstTreeView.svelte';
	import CharacterName from '$lib/CharacterName.svelte';
	import PatternRulesSidebar from '$lib/PatternRulesSidebar.svelte';
	import FolderIcon from '$lib/FolderIcon.svelte';
	import CollectionManagementModal from '$lib/CollectionManagementModal.svelte';
	import { onMount } from 'svelte';
	import { settingsStore } from '$lib/stores/settingsStore';
	// import CopyButton from '$lib/CopyButton.svelte';
	import CopyIcon from '$lib/CopyIcon.svelte';
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';
	import SaveIcon from '$lib/SaveIcon.svelte';
	import CollectionSaveModal from '$lib/CollectionSaveModal.svelte';

	// State for the pattern input
	let pattern = $state('');
	let patternUrlInput = $state();
	// State for the notification
	let notification = $state('');
	/**
	 * @type {ReturnType<typeof parsePattern> | null}
	 */
	let ast = $state(null);
	/**
	 * @type {string | null}
	 */
	let error = $state(null);
	let nameCount = $state(12); // Default number of names to generate

	// State for the drawer and AST visibility
	let drawerOpen = $state(false);
	let astVisible = $state(false); // State to track AST visibility

	// State for the collection save modal
	let collectionSaveModalOpen = $state(false);
	let collectionManagerModalOpen = $state(false);
	let patternURI = $state('');

	// Load settings from the store on mount
	onMount(() => {
		// Get settings from the store
		// (([aei]s)|[yljws])vSwc
		pattern =
			new URLSearchParams(window.location.search).get('pattern') ||
			settingsStore.getSetting('pattern', 'c(a|v)C(a|v)');
		settingsStore.setSetting('pattern', pattern);
		nameCount = settingsStore.getSetting('nameCount', 12);
		astVisible = settingsStore.getSetting('astVisible', false);
		drawerOpen = settingsStore.getSetting('sidebarOpen', true);

		// Subscribe to the store to keep local state in sync
		const unsubscribe = settingsStore.subscribe((settings) => {
			pattern = settings.pattern;
			nameCount = settings.nameCount;
			astVisible = settings.astVisible;
		});

		// Clean up subscription on component unmount
		return unsubscribe;
	});

	// Function to toggle the drawer
	function toggleDrawer() {
		drawerOpen = !drawerOpen;
	}

	// Function to toggle AST visibility
	function toggleAstVisibility() {
		astVisible = !astVisible;
		settingsStore.setSetting('astVisible', astVisible);
	}

	// Function to copy pattern to clipboard
	function copyPatternToClipboard() {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard
				.writeText(pattern)
				.then(() => {
					// Could add a toast notification here
					console.log('Pattern copied to clipboard');
				})
				.catch((err) => {
					console.error('Failed to copy pattern: ', err);
				});
		}
	}

	// Function to open the collection save modal
	function savePatternToCollection() {
		if (!pattern.trim()) {
			console.error('Cannot save empty pattern');
			return;
		}

		// Open the modal
		collectionSaveModalOpen = true;
	}

	function openCollectionManager() {
		// Open the collection management modal
		collectionManagerModalOpen = true;
	}

	// Function to handle saving pattern from modal
	/**
	 * @param {Object} params
	 * @param {string} params.categoryName - The name of the category to save the pattern in
	 * @param {string} params.patternName - The name of the pattern
	 */
	function handleSavePattern({ categoryName, patternName }) {
		// Get current collections from settings store
		const collections = settingsStore.getSetting('collections', {});

		// If category doesn't exist, create it
		if (!collections[categoryName]) {
			collections[categoryName] = [];
		}

		// Check if pattern name already exists in this category
		// Handle both new format (objects with name/pattern) and old format (strings)
		const existingPatternIndex = collections[categoryName].findIndex((p) => {
			if (typeof p === 'object' && p.name) {
				return p.name === patternName;
			}
			return false;
		});

		if (existingPatternIndex >= 0) {
			console.log(`Pattern with name "${patternName}" already exists in this category`);
			return;
		}

		// Add pattern to category as an object with name and pattern properties
		collections[categoryName].push({
			name: patternName,
			pattern: pattern
		});

		// Save updated collections back to settings store
		settingsStore.setSetting('collections', collections);

		console.log(`Pattern "${patternName}" saved to collection "${categoryName}":`, pattern);
	}

	/**
	 *
	 * @param {null|string} newPattern
	 */
	function handlePatternChange(newPattern) {
		collectionManagerModalOpen = false;
		// Check if newPattern is null or empty
		if (newPattern === null || newPattern.trim() === '') {
			console.error('No pattern provided');
			return;
		}
		// Update the pattern state with the new pattern
		pattern = newPattern;

		// Close the collection manager modal
		// collectionManagerModalOpen = false;

		// Generate AST for the new pattern
		generateAST();
	}

	// Function to generate AST from pattern
	function generateAST() {
		if (!pattern.trim()) {
			ast = null;
			error = null;
			return;
		}

		try {
			ast = parsePattern(pattern);
			error = null;
		} catch (err) {
			console.error('Error parsing pattern:', err);
			ast = null;
			error = err.message;
		}
	}

	// Reactive statement to generate AST when a pattern changes
	$effect(() => {
		if (pattern != null) {
			generateAST();
		}
	});

	// Reactive statement to save nameCount to the settings store when it changes
	$effect(() => {
		if (nameCount > 0) {
			settingsStore.setSetting('nameCount', nameCount);
		}
	});

	$effect(() => {
		if (pattern != null && typeof window !== 'undefined') {
			patternURI = encodeURI(`${window.location.href}?pattern=${pattern.trim()}`);
			settingsStore.setSetting('pattern', pattern);
		}
	});

	function copyPatternUri() {
		navigator.clipboard
			.writeText(patternUrlInput.value)
			.then(() => {
				notifier.success('Copied!', 1500);
			})
			.catch(() => {
				notifier.warning(
					"Unable to copy to clipboard, this might be caused by your browser's security settings. (you can still copy it manually)",
					2500
				);
			});
	}

	function getThemes() {
		let result = {
			// These are the defaults
			danger: '#bb2124',
			success: '#7a9a74',
			warning: '#f0ad4e',
			info: '#5bc0de',
			default: '#aaa' // relates to simply '.show()'
		};
		// if dark mode is enabled
		if (settingsStore.getSetting('theme', null) === 'dark') {
			result.success = '#ffffff';
		}

		return result;
	}
</script>

<div class="page-container">
	<NotificationDisplay bind:this={notification} themes={getThemes()} />

	<!-- Main layout with flex container -->
	<div class="flex">
		<!-- Main content area that fills available space -->
		<div class="flex-grow transition-all duration-300 ease-in-out" class:pr-[300px]={drawerOpen}>
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body p-6">
					<h2 class="card-title mb-4">Enter Your Pattern</h2>

					<div class="form-control">
						<label for="pattern-input" class="label">
							<span class="label-text">Pattern</span>
						</label>
						<div class="relative">
							<textarea
								id="pattern-input"
								bind:value={pattern}
								class="textarea textarea-bordered h-32 w-full pr-8 font-mono"
								placeholder="Enter your pattern here (e.g. C(a|v)C(a|v))"
							></textarea>
							<div class="absolute top-2 right-2">
								<SaveIcon
									size={20}
									onClick={savePatternToCollection}
									title="Save pattern to collection"
								/>
							</div>
							<div class="absolute right-2 bottom-2">
								<FolderIcon size={20} onClick={openCollectionManager} title="Manage collections" />
							</div>
						</div>
					</div>

					<div class="form-control mt-4">
						<label for="name-count-input" class="label">
							<span class="label-text">Number of names to generate</span>
						</label>
						<input
							id="name-count-input"
							type="number"
							bind:value={nameCount}
							min="1"
							max="10000"
							class="input input-bordered w-1/6 max-w-xs"
						/>
						<button class="btn-primary ml-4 rounded px-4 py-2" onclick={generateAST}>
							Regenerate Name{nameCount > 1 ? 's' : ''}
						</button>
					</div>

					<div class="pattern-url">
						<label class="flex items-center">
							<span class="label-text"> Pattern URL: </span>
							<input type="url" value={patternURI} bind:this={patternUrlInput} />
							<button
								class="btn btn-sm btn-primary bg-base-300 focus:bg-accent-300 hover:bg-accent-300 rounded px-4 py-2"
								onclick={copyPatternUri}
							>
								<CopyIcon size={24} />
							</button>
						</label>
					</div>

					<!-- Character Name Component -->
					<CharacterName {ast} count={nameCount} />

					{#if error}
						<div class="mt-6">
							<h3 class="mb-2 text-lg font-semibold">Error:</h3>
							<div class="bg-error/20 text-error overflow-x-auto rounded-lg p-4 text-sm">
								{error}
							</div>
						</div>
					{:else if ast}
						<div class="mt-6">
							<div
								class="border-accent mb-2 flex cursor-pointer justify-between border-t pt-2"
								tabindex="0"
								onclick={toggleAstVisibility}
								onkeypress={(e) =>
									e.target?.tagName !== 'BUTTON' &&
									['Enter', ' '].includes(e.key) &&
									toggleAstVisibility()}
								role="button"
								aria-label={astVisible ? 'Hide AST' : 'Show AST'}
							>
								<h3 class="text-lg font-semibold">Generated AST:</h3>
								<button
									class="btn btn-sm btn-ghost btn-circle"
									aria-label={astVisible ? 'Hide AST' : 'Show AST'}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-5 w-5 transform transition-transform duration-300"
										class:rotate-180={astVisible}
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
								</button>
							</div>
							{#if astVisible}
								<div class="bg-base-300 overflow-x-auto rounded-lg p-4">
									<AstTreeView node={ast} />
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Pattern Rules Sidebar Component -->
		<PatternRulesSidebar {drawerOpen} {toggleDrawer} />
	</div>

	<!-- Collection Save Modal -->
	<CollectionSaveModal
		isOpen={collectionSaveModalOpen}
		{pattern}
		close={(saved) => {
			if (saved) {
				// Show success notification
				notifier.success('Pattern saved to collection!', 1500);
			}
			collectionSaveModalOpen = false;
		}}
		save={handleSavePattern}
	/>

	<!-- Collection Management Modal -->
	<CollectionManagementModal
		isOpen={collectionManagerModalOpen}
		close={() => (collectionManagerModalOpen = false)}
		changePattern={handlePatternChange}
	/>
</div>

<style>
	:global(.toasts .toast) {
		min-width: 18vw !important;
	}

	:global(.toasts .toast > .content) {
		padding: 1rem 2rem !important;
	}
</style>
