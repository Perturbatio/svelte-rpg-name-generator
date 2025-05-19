import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { WeightedOrRule } from './WeightedOrRule.js';
import { parsePattern, parseExpression } from '$lib/patternParser.js';

describe('WeightedOrRule', () => {
	let rule;

	beforeEach(() => {
		rule = new WeightedOrRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.3);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "{"', () => {
			expect(rule.canHandle('{')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('(')).toBe(false);
			expect(rule.canHandle('a')).toBe(false);
			expect(rule.canHandle('|')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should parse a weighted OR statement with nested OR statements', () => {
			let pattern = '{25:("a"|"b")|75:("c"|"d")}';

			// mock the random value to ensure the left side is chosen
			vi.spyOn(Math, 'random').mockReturnValueOnce(0.2);
			// then mock it again to ensure the right side is chosen for the inner OR
			vi.spyOn(Math, 'random').mockReturnValueOnce(0.9);
			// we expect to get "b" from the inner OR

			const ast = parsePattern(pattern);
			expect(ast).toEqual({
				left: {
					type: 'nested',
					value: {
						nodes: [
							{
								type: 'literal',
								value: 'a'
							},
							{
								type: 'literal',
								value: 'b'
							}
						],
						type: 'or'
					}
				},
				leftWeight: '25',
				right: {
					type: 'nested',
					value: {
						nodes: [
							{
								type: 'literal',
								value: 'c'
							},
							{
								type: 'literal',
								value: 'd'
							}
						],
						type: 'or'
					}
				},
				rightWeight: '75',
				type: 'weightedOr'
			});
		});

		it('should parse a weighted OR statement and create a weightedOr node with default weights', () => {
			const state = {
				index: 0,
				pattern: '{50:a|50:b}'
			};

			// Mock left nodes and parseExpression function
			const leftNode = { type: 'accentedVowel' };
			const rightNode = { type: 'literal', value: 'b' };
			/**
			 * @var {WeightedOrRule} rule
			 */
			const result = rule.parse(state, parseExpression, [leftNode]);

			// Verify the index was incremented past the opening brace
			expect(state.index).toBe(11);

			// Verify the result is a weightedOr node with left and right sides and weights
			expect(result).toEqual({
				type: 'weightedOr',
				left: leftNode,
				right: rightNode,
				leftWeight: '50',
				rightWeight: '50'
			});
		});

		it('should create a sequence node for multiple left nodes', () => {
			const state = {
				index: 0,
				pattern: '{50:("left1"|"left2")|50:b}'
			};

			// Mock left nodes and parseExpression function
			const leftNode1 = { type: 'literal', value: 'left1' };
			const leftNode2 = { type: 'literal', value: 'left2' };
			const rightNode = { type: 'unknown', value: 'b' };

			const result = rule.parse(state, parseExpression, [leftNode1, leftNode2]);

			// Verify the result is a weightedOr node with a sequence node for the left side
			expect(result).toEqual({
				left: {
					type: 'nested',
					value: {
						nodes: [
							{
								type: 'literal',
								value: 'left1'
							},
							{
								type: 'literal',
								value: 'left2'
							}
						],
						type: 'or'
					}
				},
				leftWeight: '50',
				right: {
					type: 'literal',
					value: 'b'
				},
				rightWeight: '50',
				type: 'weightedOr'
			});
		});
	});

	describe('toString', () => {
		it('should return a string representation with both sides and weights', () => {
			const leftNode = { type: 'literal', value: 'left' };
			const rightNode = { type: 'literal', value: 'right' };
			const node = {
				type: 'weightedOr',
				left: leftNode,
				right: rightNode,
				leftWeight: 70,
				rightWeight: 30
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

			// Verify the result is a string representation of the weightedOr node
			expect(result).toBe('WeightedOr(70%:Literal("left"), 30%:Literal("right"))');
		});
	});

	describe('process', () => {
		it('should choose the left side when Math.random < 0.5 (current skeleton implementation)', () => {
			const leftNode = { type: 'literal', value: 'left' };
			const rightNode = { type: 'literal', value: 'right' };
			const node = {
				type: 'weightedOr',
				left: leftNode,
				right: rightNode,
				leftWeight: 70,
				rightWeight: 30
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

		it('should choose the right side when Math.random >= 0.5 (current skeleton implementation)', () => {
			const leftNode = { type: 'literal', value: 'left' };
			const rightNode = { type: 'literal', value: 'right' };
			const node = {
				type: 'weightedOr',
				left: leftNode,
				right: rightNode,
				leftWeight: 70,
				rightWeight: 30
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
	});

	describe('getDescription', () => {
		it('should return a description of the rule', () => {
			expect(rule.getDescription()).toBe(
				'Represents a weighted choice between two patterns using the syntax {number:pattern|number:pattern}. When processed, one of the patterns will be selected based on the specified weights, which must sum to 100.'
			);
		});
	});
});
