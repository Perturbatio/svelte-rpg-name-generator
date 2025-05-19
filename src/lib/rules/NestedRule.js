/**
 * Rule for handling nested patterns with parentheses ()
 */
import { BaseRule } from './BaseRule.js';

export class NestedRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = '(';

	getTokenExample() {
		return '(vc(w|v)..)';
	}

	getTokenSyntax() {
		return '(...)';
	}

	getType() {
		return 'Nested';
	}

	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	/**
	 * Parse the nested pattern and update the parser state
	 * @param {object} state - The parser state
	 * @param {function} parseExpression - Function to parse expressions
	 * @returns {object} - The AST node for this rule
	 */
	parse(state, parseExpression) {
		// Skip opening parenthesis
		state.index++;

		// Parse the nested expression
		const nestedNode = parseExpression(state);

		// Skip closing parenthesis if present
		if (state.index < state.pattern.length && state.pattern[state.index] === ')') {
			state.index++;
		}

		return {
			type: 'nested',
			value: nestedNode
		};
	}

	/**
	 * Convert the nested node to a string representation
	 * @param {object} node - The AST node
	 * @param {function} nodeToString - Function to convert a node to string
	 * @returns {string} - A string representation of the node
	 */
	toString(node, nodeToString) {
		return `Nested(${nodeToString(node.value)})`;
	}

	/**
	 * Process a nested node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Process the nested expression
		return processor.process(node.value);
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return 'Groups a pattern into a nested expression using parentheses ()';
	}
}
