import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NestedRule } from './NestedRule.js';

describe('NestedRule', () => {
	let rule;

	beforeEach(() => {
		rule = new NestedRule();
	});

	describe('canHandle', () => {
		it('should return true for character "("', () => {
			expect(rule.canHandle('(')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle(')')).toBe(false);
			expect(rule.canHandle('a')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should parse a nested expression and return a nested node', () => {
			const state = {
				index: 0,
				pattern: '(abc)'
			};

			// Mock parseExpression function
			const mockNestedNode = { type: 'sequence', nodes: [] };
			const parseExpression = vi.fn().mockReturnValue(mockNestedNode);

			const result = rule.parse(state, parseExpression);

			// Verify parseExpression was called with the state
			expect(parseExpression).toHaveBeenCalledWith(state);

			expect(state.index).toBe(1); // Should have moved past the closing parenthesis

			// Verify the result is a nested node with the mockNestedNode as its value
			expect(result).toEqual({
				type: 'nested',
				value: mockNestedNode
			});
		});

		it('should handle missing closing parenthesis', () => {
			const state = {
				index: 0,
				pattern: '(abc'
			};

			// Mock parseExpression function
			const mockNestedNode = { type: 'sequence', nodes: [] };
			const parseExpression = vi.fn().mockReturnValue(mockNestedNode);

			const result = rule.parse(state, parseExpression);

			expect(state.index).toBe(1); // Should have moved to the end of the string

			// Verify the result is a nested node with the mockNestedNode as its value
			expect(result).toEqual({
				type: 'nested',
				value: mockNestedNode
			});
		});
	});

	describe('toString', () => {
		it('should return a string representation with the nested node', () => {
			const nestedNode = { type: 'sequence', nodes: [] };
			const node = {
				type: 'nested',
				value: nestedNode
			};

			// Mock nodeToString function
			const nodeToString = vi.fn().mockReturnValue('Sequence()');

			const result = rule.toString(node, nodeToString);

			// Verify nodeToString was called with the nested node
			expect(nodeToString).toHaveBeenCalledWith(nestedNode);

			// Verify the result is a string representation of the nested node
			expect(result).toBe('Nested(Sequence())');
		});
	});

	describe('process', () => {
		it('should process the nested node using the processor', () => {
			const nestedNode = { type: 'sequence', nodes: [] };
			const node = {
				type: 'nested',
				value: nestedNode
			};

			// Mock processor
			const processor = {
				process: vi.fn().mockReturnValue('processed result')
			};

			const result = rule.process(node, processor);

			// Verify processor.process was called with the nested node
			expect(processor.process).toHaveBeenCalledWith(nestedNode);

			// Verify the result is the processed result
			expect(result).toBe('processed result');
		});
	});
});
