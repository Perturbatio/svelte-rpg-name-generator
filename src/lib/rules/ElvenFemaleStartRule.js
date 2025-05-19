/**
 * Rule for handling elven female name starts with the token 'EFS'
 */
import { BaseRule } from './BaseRule.js';

export class ElvenFemaleStartRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = 'EFS';
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
		return 'ElvenFemaleStart';
	}

	/**
	 * Parse the elven female name start token and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		// Increment the index to move past the token
		state.index += this._token.length;

		return {
			type: 'elvenFemaleStart'
		};
	}

	/**
	 * Convert the elven female name start node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		return 'ElvenFemaleStart';
	}

	/**
	 * Process an elven female name start node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// List of elven female name starts
		const elvenFemaleStarts = [
			'Afeli',
			'Aglora',
			'Aila',
			'Alia',
			'Alea',
			'Alara',
			'Aleni',
			'Ama',
			'Amea',
			'Amie',
			'Amo',
			'Amuri',
			'Ana',
			'Anda',
			'Ane',
			'Anuri',
			'Anuria',
			'Ara',
			'Are',
			'Ari',
			'Aria',
			'Arie',
			'Asa',
			'Asie',
			'Assa',
			'Assie',
			'Atha',
			'Athe',
			'Athi',
			'Athie',
			'Athia',
			'Atho',
			'Ar',

			'Eda',
			'Ede',
			'Edi',
			'Edo',
			'Edae',
			'Edari',
			'Edera',
			'Edere',
			'Ederi',
			'Edesi',
			'Edesil',
			'Efeli',
			'Elia',
			'Elea',
			'Eleni',
			'Elara',
			'Ela',
			'Ema',
			'Emara',
			'Emari',
			'Emeri',
			'Emera',
			'Emela',
			'Emeli',
			'Ena',
			'Enara',
			'Enari',
			'Eanara',
			'Eanari',
			'Eina',

			'Fala',
			'Faila',
			'Faili',
			'Faeli',
			'Faela',
			'Faera',
			'Faesh',
			'Fahli',
			'Fehli',
			'Fai',
			'Fae',
			'Fea',
			'Feala',
			'Fiela',
			'Faile',

			'Gala',
			'Gale',
			'Gali',
			'Galo',
			'Galae',
			'Galie',
			'Galea',
			'Galeo',
			'Glo',
			'Glorf',
			'Glari',
			'Glora',
			'Glori',
			'Glorea',
			'Glorie',
			'Gwa',
			'Gwe',
			'Gwi',
			'Gwo',
			'Gwena',
			'Gwene',
			'Gweni'
		];

		// Randomly select one of the elven female name starts
		return elvenFemaleStarts[Math.floor(Math.random() * elvenFemaleStarts.length)];
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return "Generates an elven female name start using the 'EFS' token. Produces elegant, feminine name starts typical of elven names.";
	}

	getSummary() {
		return 'Generates an elven female name start.';
	}
}
