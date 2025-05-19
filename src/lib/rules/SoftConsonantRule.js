/**
 * Rule for handling soft consonants with the character 's'
 */
import { BaseRule } from './BaseRule.js';

export class SoftConsonantRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 * */
	_token = 's';
	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	getType() {
		return 'SoftConsonant';
	}

	/**
	 * Parse the soft consonant and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the 's' character
		state.index++;

		return {
			type: 'softConsonant'
		};
	}

	/**
	 * Convert the soft consonant node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'SoftConsonant';
	}

	/**
	 * Process a soft consonant node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Define the soft consonants that can be used for this rule
		const softConsonants = ['f', 'h', 'j', 'l', 'm', 'n', 'r', 's', 'w', 'y'];

		// Randomly select a soft consonant
		const index = Math.floor(Math.random() * softConsonants.length);
		return softConsonants[index];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return `Generates a random soft-sounding consonant using the '${this._token}' token.`;
	}

	getSummary() {
		return `Generates a random soft-sounding consonant.`;
	}
}
