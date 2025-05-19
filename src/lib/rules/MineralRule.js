/**
 * Rule for handling mineralRule with the token 'Mnl'
 */
import { BaseRule } from './BaseRule.js';

export class MineralRule extends BaseRule {
	_token = 'Mnl';

	/**
	 * Check if this rule can handle the current character sequence
	 * @param {string} char - The current character
	 * @param {object} state - The parser state
	 * @returns {boolean} - True if this rule can handle the character sequence
	 */
	canHandle(char, state) {
		if (char !== this._token[0] || state.index + this._token.length - 1 >= state.pattern.length) {
			return false;
		}
		// Check if the next characters match the token
		return state.pattern.slice(state.index, state.index + this._token.length) === this._token;
	}

	getTokenExample() {
		return 'Mnl';
	}

	getType() {
		return 'Mineral';
	}

	/**
	 * Parse the mineralRule token and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		state.index += this._token.length;

		return {
			type: 'mineral'
		};
	}

	/**
	 * Convert the mineralRule node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'Mineral';
	}

	/**
	 * Process a mineralRule node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		const minerals = [
			'diamond',
			'obsidian',
			'marble',
			'granite',
			'slate',
			'flint',
			'coal',
			'stone',
			'rock'
		];
		return minerals[Math.floor(Math.random() * minerals.length)];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return "Handles the 'Mnl' token to generate mineralRule elements.";
	}
}
