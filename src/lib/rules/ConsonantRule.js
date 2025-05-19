/**
 * Rule for handling consonants with the character 'c'
 */
import { BaseRule } from './BaseRule.js';

export class ConsonantRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = 'c';
	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	getType() {
		return 'Consonant';
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
			type: 'consonant'
		};
	}

	/**
	 * Convert the consonant node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'Consonant';
	}

	/**
	 * Process a consonant node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Define the consonants that can be used for this rule
		const consonants = [
			'b',
			'c',
			'd',
			'f',
			'g',
			'h',
			'j',
			'k',
			'l',
			'm',
			'n',
			'p',
			'q',
			'r',
			's',
			't',
			'v',
			'w',
			'x',
			'y',
			'z'
		];

		// Randomly select a consonant
		const index = Math.floor(Math.random() * consonants.length);
		return consonants[index];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		const consonants = [
			'b',
			'c',
			'd',
			'f',
			'g',
			'h',
			'j',
			'k',
			'l',
			'm',
			'n',
			'p',
			'q',
			'r',
			's',
			't',
			'v',
			'w',
			'x',
			'y',
			'z'
		];
		return `Generates a random single consonant (${consonants.join(', ')})`;
	}

	getSummary() {
		return 'Generates a random single consonant.';
	}
}
