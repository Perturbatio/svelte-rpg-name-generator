import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { DwarvenTerrainMineralProvider } from './DwarvenTerrainMineralProvider.js';

describe('DwarvenTerrainMineralProvider', () => {
	let provider;

	beforeEach(() => {
		provider = new DwarvenTerrainMineralProvider();
		// Mock Math.random to return predictable values for testing
		vi.spyOn(Math, 'random').mockReturnValue(0.5);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('getTerrainMinerals', () => {
		it('should return an array of terrain and mineral names', () => {
			const terrainMinerals = provider.getTerrainMinerals();

			expect(Array.isArray(terrainMinerals)).toBe(true);
			expect(terrainMinerals.length).toBeGreaterThan(0);

			// Check for some terrain references
			expect(terrainMinerals).toContain('mountain');
			expect(terrainMinerals).toContain('cave');
			expect(terrainMinerals).toContain('mine');

			// Check for some mineral references
			expect(terrainMinerals).toContain('diamond');
			expect(terrainMinerals).toContain('obsidian');
			expect(terrainMinerals).toContain('rock');
			expect(terrainMinerals).toContain('stone');
		});
	});

	describe('getRandomTerrainMineral', () => {
		it('should return a random terrain or mineral from the list', () => {
			const terrainMineral = provider.getRandomItem();

			// With Math.random mocked to return 0.5, it should select a specific item
			// The index would be 0.5 * array.length, rounded down
			const expectedIndex = Math.floor(0.5 * provider.getTerrainMinerals().length);
			const expectedTerrainMineral = provider.getTerrainMinerals()[expectedIndex];

			expect(terrainMineral).toBe(expectedTerrainMineral);
		});
	});

	describe('getTerrainMineralsAsString', () => {
		it('should return all terrain and mineral references as a comma-separated string', () => {
			const terrainMineralsString = provider.getTerrainMineralsAsString();
			const terrainMinerals = provider.getTerrainMinerals();

			expect(typeof terrainMineralsString).toBe('string');

			// Check that all terrain and mineral references are in the string
			for (const terrainMineral of terrainMinerals) {
				expect(terrainMineralsString).toContain(terrainMineral);
			}

			// Check that the string is correctly formatted
			expect(terrainMineralsString).toBe(terrainMinerals.join(', '));
		});
	});
});
