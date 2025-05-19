/**
 * Rule for handling elven female name ends with the token 'EFE'
 */
import { BaseRule } from './BaseRule.js';

export class ElvenFemaleEndRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = 'EFE';
	/**
	 * Check if this rule can handle the current character sequence
	 * @param {string} char - The current character
	 * @param {object} state - The parser state
	 * @returns {boolean} - True if this rule can handle the character sequence
	 */
	canHandle(char, state) {
		return state.pattern.slice(state.index, state.index + this._token.length) === this._token;
	}

	getType() {
		return 'ElvenFemaleEnd';
	}

	/**
	 * Parse the elven female name end token and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the token
		state.index += this._token.length;

		return {
			type: 'elvenFemaleEnd'
		};
	}

	/**
	 * Convert the elven female name end node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'ElvenFemaleEnd';
	}

	/**
	 * Process an elven female name end node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// List of elven female name ends
		const elvenFemaleEnds = [
			'al',
			'adia',
			'alia',
			'aria',
			'ana',
			'ara',
			'arana',
			'arla',
			'arliel',

			'el',
			'ela',
			'ella',
			'ellia',
			'elai',
			'eleor',

			'driel',
			'drial',
			'diel',
			'dial',
			'delle',

			'índel',
			'illia',
			'illieth',

			'la',
			'lla',
			'lai',
			'lar',
			'laria',
			'lia',
			'lieth',
			'liel',

			'mial',

			'neth',

			'thial',
			'thiel',

			'rial',
			'riel',

			'wen',
			'wel'
		];

		// Randomly select one of the elven female name ends
		return elvenFemaleEnds[Math.floor(Math.random() * elvenFemaleEnds.length)];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return "Generates an elven female name ending using the 'EFE' token. Produces elegant, feminine endings typical of elven names.";
	}

	getSummary() {
		return 'Generates an elven female name ending.';
	}
}
