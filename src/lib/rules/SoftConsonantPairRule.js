/**
 * Rule for handling soft consonant pairs with the character 'S'
 */
import { BaseRule } from './BaseRule.js';

export class SoftConsonantPairRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 **/
	_token = 'S';

	getType() {
		return 'SoftConsonantPair';
	}

	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === 'S';
	}

	/**
	 * Parse the soft consonant pair and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the 'S' character
		state.index++;

		return {
			type: 'softConsonantPair'
		};
	}

	/**
	 * Convert the soft consonant pair node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'SoftConsonantPair';
	}

	/**
	 * Process a soft consonant pair node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Define the soft consonant pairs that can be used for this rule
		const softConsonantPairs = [
			'ch',
			'th',
			'wh',
			'mn',
			'ln',
			'rn',
			'ff',
			'fl',
			'fy',
			'gh',
			'gn',
			'hm',
			'hn',
			'hy',
			'll',
			'ly',
			'lm',
			'ng',
			'ph',
			'sh',
			'ss',
			'yl',
			'yr',
			'zh'
		];

		// Randomly select a soft consonant pair
		const index = Math.floor(Math.random() * softConsonantPairs.length);
		return softConsonantPairs[index];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return "Generates a random soft-sounding consonant pair (ch, th, wh, etc.) using the 'S' token. These pairs create smoother, more melodic sounds in names.";
	}

	getSummary() {
		return 'Generates a random soft consonant pair.';
	}
}
