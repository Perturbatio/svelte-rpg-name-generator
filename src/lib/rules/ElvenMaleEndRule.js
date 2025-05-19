/**
 * Rule for handling elvenMaleEnd with the token 'EME'
 */
import { BaseRule } from './BaseRule.js';
import { astProcessor } from '$lib/ruleRegistry.js';
import { parsePattern } from '$lib/patternParser.js';

export class ElvenMaleEndRule extends BaseRule {
	_token = 'EME';

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

	getType() {
		return 'ElvenMaleEnd';
	}

	/**
	 * Parse the elvenMaleEnd token and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		state.index += this._token.length;

		return {
			type: 'elvenMaleEnd'
		};
	}

	/**
	 * Convert the elvenMaleEnd node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'ElvenMaleEnd';
	}

	/**
	 * Process a elvenMaleEnd node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Create a processor with the rules and ruleTypeMap
		return astProcessor.process(
			parsePattern(
				'((w[nmrl])|(wsw)|([aeio]"th"))|(c[ieo]([rls]|"rn"))|("rond"|"glor"|"ren"|"vil"|"dil"|"ven")'
			)
		);
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return 'Generates a random elven male name ending (WIP).';
	}

	getSummary() {
		return 'Generates a random elven male name ending.';
	}
}
