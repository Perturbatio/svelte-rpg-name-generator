import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { astProcessor } from '$lib/ruleRegistry.js';

describe('AstProcessor', () => {
	beforeEach(() => {
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.2); // This will select the second vowel ('e')
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should process a vowel node', () => {
		const ast = { type: 'vowel' };
		const result = astProcessor.process(ast);
		expect(result).toBeDefined();
		// We can't assert the exact value since it depends on the VowelRule implementation
		// but we can check that it's a string
		expect(typeof result).toBe('string');
	});

	it('should process a literal node', () => {
		const ast = { type: 'literal', value: 'test' };
		const result = astProcessor.process(ast);
		expect(result).toBe('test');
	});

	it('should process a sequence node', () => {
		const ast = {
			type: 'sequence',
			nodes: [
				{ type: 'literal', value: 't' },
				{ type: 'literal', value: 'e' },
				{ type: 'literal', value: 'st' }
			]
		};
		const result = astProcessor.process(ast);
		expect(result).toBe('test');
	});

	it('should handle null or undefined AST', () => {
		expect(astProcessor.process(null)).toBe('');
		expect(astProcessor.process(undefined)).toBe('');
	});

	it('should handle unimplemented node types', () => {
		const ast = { type: 'unimplemented' };
		const result = astProcessor.process(ast);
		expect(result).toBe('');
	});

	it('should use the rule process method', () => {
		// Create a mock rule
		const mockRule = {
			process: vi.fn().mockReturnValue('mock result')
		};

		// Replace the vowel rule with the mock rule
		astProcessor.ruleTypeMap.vowel = mockRule;

		// Process a vowel node
		const ast = { type: 'vowel' };
		const result = astProcessor.process(ast);

		// Verify that the mock rule's process method was called
		expect(mockRule.process).toHaveBeenCalledWith(ast, astProcessor);
		expect(result).toBe('mock result');
	});

	it('processSequence should process each node in the sequence', () => {
		// Create a mock processor
		const mockProcessor = {
			process: vi.fn().mockReturnValueOnce('t').mockReturnValueOnce('e').mockReturnValueOnce('st')
		};

		// Create a sequence node
		const node = {
			nodes: [{ type: 'literal', value: 't' }, { type: 'vowel' }, { type: 'literal', value: 'st' }]
		};

		// Process the sequence node
		const result = astProcessor.processSequence(node, mockProcessor);

		// Verify that the processor's process method was called for each node
		expect(mockProcessor.process).toHaveBeenCalledTimes(3);
		expect(mockProcessor.process).toHaveBeenCalledWith(node.nodes[0]);
		expect(mockProcessor.process).toHaveBeenCalledWith(node.nodes[1]);
		expect(mockProcessor.process).toHaveBeenCalledWith(node.nodes[2]);
		expect(result).toBe('test');
	});
});
