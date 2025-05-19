/**
 * Rule for handling weighted vowels with the character 'w'
 */
import { BaseRule } from './BaseRule.js';

export class WeightedVowelRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = 'w';

	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	getType() {
		return 'WeightedVowel';
	}

	/**
	 * Parse the weighted vowel and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the 'w' character
		state.index++;

		return {
			type: 'weightedVowel'
		};
	}

	/**
	 * Convert the weighted vowel node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'WeightedVowel';
	}

	/**
	 * Process a weighted vowel node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Define the vowels with their weights
		// a = 50%, e = 25%, i = 15%, o = 5%, u = 5%
		const weightedVowels = [
			{ vowel: 'a', weight: 0.5 },
			{ vowel: 'e', weight: 0.25 },
			{ vowel: 'i', weight: 0.15 },
			{ vowel: 'o', weight: 0.05 },
			{ vowel: 'u', weight: 0.05 }
		];

		// Generate a random number between 0 and 1
		const random = Math.random();

		// Select a vowel based on the weighted probability
		let cumulativeWeight = 0;
		for (const { vowel, weight } of weightedVowels) {
			cumulativeWeight += weight;
			if (random < cumulativeWeight) {
				return vowel;
			}
		}

		// Fallback to a random vowel if something goes wrong
		return 'a';
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return "Generates a vowel using weighted probabilities (a=50%, e=25%, i=15%, o=5%, u=5%) with the 'w' token. This creates more natural-sounding names by using vowel frequencies similar to natural languages.";
	}

	getSummary() {
		return 'Generates a vowel using weighted probabilities (a=50%, e=25%, i=15%, o=5%, u=5%).';
	}
}
