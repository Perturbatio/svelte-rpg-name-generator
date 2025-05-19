/**
 * Rule for handling consonants with the character 'c'
 */
import { BaseRule } from './BaseRule.js';

export class HardConsonantRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = 'h';
	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	getType() {
		return 'HardConsonant';
	}

	/**
	 * Parse the consonant and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the 'c' character
		state.index++;

		return {
			type: 'hardConsonant'
		};
	}

	/**
	 * Convert the node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'HardConsonant';
	}

	/**
	 * Process a hard consonant node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Define the consonants that can be used for this rule

		let values = 'bcdgkpqtxz'.split('');

		return values[Math.floor(Math.random() * values.length)];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return `Generates a random single hard consonant from the set: b, c, d, g, k, p, q, t, x, z.`;
	}

	getSummary() {
		return 'A random single hard consonant.';
	}
}
