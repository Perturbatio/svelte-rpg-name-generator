import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { SoftSyllableRule } from './SoftSyllableRule.js';

import { astProcessor } from '$lib/ruleRegistry.js';

describe('SoftSyllableRule', () => {
	let rule;

	beforeEach(() => {
		rule = new SoftSyllableRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.3); // This will select a specific soft syllable
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "y"', () => {
			expect(rule.canHandle('y')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('Y')).toBe(false);
			expect(rule.canHandle('v')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should increment the index and return a softSyllable node', () => {
			const state = { index: 0 };
			const result = rule.parse(state);

			expect(state.index).toBe(1);
			expect(result).toEqual({ type: 'softSyllable' });
		});
	});

	describe('toString', () => {
		it('should return "SoftSyllable"', () => {
			const node = { type: 'softSyllable' };
			expect(rule.toString(node)).toBe('SoftSyllable');
		});
	});

	describe('process', () => {
		it('should return a soft syllable from the list', () => {
			const node = { type: 'softSyllable' };

			// With Math.random mocked to return 0.3, it should select a specific soft syllable
			const result = rule.process(node, astProcessor);

			expect(result[0]).toMatch(/[bcdfghjklmnpqrstvwxyz]/);
			expect(result[1]).toMatch(/[aeiou]/);
		});

		it('should select different soft syllables based on random value', () => {
			const node = { type: 'softSyllable' };

			vi.spyOn(Math, 'random').mockReturnValueOnce(0); // get the first from each of the invoked rules
			vi.spyOn(Math, 'random').mockReturnValueOnce(0); // get the first from each of the invoked rules
			expect(rule.process(node, astProcessor)).toBe('fa');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.5); // get the middle from each of the invoked rules
			vi.spyOn(Math, 'random').mockReturnValueOnce(0.5); // get the middle from each of the invoked rules
			expect(rule.process(node, astProcessor)).toBe('ni');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.999999999); // get the last from each of the invoked rules
			vi.spyOn(Math, 'random').mockReturnValueOnce(0.999999999); // get the last from each of the invoked rules
			expect(rule.process(node, astProcessor)).toBe('yu');
		});
	});
});
