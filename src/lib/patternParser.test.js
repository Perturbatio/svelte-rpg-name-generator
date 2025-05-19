import { describe, it, expect } from 'vitest';
import { parsePattern, astToString } from './patternParser';

describe('patternParser', () => {
	describe('parsePattern', () => {
		it('should parse a simple literal', () => {
			const result = parsePattern('abc');
			expect(result).toEqual({
				type: 'sequence',
				nodes: [{ type: 'accentedVowel' }, { type: 'literal', value: 'b' }, { type: 'consonant' }]
			});
		});

		it('should parse an elven female name start token', () => {
			const result = parsePattern('EFS');
			expect(result).toEqual({
				type: 'elvenFemaleStart'
			});
		});
		it('should parse a string literal', () => {
			const result = parsePattern('"abc"');
			expect(result).toEqual({
				type: 'literal',
				value: 'abc'
			});
		});

		it('should parse a nested pattern', () => {
			const result = parsePattern('(abc)');
			expect(result).toEqual({
				type: 'nested',
				value: {
					type: 'sequence',
					nodes: [{ type: 'accentedVowel' }, { type: 'literal', value: 'b' }, { type: 'consonant' }]
				}
			});
		});

		it('should parse an OR statement', () => {
			const result = parsePattern('a|b');
			expect(result).toEqual({
				type: 'or',
				nodes: [{ type: 'accentedVowel' }, { type: 'literal', value: 'b' }]
			});
		});

		it('should parse a character list', () => {
			const result = parsePattern('[abc]');
			expect(result).toEqual({
				type: 'charList',
				value: 'abc'
			});
		});

		it('should handle whitespace correctly', () => {
			// Test that all whitespace except single spaces is ignored
			const result = parsePattern('a \t\n\r b');
			expect(result).toEqual({
				type: 'sequence',
				nodes: [
					{ type: 'accentedVowel' },
					{ type: 'literal', value: ' ' },
					{ type: 'literal', value: 'b' }
				]
			});

			// Test that multiple spaces are collapsed into a single space
			const result2 = parsePattern('a  b');
			expect(result2).toEqual({
				type: 'sequence',
				nodes: [
					{ type: 'accentedVowel' },
					{ type: 'literal', value: ' ' },
					{ type: 'literal', value: 'b' }
				]
			});
		});
	});

	describe('astToString', () => {
		it('should convert a simple AST to string', () => {
			const ast = {
				type: 'sequence',
				nodes: [{ type: 'consonantPair' }, { type: 'vowel' }]
			};
			const result = astToString(ast);
			expect(result).toBe('Sequence(ConsonantPair, Vowel)');
		});

		it('should handle null AST', () => {
			const result = astToString(null);
			expect(result).toBe('null');
		});

		it('should convert a complex AST to string', () => {
			const ast = {
				type: 'sequence',
				nodes: [
					{ type: 'consonantPair' },
					{
						type: 'nested',
						value: {
							type: 'or',
							left: { type: 'accentedVowel' },
							right: { type: 'vowel' }
						}
					},
					{ type: 'consonantPair' }
				]
			};
			const result = astToString(ast);
			expect(result).toBe(
				'Sequence(ConsonantPair, Nested(Or(AccentedVowel, Vowel)), ConsonantPair)'
			);
		});
	});
});
