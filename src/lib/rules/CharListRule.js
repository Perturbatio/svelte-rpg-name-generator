/**
 * Rule for handling character lists with square brackets []
 */
import { BaseRule } from './BaseRule.js';

export class CharListRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = '[';

	getTokenExample() {
		return '[xyz]';
	}

	getType() {
		return 'CharacterList';
	}

	getTokenSyntax() {
		return '[...]';
	}

	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		return char === this._token;
	}

	/**
	 * Parse the character list and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Skip opening bracket
		state.index++;

		// Parse the character list
		let charList = '';
		while (state.index < state.pattern.length && state.pattern[state.index] !== ']') {
			charList += state.pattern[state.index++];
		}

		// Skip closing bracket if present
		if (state.index < state.pattern.length && state.pattern[state.index] === ']') {
			state.index++;
		}

		return {
			type: 'charList',
			value: charList
		};
	}

	/**
	 * Convert the character list node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return `CharList(${node.value})`;
	}

	/**
	 * Process a character list node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Get the character list
		const charList = node.value;

		// If the list is empty, return an empty string
		if (!charList || charList.length === 0) {
			return '';
		}

		// Randomly select a character from the list
		const index = Math.floor(Math.random() * charList.length);
		return charList[index];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return 'Defines a list of literal characters enclosed in square brackets []. When processed, one character from the list will be randomly selected.';
	}

	getSummary() {
		return 'Generates a random character from a list defined in square brackets.';
	}
}
