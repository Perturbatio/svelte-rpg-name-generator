<script>
	import AstTreeView from './AstTreeView.svelte';
	import { ruleTypeMap } from './ruleRegistry.js';

	// Props
	let { node } = $props();

	// State to track expanded nodes
	let expanded = $state(true);

	// Function to toggle expanded state
	function toggleExpanded() {
		expanded = !expanded;
	}

	// Function to check if a node is an unknown node
	function isUnknownNode(node) {
		return node && (node.type === 'unknown' || node.type === undefined);
	}

	// Function to get tooltip text for unknown nodes
	function getUnknownTooltip(node) {
		if (node.type === 'unknown') {
			return `The character "${node.value}" is not recognized as a valid pattern rule. String literals should be enclosed in double quotes e.g. "z". Check the pattern rules in the sidebar for valid syntax.`;
		} else {
			return `Unknown node type: ${node.type}`;
		}
	}

	// Function to get tooltip text for a node
	function getNodeTooltip(node) {
		if (isUnknownNode(node)) {
			return getUnknownTooltip(node);
		}

		const rule = ruleTypeMap[node.type];
		if (rule && typeof rule.getDescription === 'function') {
			return rule.getDescription();
		}

		return '';
	}

	// Function to get node label based on type
	function getNodeLabel(node) {
		if (!node) return 'null';

		// Special cases that don't have corresponding rules in the registry
		if (node.type === 'sequence') {
			return 'Sequence';
		} else if (node.type === 'unknown') {
			return `Unknown: "${node.value}"`;
		}

		// Try to get the rule from the registry
		const rule = ruleTypeMap[node.type];
		if (rule) {
			// Special case for rules that need to display their values
			if (node.type === 'charList') {
				return `CharList: "${node.value}"`;
			} else if (node.type === 'literal') {
				return `Literal: "${node.value}"`;
			} else if (node.type === 'weightedOr') {
				return `WeightedOr (${node.leftWeight}%|${node.rightWeight}%)`;
			}

			// For other rules, use the rule's name
			return rule.getType();
		}

		// Fallback for unknown node types
		return `Unknown node type: ${node.type}`;
	}

	// Function to check if a node has children
	function hasChildren(node) {
		if (!node) return false;

		switch (node.type) {
			case 'sequence':
				return node.nodes && node.nodes.length > 0;
			case 'nested':
				return !!node.value;
			case 'or':
				return node.nodes.length > 0;
			case 'weightedOr':
				return !!node.left || !!node.right;
			default:
				return false;
		}
	}

	// Function to get node children based on type
	function getNodeChildren(node) {
		if (!node) return [];
		switch (node.type) {
			case 'sequence':
				return node.nodes || [];
			case 'nested':
				return node.value ? [node.value] : [];
			case 'or': {
				/**
				 * @type {Array<{ label: string, node: any }>}
				 */
				const children = [];
				node.nodes.forEach((childNode, index) => {
					children.push({ label: `node[${index}]`, node: childNode });
				});
				return children;
			}
			case 'weightedOr': {
				const children = [];
				if (node.left) children.push({ label: `left (${node.leftWeight}%)`, node: node.left });
				if (node.right) children.push({ label: `right (${node.rightWeight}%)`, node: node.right });
				return children;
			}
			default:
				return [];
		}
	}
</script>

<div class="ast-node">
	<div
		class="node-header hover:bg-base-200 flex cursor-pointer items-center rounded p-1"
		onclick={toggleExpanded}
		onkeypress={(e) => (e.key === 'Enter' || e.key === ' ' ? toggleExpanded() : null)}
		tabindex="0"
		aria-expanded={expanded}
		aria-controls="node-children"
		aria-label={expanded ? 'Collapse Node' : 'Expand Node'}
	>
		{#if hasChildren(node)}
			<span class="expand-icon mr-1 inline-block w-4 text-center">
				{#if expanded}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-4 w-4"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-4 w-4"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				{/if}
			</span>
		{:else}
			<span class="leaf-icon mr-1 inline-block w-4 text-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-4 w-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					/>
				</svg>
			</span>
		{/if}
		<span class="node-label font-mono" title={getNodeTooltip(node)}>{getNodeLabel(node)}</span>
		{#if isUnknownNode(node)}
			<div class="ml-2" title={getUnknownTooltip(node)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="#FFCC00"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="black"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
					/>
				</svg>
			</div>
		{/if}
	</div>

	{#if expanded && hasChildren(node)}
		<div class="node-children border-base-300 ml-6 border-l-2 pl-2">
			{#if ['or', 'weightedOr'].includes(node.type)}
				{#each getNodeChildren(node) as child (child.label)}
					<div class="child-with-label">
						<span class="child-label text-base-content/70 text-xs">{child.label}:</span>
						<AstTreeView node={child.node} />
					</div>
				{/each}
			{:else if node.type === 'sequence'}
				{#each node.nodes as childNode, index (index)}
					<div class="child-with-index">
						<span class="child-index text-base-content/70 text-xs">[{index}]</span>
						<AstTreeView node={childNode} />
					</div>
				{/each}
			{:else if node.type === 'nested'}
				<AstTreeView node={node.value} />
			{/if}
		</div>
	{/if}
</div>

<style>
	@import 'tailwindcss';
	.ast-node {
		margin: 2px 0;
	}

	.node-children {
		margin-top: 2px;
	}

	.child-with-label,
	.child-with-index {
		margin: 2px 0 0 36px;
		position: relative;
	}

	.child-label,
	.child-index {
		position: absolute;
		left: -4px;
		top: 6px;
		transform: translateX(-100%);
		padding-right: 4px;
	}
	.child-label {
		background-color: var(--bg-accent-100);
		color: var(--text-on-accent);
		@apply rounded-sm p-1;
		font-weight: bold;
	}
	/** Hover effect for child labels (not sure about this) **/
	/*.child-with-label {*/
	/*	.child-label {*/
	/*		visibility: hidden;*/
	/*	}*/
	/*	&:hover {*/
	/*		> .child-label {*/
	/*			visibility: visible;*/
	/*		}*/
	/*	}*/
	/*}*/
</style>
