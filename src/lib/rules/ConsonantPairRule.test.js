import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ConsonantPairRule } from './ConsonantPairRule.js';

describe('ConsonantPairRule', () => {
	let rule;

	beforeEach(() => {
		rule = new ConsonantPairRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.1); // This will select a specific consonant pair
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "C"', () => {
			expect(rule.canHandle('C')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('c')).toBe(false);
			expect(rule.canHandle('V')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should increment the index and return a consonantPair node', () => {
			const state = { index: 0 };
			const result = rule.parse(state);

			expect(state.index).toBe(1);
			expect(result).toEqual({ type: 'consonantPair' });
		});
	});

	describe('toString', () => {
		it('should return "ConsonantPair"', () => {
			const node = { type: 'consonantPair' };
			expect(rule.toString(node)).toBe('ConsonantPair');
		});
	});

	describe('process', () => {
		it('should return a consonant pair from the list', () => {
			const node = { type: 'consonantPair' };
			const processor = {};

			// With Math.random mocked to return 0.1, it should select the second consonant pair
			const result = rule.process(node, processor);

			// The consonant pairs are: ['ch', 'gh', 'll', 'ng', 'sh', 'th', 'ph', 'wh', 'ck', 'st', 'tr', 'br', 'dr', 'fr', 'gr', 'pr']
			// With Math.random = 0.1, index = 0.1 * 16 = 1.6, which rounds down to 1, so it should select 'gh'
			expect(result).toBe('gh');
		});
	});
});
