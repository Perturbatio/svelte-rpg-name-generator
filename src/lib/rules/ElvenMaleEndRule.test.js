import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import '$lib/ruleRegistry.js';
import { ElvenMaleEndRule } from './ElvenMaleEndRule.js';

describe('ElvenMaleEndRule', () => {
	let rule;

	beforeEach(() => {
		rule = new ElvenMaleEndRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.5);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for the correct token pattern', () => {
			expect(
				rule.canHandle('E', {
					index: 0,
					pattern: 'EME'
				})
			).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(
				rule.canHandle('x', {
					index: 0,
					pattern: 'xEME'
				})
			).toBe(false);
			expect(
				rule.canHandle('y', {
					index: 0,
					pattern: 'yEME'
				})
			).toBe(false);
			expect(
				rule.canHandle('z', {
					index: 0,
					pattern: 'zEME'
				})
			).toBe(false);
		});
	});

	describe('parse', () => {
		it('should parse the token correctly', () => {
			const state = {
				index: 0,
				pattern: 'EME'
			};

			const result = rule.parse(state);

			expect(result).toEqual({
				type: 'elvenMaleEnd'
			});
		});
	});

	describe('toString', () => {
		it('should return a string representation', () => {
			const node = {
				type: 'elvenMaleEnd'
			};

			expect(rule.toString(node)).toBe('ElvenMaleEnd');
		});
	});

	describe('process', () => {
		it('should process the node correctly', () => {
			const node = {
				type: 'elvenMaleEnd'
			};
			const processor = {};

			const result = rule.process(node, processor);

			expect(result).toBe('nern');
		});
	});
});
