/**
 * Rule for handling OR statements with pipe |
 */
import { BaseRule } from './BaseRule.js';

export class OrRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = '|';
	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	getTokenExample() {
		return 's|v|c';
	}

	getTokenSyntax() {
		return 'a|b|...|n';
	}

	getType() {
		return 'Or';
	}
	/**
	 * Parse the OR statement and update the parser state
	 * @param {object} state - The parser state
	 * @param {function} parseExpression - Function to parse expressions
	 * @param {Array} nodes - Nodes parsed so far in the current expression
	 * @returns {object} - The AST node for this rule
	 */
	parse(state, parseExpression, nodes) {
		// Skip pipe character
		state.index++;

		// Parse the right side of the OR statement
		const nextNode = parseExpression(state);
		if (!nextNode) {
			return;
		}

		// if the next node is another OR node, we want to merge it with the current node
		if (nextNode.type === 'or') {
			nodes.push(...nextNode.nodes);
			// } else if (nextNode.type === 'sequence') {
			// 	// If it is, we need to merge all the nodes in the sequence into the current OR node
			// 	nodes.push(...nextNode.nodes);
			// 	nextNode.nodes = nodes;
		} else {
			nodes.push(nextNode);
		}

		// Create the OR node with left and right sides
		return {
			type: 'or',
			nodes
		};
	}

	/**
	 * Convert the OR node to a string representation
	 * @param {object} node - The AST node
	 * @param {function} nodeToString - Function to convert a node to string
	 * @returns {string} - A string representation of the node
	 */
	toString(node, nodeToString) {
		return `Or(${nodeToString(node.left)}, ${nodeToString(node.right)})`;
	}

	/**
	 * Process an OR node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Randomly choose one of the nodes
		const choice = node.nodes[Math.floor(Math.random() * node.nodes.length)];

		// Process the chosen side
		return processor.process(choice);
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return (
			'Represents a choice between two or more patterns using the pipe character (|). ' +
			'When processed, one of the patterns will be randomly selected.  ' +
			"It's a good idea to wrap them in parentheses to avoid confusion with other rules."
		);
	}

	getSummary() {
		return 'Represents a choice between two or more patterns separated by <span class="bg-base-300 rounded px-1">|</span>.';
	}
}
