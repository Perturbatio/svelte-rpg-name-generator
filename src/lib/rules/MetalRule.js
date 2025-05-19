/**
 * Rule for handling metal with the token 'Mtl'
 */
import { BaseRule } from './BaseRule.js';

export class MetalRule extends BaseRule {
	_token = 'Mtl';
	/**
	 * Check if this rule can handle the current character sequence
	 * @param {string} char - The current character
	 * @param {object} state - The parser state
	 * @returns {boolean} - True if this rule can handle the character sequence
	 */
	canHandle(char, state) {
		if (char === this._token[0] && state.index + this._token.length - 1 < state.pattern.length) {
			// Check if the next characters match the token
			return state.pattern.slice(state.index, state.index + this._token.length) === this._token;
		}
		return false;
	}

	getTokenExample() {
		return 'Mtl';
	}

	getType() {
		return 'Metal';
	}

	/**
	 * Parse the metal token and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		state.index += this._token.length;

		return {
			type: 'metal'
		};
	}

	/**
	 * Convert the metal node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'Metal';
	}

	/**
	 * Process a metal node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		const metals = ['gold', 'silver', 'copper', 'iron', 'bronze', 'brass', 'steel'];

		return metals[Math.floor(Math.random() * metals.length)];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return `Handles the ${this._token} token to generate metal elements.`;
	}
}
