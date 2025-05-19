/**
 * Rule for handling soft syllables with the character 'y'
 */
import { BaseRule } from './BaseRule.js';
import { SoftConsonantRule } from '$lib/rules/SoftConsonantRule.js';
import { VowelRule } from '$lib/rules/VowelRule.js';

export class SoftSyllableRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string
	 */
	_token = 'y';

	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	getType() {
		return 'SoftSyllable';
	}

	/**
	 * Parse the soft syllable and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the 'y' character
		state.index++;

		return {
			type: 'softSyllable'
		};
	}

	/**
	 * Convert the soft syllable node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'SoftSyllable';
	}

	/**
	 * Process a soft syllable node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Define the soft syllables that can be used for this rule
		// use the soft consonant and vowel rules to generate the soft syllables
		let consonant = processor.rules
			.find((rule) => rule instanceof SoftConsonantRule)
			.process({ type: 'vowel' }, processor);
		let vowel = processor.rules
			.find((rule) => rule instanceof VowelRule)
			.process({ type: 'vowel' }, processor);

		return `${consonant}${vowel}`;
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return `Generates a soft-sounding syllable using the '${this._token}' token. Combines a soft consonant with a vowel to create melodic syllables ideal for fantasy names.`;
	}

	getSummary() {
		return `Generates a soft-sounding syllable.`;
	}
}
