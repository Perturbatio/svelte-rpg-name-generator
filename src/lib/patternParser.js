/**
 * Pattern Parser
 *
 * This module provides functionality to parse pattern strings and generate
 * Abstract Syntax Trees (ASTs) according to the pattern rules.
 *
 */

import { rules, ruleTypeMap } from './ruleRegistry.js';
import { NestedRule, OrRule } from './rules/index.js';

/**
 * Parses a pattern string and returns an AST representation
 * @param {string} pattern - The pattern string to parse
 * @returns {object} - The AST representation of the pattern
 */
export function parsePattern(pattern) {
	// Initialize the parser state
	const state = {
		index: 0,
		pattern
	};

	// Parse the pattern and return the AST
	return parseExpression(state);
}

/**
 * Parses an expression from the pattern
 * @param {object} state - The parser state
 * @returns {object} - The AST node for the expression
 */
export function parseExpression(state) {
	const nodes = [];

	while (state.index < state.pattern.length) {
		const char = state.pattern[state.index];

		// Check for end of nested pattern
		if (char === ')') {
			break;
		}

		// Try to find a rule that can handle the current character
		let ruleFound = false;

		// Special case for OrRule which needs the nodes parsed so far
		if (char === '|') {
			const orRule = rules.find((rule) => rule instanceof OrRule);
			if (orRule) {
				return orRule.parse(state, parseExpression, nodes);
			}
		}

		// Try each rule
		for (const rule of rules) {
			if (rule.canHandle(char, state)) {
				// Special case for NestedRule which needs the parseExpression function
				if (rule instanceof NestedRule) {
					nodes.push(rule.parse(state, parseExpression));
				} else {
					nodes.push(rule.parse(state, parseExpression, nodes));
				}
				ruleFound = true;
				break;
			}
		}

		// If no rule was found, treat the character as a string literal
		// Skip whitespace entirely unless it's a single space
		if (!ruleFound) {
			// Skip all whitespace except single spaces
			if (/\s/.test(char)) {
				if (char !== ' ') {
					// Skip non-space whitespace entirely
					state.index++;
					continue;
				} else {
					// For spaces, check if we already have a space as the last node
					// If so, skip this space (collapse multiple spaces)
					const previousNode = nodes[nodes.length - 1];
					if (previousNode && previousNode.type === 'literal' && previousNode.value === ' ') {
						state.index++;
						continue;
					}
				}
			}

			// Treat as string literal
			nodes.push({
				type: 'literal',
				value: char
			});
			state.index++;
		}
	}

	// If we only have one node, return it directly
	if (nodes.length === 1) {
		return nodes[0];
	}

	// Otherwise, return a sequence of nodes
	return {
		type: 'sequence',
		nodes
	};
}

/**
 * Converts an AST to a string representation for debugging
 * @param {object} ast - The AST to convert
 * @returns {string} - A string representation of the AST
 */
export function astToString(ast) {
	if (!ast) return 'null';

	// Special case for sequence nodes
	if (ast.type === 'sequence') {
		return `Sequence(${ast.nodes.map(astToString).join(', ')})`;
	}

	// Find the rule for this node type
	const rule = ruleTypeMap[ast.type];
	if (rule) {
		return rule.toString(ast, astToString);
	}

	// We no longer have 'unknown' node types as they are now treated as literals

	return `Unknown AST node: ${JSON.stringify(ast)}`;
}
