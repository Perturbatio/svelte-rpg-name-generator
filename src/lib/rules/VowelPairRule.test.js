import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { VowelPairRule } from './VowelPairRule.js';

describe('VowelPairRule', () => {
	let rule;

	beforeEach(() => {
		rule = new VowelPairRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.3); // This will select a specific vowel pair
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "V"', () => {
			expect(rule.canHandle('V')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('v')).toBe(false);
			expect(rule.canHandle('C')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should increment the index and return a vowelPair node', () => {
			const state = { index: 0 };
			const result = rule.parse(state);

			expect(state.index).toBe(1);
			expect(result).toEqual({ type: 'vowelPair' });
		});
	});

	describe('toString', () => {
		it('should return "VowelPair"', () => {
			const node = { type: 'vowelPair' };
			expect(rule.toString(node)).toBe('VowelPair');
		});
	});

	describe('process', () => {
		it('should return a vowel pair from the list', () => {
			const node = { type: 'vowelPair' };
			const processor = {};

			// With Math.random mocked to return 0.3, it should select a specific vowel pair
			const result = rule.process(node, processor);

			// The vowel pairs are: ['ai', 'au', 'ei', 'eu', 'ie', 'io', 'ua', 'oi', 'ou']
			// With Math.random = 0.3, index = 0.3 * 9 = 2.7, which rounds down to 2, so it should select 'ei'
			expect(result).toBe('ei');
		});

		it('should select different vowel pairs based on random value', () => {
			const node = { type: 'vowelPair' };
			const processor = {};

			// Test with different random values
			vi.spyOn(Math, 'random').mockReturnValueOnce(0);
			expect(rule.process(node, processor)).toBe('ai');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.5);
			expect(rule.process(node, processor)).toBe('ie');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.95);
			expect(rule.process(node, processor)).toBe('ou');
		});
	});
});
