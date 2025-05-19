import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { WeightedVowelRule } from './WeightedVowelRule.js';

describe('WeightedVowelRule', () => {
	let rule;

	beforeEach(() => {
		rule = new WeightedVowelRule();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "w"', () => {
			expect(rule.canHandle('w')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('W')).toBe(false);
			expect(rule.canHandle('v')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should increment the index and return a weightedVowel node', () => {
			const state = { index: 0 };
			const result = rule.parse(state);

			expect(state.index).toBe(1);
			expect(result).toEqual({ type: 'weightedVowel' });
		});
	});

	describe('toString', () => {
		it('should return "WeightedVowel"', () => {
			const node = { type: 'weightedVowel' };
			expect(rule.toString(node)).toBe('WeightedVowel');
		});
	});

	describe('process', () => {
		it('should return "a" when random value is 0.1 (within first 50%)', () => {
			const node = { type: 'weightedVowel' };
			const processor = {};

			vi.spyOn(Math, 'random').mockReturnValue(0.1);

			const result = rule.process(node, processor);
			expect(result).toBe('a');
		});

		it('should return "a" when random value is 0.49 (within first 50%)', () => {
			const node = { type: 'weightedVowel' };
			const processor = {};

			vi.spyOn(Math, 'random').mockReturnValue(0.49);

			const result = rule.process(node, processor);
			expect(result).toBe('a');
		});

		it('should return "e" when random value is 0.6 (within 50-75%)', () => {
			const node = { type: 'weightedVowel' };
			const processor = {};

			vi.spyOn(Math, 'random').mockReturnValue(0.6);

			const result = rule.process(node, processor);
			expect(result).toBe('e');
		});

		it('should return "i" when random value is 0.8 (within 75-90%)', () => {
			const node = { type: 'weightedVowel' };
			const processor = {};

			vi.spyOn(Math, 'random').mockReturnValue(0.8);

			const result = rule.process(node, processor);
			expect(result).toBe('i');
		});

		it('should return "o" when random value is 0.92 (within 90-95%)', () => {
			const node = { type: 'weightedVowel' };
			const processor = {};

			vi.spyOn(Math, 'random').mockReturnValue(0.92);

			const result = rule.process(node, processor);
			expect(result).toBe('o');
		});

		it('should return "u" when random value is 0.97 (within 95-100%)', () => {
			const node = { type: 'weightedVowel' };
			const processor = {};

			vi.spyOn(Math, 'random').mockReturnValue(0.97);

			const result = rule.process(node, processor);
			expect(result).toBe('u');
		});

		it('should return "a" as fallback if something goes wrong', () => {
			const node = { type: 'weightedVowel' };
			const processor = {};

			// Mock random to return a value greater than 1, which should trigger the fallback
			vi.spyOn(Math, 'random').mockReturnValue(1.1);

			const result = rule.process(node, processor);
			expect(result).toBe('a');
		});
	});
});
