<script>
	let {
		children,
		footer,
		isOpen = false,
		title = '',
		width = 'md', // sm, md, lg, xl
		classes = [],

		// events
		close
	} = $props();

	// // Close modal function
	function closeModal() {
		close();
	}

	// Handle escape key press
	function handleKeydown(event) {
		if (event.key === 'Escape' && isOpen) {
			closeModal();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- Modal backdrop -->
	<div
		class="fixed inset-0 z-40 flex items-center justify-center bg-black/75 p-4 transition-opacity duration-300"
		onclick={(e) => e.target === e.currentTarget && closeModal()}
		onkeydown={(e) => ['Escape'].includes(e.key) && closeModal()}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="0"
	>
		<!-- Modal content -->
		<div
			class="bg-base-100 max-h-[90vh] w-full transform overflow-auto rounded-lg shadow-xl transition-transform duration-300 {classes.join(
				' '
			)}"
			class:max-w-sm={width === 'sm'}
			class:max-w-md={width === 'md'}
			class:max-w-lg={width === 'lg'}
			class:max-w-xl={width === 'xl'}
			class:max-w-2xl={width === '2xl'}
			class:max-w-3xl={width === '3xl'}
			class:max-w-4xl={width === '4xl'}
			class:max-w-5xl={width === '5xl'}
			class:max-w-full={width === 'full'}
		>
			<!-- Modal header -->
			<div class="border-base-300 flex items-center justify-between border-b p-4">
				<h3 id="modal-title" class="text-lg font-semibold">{title}</h3>
				<button
					class="btn btn-sm btn-ghost btn-circle"
					onclick={closeModal}
					aria-label="Close modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Modal body -->
			<div class="p-4">
				{@render children?.()}
			</div>

			<!-- Modal footer -->
			<div class="border-base-300 flex justify-end gap-2 border-t p-4">
				{#if footer}{@render footer()}{:else}
					<button
						class="btn btn-ghost hover:bg-base-800 border-base-850 rounded border px-4 py-2"
						onclick={closeModal}>Cancel</button
					>
				{/if}
			</div>
		</div>
	</div>
{/if}
