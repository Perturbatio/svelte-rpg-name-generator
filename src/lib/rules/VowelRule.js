/**
 * Rule for handling vowels with the character 'v'
 */
import { BaseRule } from './BaseRule.js';

export class VowelRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = 'v';

	constructor() {
		super();
		// Define the vowels that can be used for this rule
		this.vowels = ['a', 'e', 'i', 'o', 'u'];
	}

	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	getType() {
		return 'Vowel';
	}

	/**
	 * Parse the vowel and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the 'v' character
		state.index++;

		return {
			type: 'vowel'
		};
	}

	/**
	 * Convert the vowel node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'Vowel';
	}

	/**
	 * Process a vowel node and generate a random vowel
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - A random vowel
	 */
	process(node, processor) {
		const index = Math.floor(Math.random() * this.vowels.length);
		return this.vowels[index];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return `Generates a random single vowel (${this.vowels.join(', ')})`;
	}
}
