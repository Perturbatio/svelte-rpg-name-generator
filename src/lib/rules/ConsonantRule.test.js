import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ConsonantRule } from './ConsonantRule.js';

describe('ConsonantRule', () => {
	let rule;

	beforeEach(() => {
		rule = new ConsonantRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.2); // This will select a specific consonant
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "c"', () => {
			expect(rule.canHandle('c')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('C')).toBe(false);
			expect(rule.canHandle('v')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should increment the index and return a consonant node', () => {
			const state = { index: 0 };
			const result = rule.parse(state);

			expect(state.index).toBe(1);
			expect(result).toEqual({ type: 'consonant' });
		});
	});

	describe('toString', () => {
		it('should return "Consonant"', () => {
			const node = { type: 'consonant' };
			expect(rule.toString(node)).toBe('Consonant');
		});
	});

	describe('process', () => {
		it('should return a consonant from the list', () => {
			const node = { type: 'consonant' };
			const processor = {};

			// With Math.random mocked to return 0.2, it should select a specific consonant
			const result = rule.process(node, processor);

			// The consonants are: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
			// With Math.random = 0.2, index = 0.2 * 21 = 4.2, which rounds down to 4, so it should select 'g'
			expect(result).toBe('g');
		});

		it('should select different consonants based on random value', () => {
			const node = { type: 'consonant' };
			const processor = {};

			// Test with different random values
			vi.spyOn(Math, 'random').mockReturnValueOnce(0); // first one
			expect(rule.process(node, processor)).toBe('b');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.5); // middle
			expect(rule.process(node, processor)).toBe('n');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.99); // last one
			expect(rule.process(node, processor)).toBe('z');
		});
	});
});
