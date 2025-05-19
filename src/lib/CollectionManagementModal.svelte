<script>
	import Modal from './Modal.svelte';
	import { getCollections, setCollections } from '$lib/stores/settingsStore';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';

	// Props
	let {
		isOpen = false,
		pattern = '',

		// events
		close,
		changePattern,
	} = $props();

	// Local state
	let categoryName = $state('Default');
	let patternName = $state(''); // New state for pattern name
	let errorMessage = $state('');
	let searchTerm = $state('');
	let dropdownOpen = $state(false);

	/**
	 * @type {string[]}
	 */
	let categories = [];
	let collections = $state([]);
	/**
	 * @type {string[]}
	 */
	let filteredCategories = $state([]);

	// Load existing categories when modal opens
	$effect(() => {
		if (isOpen) {
			tick().then(() => {
				loadCategories();
				searchTerm = categoryName;
				dropdownOpen = false;
				patternName = ''; // Reset pattern name when modal opens
			});
		}
	});

	// Filter categories based on search term
	$effect(() => {
		if (searchTerm) {
			filteredCategories = categories.filter((cat) =>
				cat.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredCategories = categories;
		}
	});

	// Load categories from settings store
	function loadCategories() {
		collections = getCollections();
		categories = Object.keys(collections);

		// Set default category if none exists
		if (categories.length === 0) {
			categoryName = 'Default';
		}
	}

	// Select a category from dropdown
	function selectCategory(cat) {
		categoryName = cat;
		searchTerm = cat;
		dropdownOpen = false;
	}

	// Close modal function
	function handleClose() {
		// Reset form state
		categoryName = 'Default';
		searchTerm = '';
		patternName = '';
		errorMessage = '';
		dropdownOpen = false;
		close();
	}
	$effect.pre(() => {

		tick().then(() => {
			loadCategories();
		});
	});
	onMount(() => {
		loadCategories();
	});

	/**
	 *
	 * @param {{pattern:string}} pattern
	 */
	function handleChangePattern(pattern) {
		changePattern(pattern.pattern)
		close();
	}

	function handleDelete(category, index) {
		// Delete the pattern from the collections
		const patterns = collections[category];
		console.log('handleDelete', index, category, patterns);
		if (patterns.length > 0) {
			patterns.splice(index, 1);
			// Update the collections in the store
			collections[category] = patterns;
			// If the category is empty, delete it
			if (patterns.length === 0) {
				delete collections[category];
			}
		}
		// Update the collections in the store
		setCollections(collections);
	}
</script>

<Modal {isOpen} title="Collections" close={handleClose} width="4xl">
	<div class="panels gap-4 p-4">
		<div class="panel">
			<h1 class="mb-2 text-lg font-semibold">Manage Collections</h1>
			{#if Object.keys(collections).length > 0}

				<div class="mb-4">
					<select class="select select-bordered w-full max-w-xs" bind:value={categoryName}>
						{#each Object.entries(collections) as [category, patterns], index (index)}
							<option value={category} selected={category === categoryName} onclick={() => selectCategory(category)}>
								{category}
							</option>
						{/each}
					</select>
				</div>

				<div class="bg-base-200 rounded-lg p-3">
					<h4 class="mb-2 text-2xl font-semibold">Category: {categoryName}</h4>
					<ul class="list-none pl-0 overflow-y-auto max-h-80">
						{#each collections[categoryName] as pattern, index (index)}
							<li title={pattern.pattern} class="grid grid-cols-16 mb-2">
								<span class="bg-base-300 max-h-48 overflow-auto rounded p-2 pt-3 text-xs col-span-10"
									>{typeof pattern === 'object' ? pattern.name : pattern}</span
								>
								<button class="btn-primary ml-2 p-2 col-span-3" onclick={() => handleChangePattern(pattern)}>Use this pattern</button>
								<button class="btn ml-2 p-2 col-span-3 bg-red-800 hover:bg-red-500" onclick="{() => (confirm('Are you sure?')) ? handleDelete(categoryName, index) : false}">Delete</button>
							</li>
						{/each}
					</ul>
				</div>
			{:else}
				<div class="text-muted">No collections available.</div>
			{/if}
		</div>
	</div>
	{#snippet footer()}
		<button
			class="btn btn-ghost hover:bg-base-800 border-base-850 rounded border px-4 py-2"
			onclick={handleClose}>Close</button
		>
	{/snippet}
</Modal>
