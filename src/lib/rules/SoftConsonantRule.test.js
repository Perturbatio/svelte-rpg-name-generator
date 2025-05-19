import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { SoftConsonantRule } from './SoftConsonantRule.js';

describe('SoftConsonantRule', () => {
	let rule;

	beforeEach(() => {
		rule = new SoftConsonantRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.3); // This will select a specific soft consonant
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "s"', () => {
			expect(rule.canHandle('s')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('S')).toBe(false);
			expect(rule.canHandle('c')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should increment the index and return a softConsonant node', () => {
			const state = { index: 0 };
			const result = rule.parse(state);

			expect(state.index).toBe(1);
			expect(result).toEqual({ type: 'softConsonant' });
		});
	});

	describe('toString', () => {
		it('should return "SoftConsonant"', () => {
			const node = { type: 'softConsonant' };
			expect(rule.toString(node)).toBe('SoftConsonant');
		});
	});

	describe('process', () => {
		it('should return a soft consonant from the list', () => {
			const node = { type: 'softConsonant' };
			const processor = {};

			// With Math.random mocked to return 0.3, it should select a specific soft consonant
			const result = rule.process(node, processor);

			// The soft consonants are: ['f', 'h', 'j', 'l', 'm', 'n', 'r', 's', 'w', 'y']
			// With Math.random = 0.3, index = 0.3 * 10 = 3, so it should select 'l'
			expect(result).toBe('l');
		});

		it('should select different soft consonants based on random value', () => {
			const node = { type: 'softConsonant' };
			const processor = {};

			// Test with different random values
			vi.spyOn(Math, 'random').mockReturnValueOnce(0);
			expect(rule.process(node, processor)).toBe('f');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.5);
			expect(rule.process(node, processor)).toBe('n');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.95);
			expect(rule.process(node, processor)).toBe('y');
		});
	});
});
