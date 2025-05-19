import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ElvenFemaleStartRule } from './ElvenFemaleStartRule.js';

import { astProcessor } from '$lib/ruleRegistry.js';
import { parsePattern } from '$lib/patternParser.js';

describe('ElvenFemaleStartRule', () => {
	let rule;

	beforeEach(() => {
		rule = new ElvenFemaleStartRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.3); // This will select a specific elven female name start
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for "EFS" sequence', () => {
			const state = {
				index: 0,
				pattern: 'EFS'
			};
			expect(rule.canHandle('e', state)).toBe(true);
		});

		it('should return false for other characters or incomplete sequences', () => {
			// Different first character
			const state1 = {
				index: 0,
				pattern: 'AFS'
			};
			expect(rule.canHandle('a', state1)).toBe(false);

			// Incomplete sequence (too short)
			const state2 = {
				index: 0,
				pattern: 'EF'
			};
			expect(rule.canHandle('e', state2)).toBe(false);

			// Incorrect sequence
			const state3 = {
				index: 0,
				pattern: 'eFx'
			};
			expect(rule.canHandle('e', state3)).toBe(false);
		});
	});

	describe('parse', () => {
		it('should increment the index by 3 and return an elvenFemaleStart node', () => {
			const state = { index: 0 };
			const result = rule.parse(state);

			expect(state.index).toBe(3);
			expect(result).toEqual({ type: 'elvenFemaleStart' });
		});
	});

	describe('toString', () => {
		it('should return "ElvenFemaleStart"', () => {
			const node = { type: 'elvenFemaleStart' };
			expect(rule.toString(node)).toBe('ElvenFemaleStart');
		});
	});

	describe('process', () => {
		it('should return an elven female name start from the list', () => {
			const node = { type: 'elvenFemaleStart' };
			// With Math.random mocked to return 0.3, it should select a specific name
			const result = rule.process(node, astProcessor);

			// Verify the result is a string and not empty
			expect(typeof result).toBe('string');
			expect(result.length).toBeGreaterThan(0);
		});

		it('should select different elven female name starts based on random value', () => {
			const node = { type: 'elvenFemaleStart' };

			// Test with different random values
			vi.spyOn(Math, 'random').mockReturnValueOnce(0);
			const firstResult = rule.process(node, astProcessor);

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.5);
			const middleResult = rule.process(node, astProcessor);

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.999999999);
			const lastResult = rule.process(node, astProcessor);

			// Verify we get different results with different random values
			expect(firstResult).toBe('Afeli');
			expect(middleResult).not.toBe(firstResult);
			expect(lastResult).not.toBe(firstResult);
			expect(lastResult).not.toBe(middleResult);
		});
	});
});
