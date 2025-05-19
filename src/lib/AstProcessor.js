/**
 * AST Processor
 *
 * This module provides functionality to process an AST and generate
 * a string result according to the pattern rules.
 */

export class AstProcessor {
	/**
	 * Create a new AstProcessor
	 * @param {Array} rules - Optional array of rules to use
	 * @param {Object} ruleTypeMap - Optional map of rule types to rule instances
	 */
	constructor(rules = null, ruleTypeMap = null) {
		// Rules and ruleTypeMap will be injected when needed
		this.rules = rules;
		this.ruleTypeMap = ruleTypeMap;
	}

	/**
	 * Set the rules and ruleTypeMap after construction
	 * @param {Array} rules - Array of rules to use
	 * @param {Object} ruleTypeMap - Map of rule types to rule instances
	 */
	setRules(rules, ruleTypeMap) {
		this.rules = rules;
		this.ruleTypeMap = ruleTypeMap;
		return this;
	}

	/**
	 * Process an AST and generate a string result
	 * @param {object} ast - The AST to process
	 * @returns {string} - The generated string result
	 */
	process(ast) {
		if (!ast) return '';

		// Special case for sequence nodes
		if (ast.type === 'sequence') {
			return this.processSequence(ast, this);
		}

		// Find the rule for this node type
		if (this.ruleTypeMap) {
			const rule = this.ruleTypeMap[ast.type];
			if (rule) {
				// Invoke the process method on the rule
				return rule.process(ast, this);
			}
		}

		// If no rule is found, return an empty string
		return '';
	}

	/**
	 * Process a sequence node
	 * @param {object} node - The sequence node to process
	 * @param {object} processor - The AstProcessor instance
	 * @returns {string} - The generated string result
	 */
	processSequence(node, processor) {
		// Process each node in the sequence and concatenate the results
		return node.nodes.map((n) => processor.process(n)).join('');
	}
}
