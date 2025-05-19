import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CharListRule } from './CharListRule.js';

describe('CharListRule', () => {
	let rule;

	beforeEach(() => {
		rule = new CharListRule();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.4); // This will select a specific character
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('canHandle', () => {
		it('should return true for character "["', () => {
			expect(rule.canHandle('[')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle(']')).toBe(false);
			expect(rule.canHandle('a')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should extract the character list between brackets', () => {
			const state = {
				index: 0,
				pattern: '[abc]'
			};

			const result = rule.parse(state);

			expect(state.index).toBe(5); // Should have moved past the closing bracket
			expect(result).toEqual({
				type: 'charList',
				value: 'abc'
			});
		});

		it('should handle missing closing bracket', () => {
			const state = {
				index: 0,
				pattern: '[abc'
			};

			const result = rule.parse(state);

			expect(state.index).toBe(4); // Should have moved to the end of the string
			expect(result).toEqual({
				type: 'charList',
				value: 'abc'
			});
		});

		it('should handle empty character lists', () => {
			const state = {
				index: 0,
				pattern: '[]'
			};

			const result = rule.parse(state);

			expect(state.index).toBe(2); // Should have moved past the closing bracket
			expect(result).toEqual({
				type: 'charList',
				value: ''
			});
		});
	});

	describe('toString', () => {
		it('should return a string representation with the character list', () => {
			const node = {
				type: 'charList',
				value: 'abc'
			};

			expect(rule.toString(node)).toBe('CharList(abc)');
		});

		it('should handle empty character lists', () => {
			const node = {
				type: 'charList',
				value: ''
			};

			expect(rule.toString(node)).toBe('CharList()');
		});
	});

	describe('process', () => {
		it('should return a character from the list', () => {
			const node = {
				type: 'charList',
				value: 'abc'
			};
			const processor = {};

			// With Math.random mocked to return 0.4, it should select a specific character
			const result = rule.process(node, processor);

			// With Math.random = 0.4, index = 0.4 * 3 = 1.2, which rounds down to 1, so it should select 'b'
			expect(result).toBe('b');
		});

		it('should handle empty character lists', () => {
			const node = {
				type: 'charList',
				value: ''
			};
			const processor = {};

			const result = rule.process(node, processor);

			expect(result).toBe('');
		});

		it('should select different characters based on random value', () => {
			const node = {
				type: 'charList',
				value: 'xyz'
			};
			const processor = {};

			// Test with different random values
			vi.spyOn(Math, 'random').mockReturnValueOnce(0);
			expect(rule.process(node, processor)).toBe('x');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.5);
			expect(rule.process(node, processor)).toBe('y');

			vi.spyOn(Math, 'random').mockReturnValueOnce(0.9);
			expect(rule.process(node, processor)).toBe('z');
		});
	});
});
