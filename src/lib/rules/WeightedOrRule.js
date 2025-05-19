/**
 * Rule for handling weighted OR statements with the syntax {<number>:<ruleToken>|<number>:<ruleToken>}
 */
import { BaseRule } from './BaseRule.js';

export class WeightedOrRule extends BaseRule {
	/**
	 * Token that this rule handles
	 * @type {string}
	 * @private
	 */
	_token = '{';

	/**
	 * Example of the token syntax
	 * @returns {string}
	 */
	getTokenExample() {
		return '{10:(v|V)|90:(c|C)}';
	}

	getType() {
		return 'WeightedOr';
	}

	/**
	 * Syntax of the token
	 * @returns {string}
	 */
	getTokenSyntax() {
		return '{<number>:<rule>|<number>:<rule>}';
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
	 * Parse the weighted OR statement and update the parser state
	 * @param {object} state - The parser state
	 * @param {function} parseExpression - Function to parse expressions
	 * @param {Array} nodes - Nodes parsed so far in the current expression
	 * @returns {object} - The AST node for this rule
	 */
	parse(state, parseExpression, nodes) {
		// a weighted or expects an expression of the form {number:ruleToken|number:ruleToken}
		// a ruleToken can be any rule, including nested rules, so could be a nested OR rule
		// e.g. {50:(c|C)|50:(v|V)} or cv{20:(c|C)|80:(v|V)}vcvcv{50:(c|C)|50:(v|V)}

		// Skip opening brace
		state.index++;

		// get the weight for the left side first
		let leftWeight = '';
		while (state.index < state.pattern.length && state.pattern[state.index] !== ':') {
			leftWeight += state.pattern[state.index];
			state.index++;
		}

		// Skip the colon
		state.index++;

		// we need to find the tokens for the left side, which is all tokens until we hit the pipe
		// however, there could be nested rules which also contain pipes
		const pipePosition = this._findNonNestedPipe(state.pattern, state.index);
		if (pipePosition === -1) {
			throw new Error("Invalid syntax: Expected '|' to separate left and right sides");
		}

		const leftNode = parseExpression({
			index: 0,
			pattern: state.pattern.slice(state.index, pipePosition)
		});

		state.index = pipePosition + 1;

		// get the weight for the right side
		let rightWeight = '';
		while (state.index < state.pattern.length && state.pattern[state.index] !== ':') {
			rightWeight += state.pattern[state.index];
			state.index++;
		}
		// if the total weight is not 100, throw an error
		if (parseInt(leftWeight) + parseInt(rightWeight) !== 100) {
			throw new Error('Invalid syntax: The weights must sum to 100');
		}

		// Skip the colon
		state.index++;

		// find the position of the closing brace
		// the closing brace for this rule may not be the final character in the string,
		// and it may not be the last closing brace in the string (there could be later rules)
		const closingBracePosition = this._findMatchingClosingBrace(state.pattern, state.index);

		if (closingBracePosition === -1) {
			throw new Error("Invalid syntax: Expected '}' to close the weighted OR statement");
		}

		// get the right side nodes
		const rightNode = parseExpression({
			index: 0,
			pattern: state.pattern.slice(state.index, closingBracePosition)
		});
		// skip the closing brace
		state.index = closingBracePosition + 1;

		// Create a placeholder node
		return {
			type: 'weightedOr',
			left: leftNode,
			right: rightNode,
			leftWeight: leftWeight,
			rightWeight: rightWeight
		};
	}

	/**
	 * Convert the weighted OR node to a string representation
	 * @param {object} node - The AST node
	 * @param {function} nodeToString - Function to convert a node to string
	 * @returns {string} - A string representation of the node
	 */
	toString(node, nodeToString) {
		return `WeightedOr(${node.leftWeight}%:${nodeToString(node.left)}, ${node.rightWeight}%:${nodeToString(node.right)})`;
	}

	/**
	 * Process a weighted OR node and generate a string result
	 * @param {object} node - The AST node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	process(node, processor) {
		// Generate a random number between 0 and 100
		const randomNumber = Math.random() * 100;
		// Determine which side to choose based on the weights
		const totalWeight = parseInt(node.leftWeight) + parseInt(node.rightWeight);
		const leftWeight = (parseInt(node.leftWeight) / totalWeight) * 100;
		const choice = randomNumber < leftWeight ? node.left : node.right;

		// Process the chosen side
		return processor.process(choice);
	}

	/**
	 * Get a description of this rule for tooltip display in the AST
	 * @returns {string} - A description of what this rule does
	 */
	getDescription() {
		return (
			'Represents a weighted choice between two patterns using the syntax ' +
			'{number:pattern|number:pattern}. When processed, one of the patterns ' +
			'will be selected based on the specified weights, which must sum to 100.'
		);
	}

	getSummary() {
		return 'Represents a weighted choice between two patterns.';
	}

	/**
	 * Find the position of a pipe character that is not nested inside parentheses or curly braces
	 * @param {string} str - The string to search in
	 * @param {number} startIndex - The index to start searching from (optional, defaults to 0)
	 * @returns {number} - The position of the first non-nested pipe, or -1 if not found
	 */
	_findNonNestedPipe(str, startIndex = 0) {
		let parenCount = 0; // Count of open parentheses
		let braceCount = 0; // Count of open curly braces

		for (let i = startIndex; i < str.length; i++) {
			const char = str[i];

			// Track opening and closing of parentheses
			if (char === '(') {
				parenCount++;
			} else if (char === ')') {
				parenCount = Math.max(0, parenCount - 1); // Prevent negative count
			}

			// Track opening and closing of curly braces
			if (char === '{') {
				braceCount++;
			} else if (char === '}') {
				braceCount = Math.max(0, braceCount - 1); // Prevent negative count
			}

			// If we find a pipe and we're not inside any brackets, return its position
			if (char === '|' && parenCount === 0 && braceCount === 0) {
				return i;
			}
		}

		// No non-nested pipe found
		return -1;
	}

	/**
	 * Find the position of the closing brace that matches the current rule
	 * @param {string} str - The string to search in
	 * @param {number} startIndex - The index to start searching from
	 * @returns {number} - The position of the matching closing brace, or -1 if not found
	 */
	_findMatchingClosingBrace(str, startIndex) {
		/**
		 * This function can be used to find the position of the closing brace for the weighted OR rule.
		 * It works by keeping track of the nesting level of braces.
		 * When we encounter an opening brace, we increment the counter, and when we encounter a closing brace,
		 * we decrement it. When the counter reaches zero, we've found the matching closing brace for our rule.
		 */
		let braceCount = 1; // Start with 1 because we've already encountered the opening brace

		for (let i = startIndex; i < str.length; i++) {
			const char = str[i];

			// Track opening and closing of curly braces
			if (char === '{') {
				braceCount++;
			} else if (char === '}') {
				braceCount--;

				// When braceCount reaches 0, we've found the matching closing brace
				if (braceCount === 0) {
					return i;
				}
			}
		}

		// No matching closing brace found
		return -1;
	}
}
