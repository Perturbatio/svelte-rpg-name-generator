/**
 * Rule for handling consonant pairs with the character 'C'
 */
import { BaseRule } from './BaseRule.js';

export class ConsonantPairRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = 'C';
	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	getType() {
		return 'ConsonantPair';
	}

	/**
	 * Parse the consonant pair and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the 'C' character
		state.index++;

		return {
			type: 'consonantPair'
		};
	}

	/**
	 * Convert the consonant pair node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'ConsonantPair';
	}

	/**
	 * Process a consonant pair node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Define the consonant pairs that can be used for this rule
		const consonantPairs = [
			'ch',
			'gh',
			'll',
			'ng',
			'sh',
			'th',
			'ph',
			'wh',
			'ck',
			'st',
			'tr',
			'br',
			'dr',
			'fr',
			'gr',
			'pr'
		];

		// Randomly select a consonant pair
		const index = Math.floor(Math.random() * consonantPairs.length);
		return consonantPairs[index];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return "Generates a random consonant pair (ch, gh, ll, ng, sh, th, ph, wh, ck, st, tr, br, dr, fr, gr, pr) using the 'C' token.";
	}

	getSummary() {
		return 'Generates a random consonant pair.';
	}
}
