import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { AccentedVowelRule } from './AccentedVowelRule.js';

describe('AccentedVowelRule', () => {
	let rule;

	beforeEach(() => {
		rule = new AccentedVowelRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.3); // This will select a specific accented vowel
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "a"', () => {
			expect(rule.canHandle('a')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('A')).toBe(false);
			expect(rule.canHandle('v')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should increment the index and return an accentedVowel node', () => {
			const state = { index: 0 };
			const result = rule.parse(state);

			expect(state.index).toBe(1);
			expect(result).toEqual({ type: 'accentedVowel' });
		});
	});

	describe('toString', () => {
		it('should return "AccentedVowel"', () => {
			const node = { type: 'accentedVowel' };
			expect(rule.toString(node)).toBe('AccentedVowel');
		});
	});

	describe('process', () => {
		it('should return an accented vowel from the list', () => {
			const node = { type: 'accentedVowel' };
			const processor = {};

			// With Math.random mocked to return 0.3, it should select a specific accented vowel
			const result = rule.process(node, processor);

			// The accented vowels are: ['á', 'é', 'í', 'ó', 'ú', 'à', 'è', 'ì', 'ò', 'ù']
			// With Math.random = 0.3, index = 0.3 * 10 = 3, so it should select 'ó'
			expect(result).toBe('ó');
		});

		it('should select different accented vowels based on random value', () => {
			const node = { type: 'accentedVowel' };
			const processor = {};

			// Test with different random values
			vi.spyOn(Math, 'random').mockReturnValueOnce(0);
			expect(rule.process(node, processor)).toBe('á');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.5);
			expect(rule.process(node, processor)).toBe('à');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.9);
			expect(rule.process(node, processor)).toBe('ù');
		});
	});
});
