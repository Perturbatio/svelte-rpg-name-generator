import { describe, it, expect, beforeEach } from 'vitest';
import { LiteralRule } from './LiteralRule.js';

describe('LiteralRule', () => {
	let rule;

	beforeEach(() => {
		rule = new LiteralRule();
	});

	describe('canHandle', () => {
		it('should return true for character "\\""', () => {
			expect(rule.canHandle('"')).toBe(true);
		});

		it('should return false for other characters', () => {
			expect(rule.canHandle('v')).toBe(false);
			expect(rule.canHandle('C')).toBe(false);
			expect(rule.canHandle('x')).toBe(false);
		});
	});

	describe('parse', () => {
		it('should extract the literal string between quotes', () => {
			const state = {
				index: 0,
				pattern: '"hello"'
			};

			const result = rule.parse(state);

			expect(state.index).toBe(7); // Should have moved past the closing quote
			expect(result).toEqual({
				type: 'literal',
				value: 'hello'
			});
		});

		it('should handle missing closing quote', () => {
			const state = {
				index: 0,
				pattern: '"hello'
			};

			const result = rule.parse(state);

			expect(state.index).toBe(6); // Should have moved to the end of the string
			expect(result).toEqual({
				type: 'literal',
				value: 'hello'
			});
		});

		it('should handle empty literals', () => {
			const state = {
				index: 0,
				pattern: '""'
			};

			const result = rule.parse(state);

			expect(state.index).toBe(2); // Should have moved past the closing quote
			expect(result).toEqual({
				type: 'literal',
				value: ''
			});
		});
	});

	describe('toString', () => {
		it('should return a string representation with the literal value', () => {
			const node = {
				type: 'literal',
				value: 'hello'
			};

			expect(rule.toString(node)).toBe('Literal("hello")');
		});

		it('should handle empty literals', () => {
			const node = {
				type: 'literal',
				value: ''
			};

			expect(rule.toString(node)).toBe('Literal("")');
		});
	});

	describe('process', () => {
		it('should return the literal value', () => {
			const node = {
				type: 'literal',
				value: 'hello'
			};
			const processor = {};

			const result = rule.process(node, processor);

			expect(result).toBe('hello');
		});

		it('should handle empty literals', () => {
			const node = {
				type: 'literal',
				value: ''
			};
			const processor = {};

			const result = rule.process(node, processor);

			expect(result).toBe('');
		});
	});
});
