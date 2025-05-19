/**
 * Base Rule class that all pattern rules will extend
 * This serves as an interface for all rule implementations
 */
export class BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 */
	_token = '';

	/**
	 * Get the token associated with this rule
	 * @returns {string} - The token for this rule
	 */
	getToken() {
		return this._token;
	}

	getType() {
		return 'BaseRule';
	}

	getTokenExample() {
		return this._token;
	}

	getTokenSyntax() {
		return this._token;
	}

	/**
	 * Parse the pattern and update the parser state
	 * @param {object} state - The parser state
	 * @returns {object} - The AST node for this rule
	 */
	parse(state) {
		throw new Error('Method not implemented');
	}

	/**
	 * Convert the AST node to a string representation
	 * @param {object} node - The AST node
	 * @returns {string} - A string representation of the node
	 */
	toString(node) {
		throw new Error('Method not implemented');
	}

	/**
	 * Check if this rule can handle the current character
	 * @param {string} char - The current character
	 * @returns {boolean} - True if this rule can handle the character
	 */
	canHandle(char) {
		throw new Error('Method not implemented');
	}

	/**
	 * Process an AST node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		throw new Error('Method not implemented');
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		throw new Error("Method 'getDescription' not implemented for ".this.getType());
	}

	getSummary() {
		return this.getDescription();
	}
}
