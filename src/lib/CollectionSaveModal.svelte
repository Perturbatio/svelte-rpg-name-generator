<script>
	import Modal from './Modal.svelte';
	import { getCollections } from '$lib/stores/settingsStore';

	// Props
	let {
		isOpen = false,
		pattern = '',

		// events
		close,
		save
	} = $props();

	// Local state
	let categoryName = '';
	let patternName = $state(''); // New state for pattern name
	let errorMessage = $state('');
	let searchTerm = $state('');
	let dropdownOpen = $state(false);

	/**
	 * @type {string[]}
	 */
	let categories = [];
	/**
	 * @type {string[]}
	 */
	let filteredCategories = $state([]);

	// Load existing categories when modal opens
	$effect(() => {
		if (isOpen) {
			loadCategories();
			searchTerm = categoryName;
			dropdownOpen = false;
			patternName = ''; // Reset pattern name when modal opens
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
		const collections = getCollections();
		categories = Object.keys(collections);

		// Set default category if none exists
		if (categories.length === 0) {
			categoryName = '';
		}
	}

	// Select a category from dropdown
	/**
	 * @param {string} cat - Category name
	 */
	function selectCategory(cat) {
		categoryName = cat;
		searchTerm = cat;
		dropdownOpen = false;
	}

	// Handle input change
	function handleInputChange() {
		categoryName = searchTerm;
		if (!dropdownOpen) {
			dropdownOpen = true;
		}
	}

	// Handle input focus
	function handleInputFocus() {
		dropdownOpen = true;
	}

	// Handle input blur
	function handleInputBlur() {
		// Delay closing dropdown to allow click events to register
		setTimeout(() => {
			dropdownOpen = false;
		}, 200);
	}

	// Close modal function
	function handleClose(saved = false) {
		// Reset form state
		categoryName = '';
		searchTerm = '';
		patternName = '';
		errorMessage = '';
		dropdownOpen = false;
		close(saved);
	}

	// Save pattern function
	function savePattern() {
		if (!pattern.trim()) {
			errorMessage = 'Cannot save empty pattern';
			return;
		}

		if (!categoryName.trim()) {
			errorMessage = 'Category name cannot be empty';
			return;
		}

		if (!patternName.trim()) {
			errorMessage = 'Pattern name cannot be empty';
			return;
		}

		// Check if pattern name is unique in this category
		const collections = getCollections();
		if (collections[categoryName]) {
			// Handle both new format (objects with name/pattern) and old format (strings)
			const existingPattern = collections[categoryName].find((p) => {
				if (typeof p === 'object' && p.name) {
					return p.name === patternName;
				}
				return false;
			});

			if (existingPattern) {
				errorMessage = `A pattern with the name "${patternName}" already exists in this category`;
				if (!confirm('A pattern with this name already exists. Do you want to overwrite it?')) {
					return;
				}
			}
		}

		// Dispatch save event with category name and pattern name
		save({ categoryName, patternName });

		// Close modal
		handleClose(true);
	}
</script>

<Modal {isOpen} title="Collections" close={handleClose} width="4xl">
	<div class="panels gap-4 p-4">
		<div class="panel panel-save-to-collection space-y-4">
			<h1 class="mb-2 text-lg font-semibold">Save Pattern to Collection</h1>
			{#if errorMessage}
				<div class="alert alert-error bg-error text-on-error flex items-center gap-2 p-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{errorMessage}</span>
				</div>
			{/if}

			<!-- Pattern Name Field (New) -->
			<div class="form-control">
				<label for="pattern-name" class="label">
					<span class="label-text">Pattern Name</span>
				</label>
				<input
					id="pattern-name"
					type="text"
					bind:value={patternName}
					class="input input-bordered w-full"
					placeholder="Enter a unique name for this pattern"
					autocomplete="off"
				/>
			</div>

			<div class="form-control relative">
				<label for="category-name" class="label">
					<span class="label-text">Category Name</span>
				</label>
				<input
					id="category-name"
					type="text"
					bind:value={searchTerm}
					oninput={handleInputChange}
					onfocus={handleInputFocus}
					onblur={handleInputBlur}
					class="input input-bordered w-full"
					placeholder="Type to search or create new category"
					autocomplete="off"
				/>

				<!-- Dropdown for categories -->
				{#if dropdownOpen && filteredCategories.length > 0}
					<div
						class="
        	bg-base-100
        	border-base-300
        	absolute
        	top-full
        	right-0
        	left-0
        	z-10
        	mt-1
        	max-h-48
        	overflow-y-auto
        	rounded-md
        	border
        	shadow-lg
				"
					>
						<ul class="py-1">
							{#each filteredCategories as category, index (index)}
								<li
									class="hover:bg-base-200 cursor-pointer px-4 py-2"
									onclick={() => selectCategory(category)}
								>
									{category}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>

			<div class="bg-base-200 rounded-lg p-3">
				<h4 class="mb-2 text-sm font-semibold">Pattern to save:</h4>
				<pre class="bg-base-300 max-h-48 overflow-auto rounded p-2 text-xs">{pattern}</pre>
			</div>
		</div>
	</div>

	{#snippet footer()}
		<button
			class="btn btn-ghost hover:bg-base-800 border-base-850 rounded border px-4 py-2"
			onclick={() => handleClose(false)}>Cancel</button
		>
		<button class="btn btn-primary rounded px-4 py-2" onclick={savePattern}>Save</button>
	{/snippet}
</Modal>
