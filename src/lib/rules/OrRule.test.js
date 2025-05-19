import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { OrRule } from './OrRule.js';
import { parseExpression } from '$lib/patternParser.js';

describe('OrRule', () => {
	let rule;

	beforeEach(() => {
		rule = new OrRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.3); // This will select the left side
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "|"', () => {
			expect(rule.canHandle('|')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('(')).toBe(false);
			expect(rule.canHandle('a')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	/**
	 * Parsing
	 */
	describe('parse', () => {
		it('should parse the right side and create an OR node with a single left node', () => {
			const state = {
				index: 0,
				pattern: '|abc'
			};

			// Mock left nodes and parseExpression function
			const leftNode = { type: 'literal', value: 'left' };
			const rightNode = { type: 'literal', value: 'right' };
			const parseExpression = vi.fn().mockReturnValue(rightNode);

			const result = rule.parse(state, parseExpression, [leftNode]);

			// Verify parseExpression was called with the state
			expect(parseExpression).toHaveBeenCalledWith(state);

			// Verify the index was incremented past the pipe character
			expect(state.index).toBe(1); // Should have moved past the pipe

			// Verify the result is an OR node with left and right sides
			expect(result).toEqual({
				type: 'or',
				nodes: [leftNode, rightNode]
			});
		});

		it('should parse an or node with multiple pipes', () => {
			const state = {
				index: 0,
				pattern: '"left"|"middle"|"right"'
			};
			const leftNode = { type: 'literal', value: 'left' };
			state.index += leftNode.value.length + 2; // Move past the left node
			const middleNode = { type: 'literal', value: 'middle' };
			const rightNode = { type: 'literal', value: 'right' };

			let result = rule.parse(state, parseExpression, [leftNode]);
			expect(state.index).toBe(23); // Should have moved past the pipe

			// Verify the index was incremented past the pipe character
			expect(state.index).toBe(state.pattern.length); // Should have moved past the pipe
			// Verify the result is an OR node with two nodes after the first call

			// Verify the result is an OR node with three nodes after the second call
			expect(result).toEqual({
				type: 'or',
				nodes: [leftNode, middleNode, rightNode]
			});
		});
	});

	describe('toString', () => {
		it('should return a string representation with both sides', () => {
			const leftNode = { type: 'literal', value: 'left' };
			const rightNode = { type: 'literal', value: 'right' };
			const node = {
				type: 'or',
				left: leftNode,
				right: rightNode
			};

			// Mock nodeToString function
			const nodeToString = vi
				.fn()
				.mockReturnValueOnce('Literal("left")')
				.mockReturnValueOnce('Literal("right")');

			const result = rule.toString(node, nodeToString);

			// Verify nodeToString was called with both nodes
			expect(nodeToString).toHaveBeenCalledWith(leftNode);
			expect(nodeToString).toHaveBeenCalledWith(rightNode);

			// Verify the result is a string representation of the OR node
			expect(result).toBe('Or(Literal("left"), Literal("right"))');
		});
	});

	/**
	 * Processing
	 */
	describe('process', () => {
		it('should choose the left side when Math.random < 0.5', () => {
			const leftNode = { type: 'literal', value: 'left' };
			const rightNode = { type: 'literal', value: 'right' };
			const node = {
				type: 'or',
				nodes: [leftNode, rightNode]
			};

			// Mock processor
			const processor = {
				process: vi.fn().mockReturnValue('processed left')
			};

			// With Math.random mocked to return 0.3, it should select the left side
			const result = rule.process(node, processor);

			// Verify processor.process was called with the left node
			expect(processor.process).toHaveBeenCalledWith(leftNode);

			// Verify the result is the processed left side
			expect(result).toBe('processed left');
		});

		it('should choose the right side when Math.random >= 0.5', () => {
			const leftNode = { type: 'literal', value: 'left' };
			const rightNode = { type: 'literal', value: 'right' };
			const node = {
				type: 'or',
				nodes: [leftNode, rightNode]
			};

			// Mock processor
			const processor = {
				process: vi.fn().mockReturnValue('processed right')
			};

			// Mock Math.random to return 0.7, which should select the right side
			vi.spyOn(Math, 'random').mockReturnValueOnce(0.7);

			const result = rule.process(node, processor);

			// Verify processor.process was called with the right node
			expect(processor.process).toHaveBeenCalledWith(rightNode);

			// Verify the result is the processed right side
			expect(result).toBe('processed right');
		});

		it('handles multiple nodes separated by "|"', () => {
			const firstNode = { type: 'literal', value: 'first' };
			const secondNode = { type: 'literal', value: 'second' };
			const thirdNode = { type: 'literal', value: 'third' };

			const node = {
				type: 'or',
				nodes: [firstNode, secondNode, thirdNode]
			};

			// Mock processor
			const processor = {
				process: vi.fn().mockReturnValue('processed node')
			};

			// Mock Math.random to return 0.3, which should select first node
			vi.spyOn(Math, 'random').mockReturnValueOnce(0.3);
			const result = rule.process(node, processor);
			// Verify processor.process was called with the first node
			expect(processor.process).toHaveBeenCalledWith(firstNode);
			// Verify the result is the processed node
			expect(result).toBe('processed node');
		});
	});
});
