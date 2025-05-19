/**
 * DwarvenTerrainMineralProvider
 *
 * This class provides common terrain and mineral references most associated with dwarves or medieval miners.
 */
export class DwarvenTerrainMineralProvider {
	/**
	 * Get a list of common terrain and mineral references associated with dwarves and medieval miners
	 * @returns {string[]} Array of terrain and mineral names
	 */
	getTerrainMinerals() {
		return [
			// Terrain references
			'mountain',
			'peak',
			'cavern',
			'cave',
			'tunnel',
			'mine',
			'shaft',
			'abyss',
			'chasm',
			'crag',
			'cliff',
			'ravine',
			'gorge',
			'underground',
			'depths',
			'deep',
			'hollow',
			'forge',

			// Mineral references
			'diamond',
			'obsidian',
			'marble',
			'granite',
			'slate',
			'flint',
			'coal',
			'stone',
			'rock'
		];
	}

	/**
	 * Get a random terrain or mineral reference
	 * @returns {string} A random terrain or mineral reference
	 */
	getRandomItem() {
		const terrainMinerals = this.getTerrainMinerals();
		return terrainMinerals[Math.floor(Math.random() * terrainMinerals.length)];
	}

	/**
	 * Get all terrain and mineral references as a comma-separated string
	 * @returns {string} Comma-separated list of terrain and mineral references
	 */
	getTerrainMineralsAsString() {
		return this.getTerrainMinerals().join(', ');
	}
}
