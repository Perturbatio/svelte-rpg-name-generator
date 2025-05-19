import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { MetalRule } from './MetalRule.js';

describe('MetalRule', () => {
	/**
	 * @type {MetalRule}
	 */
	let rule;

	beforeEach(() => {
		rule = new MetalRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.5);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for the correct token pattern', () => {
			const state = {
				index: 0,
				pattern: 'Mtl'
			};
			expect(rule.canHandle('M', state)).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(
				rule.canHandle('x', {
					index: 0,
					pattern: 'xMtl'
				})
			).toBe(false);
			expect(
				rule.canHandle('y', {
					index: 0,
					pattern: 'yMtl'
				})
			).toBe(false);
			expect(
				rule.canHandle('z', {
					index: 0,
					pattern: 'zMtl'
				})
			).toBe(false);
			expect(
				rule.canHandle('m', {
					index: 0,
					pattern: 'mtl'
				})
			).toBe(false);
		});
	});

	describe('parse', () => {
		it('should parse the token correctly', () => {
			const state = {
				index: 0,
				pattern: 'Mtl'
			};

			const result = rule.parse(state);

			expect(result).toEqual({
				type: 'metal'
			});
		});
	});

	describe('toString', () => {
		it('should return a string representation', () => {
			const node = {
				type: 'metal'
			};

			expect(rule.toString(node)).toBe('Metal');
		});
	});

	describe('process', () => {
		it('should process the node correctly', () => {
			const node = {
				type: 'metal'
			};
			const processor = {};
			let result;

			vi.spyOn(Math, 'random').mockReturnValue(0);
			result = rule.process(node, processor);

			expect(result).toBe('gold');

			vi.spyOn(Math, 'random').mockReturnValue(0.5);
			result = rule.process(node, processor);

			expect(result).toBe('iron');

			vi.spyOn(Math, 'random').mockReturnValue(0.99999);
			result = rule.process(node, processor);

			expect(result).toBe('steel');
		});
	});
});
