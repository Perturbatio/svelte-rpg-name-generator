import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { VowelRule } from './VowelRule.js';

describe('VowelRule', () => {
	let rule;

	beforeEach(() => {
		rule = new VowelRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.2); // This will select a specific vowel
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "v"', () => {
			expect(rule.canHandle('v')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('V')).toBe(false);
			expect(rule.canHandle('c')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should increment the index and return a vowel node', () => {
			const state = { index: 0 };
			const result = rule.parse(state);

			expect(state.index).toBe(1);
			expect(result).toEqual({ type: 'vowel' });
		});
	});

	describe('toString', () => {
		it('should return "Vowel"', () => {
			const node = { type: 'vowel' };
			expect(rule.toString(node)).toBe('Vowel');
		});
	});

	describe('process', () => {
		it('should return a vowel from the list', () => {
			const node = { type: 'vowel' };
			const processor = {};

			// With Math.random mocked to return 0.2, it should select a specific vowel
			const result = rule.process(node, processor);

			// The vowels are: ['a', 'e', 'i', 'o', 'u']
			// With Math.random = 0.2, index = 0.2 * 5 = 1, so it should select 'e'
			expect(result).toBe('e');
		});

		it('should use the vowels defined in the constructor', () => {
			// Create a new instance with a custom vowels array
			const customRule = new VowelRule();
			customRule.vowels = ['x', 'y', 'z'];

			// Mock Math.random for this test
			vi.spyOn(Math, 'random').mockReturnValue(0.4); // This will select the second vowel

			const node = { type: 'vowel' };
			const processor = {};

			const result = customRule.process(node, processor);

			// With Math.random = 0.4, index = 0.4 * 3 = 1.2, which rounds down to 1, so it should select 'y'
			expect(result).toBe('y');
		});
	});
});
