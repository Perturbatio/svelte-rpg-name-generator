/**
 * Rule for handling accented vowels with the character 'a'
 */
import { BaseRule } from './BaseRule.js';

export class AccentedVowelRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = 'a';
	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	/**
	 * Parse the accented vowel and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the 'a' character
		state.index++;

		return {
			type: 'accentedVowel'
		};
	}

	/**
	 * Convert the accented vowel node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'AccentedVowel';
	}

	getType() {
		return 'AccentedVowel';
	}

	/**
	 * Process an accented vowel node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Define the accented vowels that can be used for this rule
		const accentedVowels = ['á', 'é', 'í', 'ó', 'ú', 'à', 'è', 'ì', 'ò', 'ù'];

		// Randomly select an accented vowel
		const index = Math.floor(Math.random() * accentedVowels.length);
		return accentedVowels[index];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return "Generates a random accented vowel (á, é, í, ó, ú, à, è, ì, ò, ù) using the 'a' token.";
	}

	getSummary() {
		return 'Generates a random accented vowel.';
	}
}
