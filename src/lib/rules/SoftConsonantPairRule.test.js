import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { SoftConsonantPairRule } from './SoftConsonantPairRule.js';

describe('SoftConsonantPairRule', () => {
	let rule;

	beforeEach(() => {
		rule = new SoftConsonantPairRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.2); // This will select a specific soft consonant pair
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "S"', () => {
			expect(rule.canHandle('S')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('s')).toBe(false);
			expect(rule.canHandle('C')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should increment the index and return a softConsonantPair node', () => {
			const state = { index: 0 };
			const result = rule.parse(state);

			expect(state.index).toBe(1);
			expect(result).toEqual({ type: 'softConsonantPair' });
		});
	});

	describe('toString', () => {
		it('should return "SoftConsonantPair"', () => {
			const node = { type: 'softConsonantPair' };
			expect(rule.toString(node)).toBe('SoftConsonantPair');
		});
	});

	describe('process', () => {
		it('should return a soft consonant pair from the list', () => {
			const node = { type: 'softConsonantPair' };
			const processor = {};

			// With Math.random mocked to return 0.2, it should select a specific soft consonant pair
			const result = rule.process(node, processor);

			expect(result).toBe('ln');
		});

		it('should select different soft consonant pairs based on random value', () => {
			const node = { type: 'softConsonantPair' };
			const processor = {};

			// Test with different random values
			vi.spyOn(Math, 'random').mockReturnValueOnce(0); // start of the list
			expect(rule.process(node, processor)).toBe('ch');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.6); // just past the middle
			expect(rule.process(node, processor)).toBe('ll');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.9999999); // end of the list
			expect(rule.process(node, processor)).toBe('zh');
		});
	});
});
