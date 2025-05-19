#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Function to prompt the user for input
function prompt(question, defaultAnswer = '') {
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			resolve(answer);
		});
		rl.write(defaultAnswer);
	});
}

// Function to convert to PascalCase
function toPascalCase(str) {
	return str
		.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
		.replace(/^./, (s) => s.toUpperCase());
}

// Function to create a file if it doesn't exist
function createFileIfNotExists(filePath, content) {
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, content);
		console.log(`Created ${filePath}`);
		return true;
	} else {
		console.log(`File ${filePath} already exists. Skipping.`);
		return false;
	}
}

// Template for rule file
function getRuleTemplate(ruleName, token) {
	const ruleNameAstToken = ruleName[0].toLowerCase() + ruleName.slice(1);
	return `/**
 * Rule for handling ${ruleName.toLowerCase()} with the token '${token}'
 */
import { BaseRule } from './BaseRule.js';

export class ${ruleName}Rule extends BaseRule {
	_token = '${token}';
  /**
   * Check if this rule can handle the current character sequence
   * @param {string} char - The current character
   * @param {object} state - The parser state
   * @returns {boolean} - True if this rule can handle the character sequence
   */
  canHandle(char, state) {
		if (char !== this._token[0] || state.index + this._token.length-1 >= state.pattern.length) {
			return false;
		}
		// Check if the next characters match the token
		return state.pattern.slice(state.index, state.index + this._token.length) === this._token;
  }

  /**
   * Parse the ${ruleNameAstToken} token and update the parser state
   * @param {object} state - The parser state
   * @returns {object} - The AST node for this rule
   */
  parse(state) {
    // TODO: Implement parsing logic
    // Example:
    // state.index++;
    
    return {
      type: '${ruleNameAstToken}'
    };
  }

  /**
   * Convert the ${ruleNameAstToken} node to a string representation
   * @param {object} node - The AST node
   * @returns {string} - A string representation of the node
   */
  toString(node) {
    return '${ruleName}';
  }

  /**
   * Process a ${ruleNameAstToken} node and generate a string result
   * @param {object} node - The AST node to process
   * @param {object} processor - The AstProcessor instance
   * @returns {string} - The generated string result
   */
  process(node, processor) {
    // TODO: Implement processing logic
    // Example:
    // const options = ['option1', 'option2', 'option3'];
    // return options[Math.floor(Math.random() * options.length)];
    return '${ruleNameAstToken}';
  }

  /**
   * Get a description of this rule for tooltip display in the AST
   * @returns {string} - A description of what this rule does
   */
  getDescription() {
    return "Handles the '${token}' token to generate ${ruleNameAstToken} elements.";
  }
}
`;
}

// Template for test file
function getTestTemplate(ruleName, token) {
	const ruleNameAstToken = ruleName[0].toLowerCase() + ruleName.slice(1);
	return `import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ${ruleName}Rule } from './${ruleName}Rule.js';

describe('${ruleName}Rule', () => {
  let rule;

  beforeEach(() => {
    rule = new ${ruleName}Rule();
    // Mock Math.random to return predictable values for testing
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('canHandle', () => {
    it('should return true for the correct token pattern', () => {
      // TODO: Update with the correct test for your token
      // Example:
      // expect(rule.canHandle('${token[0]}')).toBe(true);
      expect(rule.canHandle('${token[0]}')).toBe(false);
    });

    it('should return false for other characters', () => {
      expect(rule.canHandle('x')).toBe(false);
      expect(rule.canHandle('y')).toBe(false);
      expect(rule.canHandle('z')).toBe(false);
    });
  });

  describe('parse', () => {
    it('should parse the token correctly', () => {
      // TODO: Update with the correct test for your token
      const state = {
        index: 0,
        pattern: '${token}'
      };

      const result = rule.parse(state);

      // TODO: Update with the expected behavior
      // Example:
      // expect(state.index).toBe(1);
      expect(result).toEqual({
        type: '${ruleNameAstToken}'
      });
    });
  });

  describe('toString', () => {
    it('should return a string representation', () => {
      const node = {
        type: '${ruleNameAstToken}'
      };

      expect(rule.toString(node)).toBe('${ruleName}');
    });
  });

  describe('process', () => {
    it('should process the node correctly', () => {
      const node = {
        type: '${ruleNameAstToken}'
      };
      const processor = {};

      const result = rule.process(node, processor);

      // TODO: Update with the expected behavior
      expect(result).toBe('${ruleNameAstToken}');
    });
  });
});
`;
}

async function main() {
	try {
		console.log('-------------------------------------------------------------');
		console.log('This script will help you create a new rule for the RPG Name Generator.');
		console.log('-------------------------------------------------------------');

		// Get rule name
		const ruleName = await prompt('Enter the name of the rule (e.g., NamesStartingWithBo): ');
		const pascalCaseRuleName = toPascalCase(ruleName);
		// get the first letter from each word in the rule name
		const suggestedToken = ruleName
			.split(/(?=[A-Z])/)
			.map((word) => word[0])
			.join('');
		console.log(`\nThe suggested token for this rule is '${suggestedToken}'.`);

		// Get token
		const token = await prompt(
			'Enter the token this rule should handle (e.g., Bo): ',
			suggestedToken
		);

		// Create directories if they don't exist
		const rulesDir = path.join(process.cwd(), 'src', 'lib', 'rules');
		if (!fs.existsSync(rulesDir)) {
			fs.mkdirSync(rulesDir, { recursive: true });
		}

		// Create rule file
		const ruleFilePath = path.join(rulesDir, `${pascalCaseRuleName}Rule.js`);
		const ruleContent = getRuleTemplate(pascalCaseRuleName, token);
		const ruleCreated = createFileIfNotExists(ruleFilePath, ruleContent);

		// Create test file
		const testFilePath = path.join(rulesDir, `${pascalCaseRuleName}Rule.test.js`);
		const testContent = getTestTemplate(pascalCaseRuleName, token);
		const testCreated = createFileIfNotExists(testFilePath, testContent);

		if (ruleCreated || testCreated) {
			console.log('\nSuccess! The following files have been created:');
			if (ruleCreated) console.log(`- ${ruleFilePath}`);
			if (testCreated) console.log(`- ${testFilePath}`);

			console.log('\nNext steps:');
			console.log('1. Implement the TODOs in the rule file');
			console.log('2. Update the tests to match your implementation');
			console.log('3. Run the tests with: npm test');
		} else {
			console.log('\nNo new files were created. All files already exist.');
		}
	} catch (error) {
		console.error('An error occurred:', error);
	} finally {
		rl.close();
	}
}

main();
