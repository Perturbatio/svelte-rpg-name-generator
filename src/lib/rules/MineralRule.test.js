import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { MineralRule } from './MineralRule.js';

describe('MineralRule', () => {
	let rule;

	beforeEach(() => {
		rule = new MineralRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.5);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for the correct token pattern', () => {
			expect(
				rule.canHandle('M', {
					index: 0,
					pattern: 'Mnl'
				})
			).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(
				rule.canHandle('x', {
					index: 0,
					pattern: 'xMnl'
				})
			).toBe(false);
			expect(
				rule.canHandle('y', {
					index: 0,
					pattern: 'yMnl'
				})
			).toBe(false);
			expect(
				rule.canHandle('z', {
					index: 0,
					pattern: 'zMnl'
				})
			).toBe(false);
		});
	});

	describe('parse', () => {
		it('should parse the token correctly', () => {
			const state = {
				index: 0,
				pattern: 'Mnl'
			};

			const result = rule.parse(state);

			// Example:
			// expect(state.index).toBe(1);
			expect(result).toEqual({
				type: 'mineral'
			});
		});
	});

	describe('toString', () => {
		it('should return a string representation', () => {
			const node = {
				type: 'mineral'
			};

			expect(rule.toString(node)).toBe('Mineral');
		});
	});

	describe('process', () => {
		it('should process the node correctly', () => {
			const node = {
				type: 'mineral'
			};
			const processor = {};
			const result = rule.process(node, processor);
			expect(result).toBe('slate');
		});
	});
});
