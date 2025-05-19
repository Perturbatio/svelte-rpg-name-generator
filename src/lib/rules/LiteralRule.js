/**
 * Rule for handling string literals with double quotes ""
 */
import { BaseRule } from './BaseRule.js';

export class LiteralRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = '"';
	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	getTokenSyntax() {
		return '"..."';
	}

	getTokenExample() {
		return '"hello"';
	}

	getType() {
		return 'Literal';
	}

	/**
	 * Parse the string literal and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Skip opening quote
		state.index++;

		// Parse the string literal
		let literal = '';
		while (state.index < state.pattern.length && state.pattern[state.index] !== this._token) {
			literal += state.pattern[state.index++];
		}

		// Skip closing quote if present
		if (state.index < state.pattern.length && state.pattern[state.index] === this._token) {
			state.index++;
		}

		return {
			type: 'literal',
			value: literal
		};
	}

	/**
	 * Convert the string literal node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return `Literal("${node.value}")`;
	}

	/**
	 * Process a literal node and return its value
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The literal value
	 */
	process(node, processor) {
		return node.value;
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return 'Represents a string literal enclosed in double quotes (""). The exact text inside the quotes will be used in the output.';
	}

	getSummary() {
		return 'Represents a string literal enclosed in double quotes.';
	}
}
