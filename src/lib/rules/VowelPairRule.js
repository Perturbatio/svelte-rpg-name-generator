/**
 * Rule for handling vowel pairs with the character 'V'
 */
import { BaseRule } from './BaseRule.js';

export class VowelPairRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = 'V';
	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	getType() {
		return 'VowelPair';
	}

	/**
	 * Parse the vowel pair and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the token
		state.index++;

		return {
			type: 'vowelPair'
		};
	}

	/**
	 * Convert the vowel pair node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'VowelPair';
	}

	/**
	 * Process a vowel pair node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Define the vowel pairs that can be used for this rule
		const vowelPairs = ['ai', 'au', 'ei', 'eu', 'ie', 'io', 'ua', 'oi', 'ou'];

		// Randomly select a vowel pair
		const index = Math.floor(Math.random() * vowelPairs.length);
		return vowelPairs[index];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return "Generates a random vowel pair (ai, au, ei, eu, ie, io, ua, oi, ou) using the 'V' token.";
	}
}
