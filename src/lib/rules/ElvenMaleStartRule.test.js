import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import '$lib/ruleRegistry.js';
import { ElvenMaleStartRule } from './ElvenMaleStartRule.js';

describe('ElvenMaleStartRule', () => {
	/**
	 * @type {ElvenMaleStartRule}
	 */
	let rule;

	beforeEach(() => {
		rule = new ElvenMaleStartRule();
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
				pattern: 'EMS'
			};

			expect(
				rule.canHandle('E', {
					index: 0,
					pattern: 'E'
				})
			).toBe(false);

			expect(rule.canHandle('E', state)).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(
				rule.canHandle('x', {
					index: 0,
					pattern: 'xEMS'
				})
			).toBe(false);

			expect(
				rule.canHandle('y', {
					index: 0,
					pattern: 'yEMS'
				})
			).toBe(false);

			expect(
				rule.canHandle('z', {
					index: 0,
					pattern: 'zEMS'
				})
			).toBe(false);
		});
	});

	describe('parse', () => {
		it('should parse the token correctly', () => {
			const state = {
				index: 0,
				pattern: 'EMS'
			};

			const result = rule.parse(state);

			// Example:
			// expect(state.index).toBe(1);
			expect(result).toEqual({
				type: 'elvenMaleStart'
			});
		});
	});

	describe('toString', () => {
		it('should return a string representation', () => {
			const node = {
				type: 'elvenMaleStart'
			};

			expect(rule.toString(node)).toBe('ElvenMaleStart');
		});
	});

	describe('process', () => {
		it('should process the node correctly', () => {
			vi.spyOn(Math, 'random').mockReturnValue(0.5);
			const node = {
				type: 'elvenMaleStart'
			};
			const processor = {};
			const result = rule.process(node, processor);

			expect(result).toBe('mass');
		});
	});
});
