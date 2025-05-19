import { writable } from 'svelte/store';

// Default settings
const DEFAULT_SETTINGS = {
	pattern: '(vS|cvc)ws([aieo]|"")',
	nameCount: 12,
	astVisible: false,
	sidebarOpen: true,
	theme: 'dark',
	collections: {
		"Default": [
			{
				name: 'Elven Female',
				pattern: 'EFSEFE',
			},
			{
				name: 'Elven Male',
				pattern: 'EMSEME',
				},
			{
				name: 'Simple with character sets',
				pattern: '([jshmnwf]|"ph")v[stjmkn]sw',
			},
			{
				name: 'Exotic',
				pattern: 'EFSc h\'V(EME|EFE)',
			},
			{
				name: 'Optional Strings',
				pattern: '("Bob"|"Al")("ea"|"oi"|"ish"|"ye")',
			},
			{
				name: 'Dwarven',
				pattern: `(c|"")vs(
"dorth"|"grim"|"grid"|"grith"|"kili"|"ven"|"vald"|"var"|"vard"|"wold"
)
 
(
"Stone"|"Gold"|"Iron"|"Copper"|
"silver"|"Mountain"|"Hill"|"Fire"|"cold"|
"Golden"|"Storm"|"Wind"
)

(
"Shield"|"Axe"|"Tooth"|"Hammer"|
"Forge"|"Hearth"|"House"|"Helm"|
"Heart"|"shaper"|"biter"|"eater"|
"Fist"|"splitter"|"crusher"|"cleaver"
)`},{
				name: 'Nordic Male',
				pattern: `(
	"aeg"|"ag"|"ag"|"alf"|"arn"|"ar"|"bain"|"bal"|"bard"|"bern"|"brag"|
	"bjar"|"Bir"|"Bar"|"Bjorn"|"Bryn"|
	"brand"|"dag"|"dom"|"dren"|"eg"|"ei"|"eir"|"erl"|"far"|"fast"|
	"folk"|"gal"|"gaut"|"geir"|"jar"|"jarl"|"joalf"|"joar"|"jofur"|
	"leif"|"leik"|"lif"|"lod"|"lom"|"mag"|"mor"|"mun"|"nar"|"ner"|
	"od"|"odd"|"orn"|"ott"|"rein"|"run"|"sax"|"sig"|"skar"|"tor"|"thor"|
	"ulf"|"val"|"van"|"var"
)(
	"an"|"gor"|"goth"|"grin"|"ginn"|"dimarr"|"arr"|"fill"|"wold"|
	"vold"|"wald"|"vald"|"fast"|"rald"|"narr"|"dur"|"mund"|"ward"|
	"vid"|"dan"|"ulf"|"wulf"|"xulf"|"olf"|"nald"|"sten"|"stan"
)`
			},{
				name: 'Nordic Female',
				pattern: `(
	"Ald"|"Asf"|"As"|"Ast"|
	"Be"|"Berg"|"Brin"|"Dag"|"Dal"|
	"Ed"|"El"|"Eld"|"Eil"|"Er"|"Eyd"|"Fre"|"Fri"|"Est"|
	"Gei"|"Ger"|"Grim"|"Gud"|"Gund"|"Gunn"|"Hal"|"Hall"|"Hel"|
	"Hild"|"Hol"|"In"|"Ingi"|"Ing"|"Lif"|"Lin"|"Kel"|
	"Rag"|"Ru"|"Brun"|"Sal"|"Sig"|"Sol"|"Thor"|"Ulf"|"Una"|
	"Un"|"Val"|"Vig"|"Wal"
)(
	"is"|"rif"|"rid"|"ny"|"rith"|"ra"|"dis"|"hild"|"mar"|
	"la"|"na"|"if"|"da"|"rild"|"her"|"run"|"ra"|"dora"|
	"ga"|"ma"|"a"|"veig"|"leif"
)`
			},
			{
				name: 'Reptilian names',
				pattern: `(s|S|"")w
("ss"|"sss"|"sh"|"ssh"|"sna"|"sne"|"sse"|"nass"|"fas"|"shafa")
(""|""|""|"ha"|"saros"|"sauros"|"lass"|"asa"|"azha")
`
			}
		],
	} // Object to store categorized collections of patterns
	// Add more default settings as needed
};

// Helper function to safely parse JSON from localStorage
function getStoredSettings() {
	if (typeof localStorage === 'undefined') return DEFAULT_SETTINGS;

	try {
		const storedSettings = localStorage.getItem('userSettings');
		return storedSettings ? JSON.parse(storedSettings) : DEFAULT_SETTINGS;
	} catch (error) {
		console.error('Error parsing settings from localStorage:', error);
		return DEFAULT_SETTINGS;
	}
}

// Create a writable store with the initial value from localStorage or defaults
function createSettingsStore() {
	// Initialize with stored settings or defaults
	const initialSettings = getStoredSettings();

	// Create the writable store
	const { subscribe, set, update } = writable(initialSettings);

	return {
		subscribe,

		// Set a specific setting
		setSetting: (key, value) => {
			update((settings) => {
				const updatedSettings = { ...settings, [key]: value };

				// Persist to localStorage
				if (typeof localStorage !== 'undefined') {
					localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
				}

				return updatedSettings;
			});
		},

		// Get a specific setting with optional default value
		/**
		 *
		 * @param key
		 * @param {null|string|number} defaultValue
		 * @returns {*|null}
		 */
		getSetting: (key, defaultValue = null) => {
			const settings = getStoredSettings();
			return settings[key] !== undefined ? settings[key] : defaultValue;
		},

		// Reset all settings to defaults
		resetSettings: () => {
			set(DEFAULT_SETTINGS);

			// Persist to localStorage
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('userSettings', JSON.stringify(DEFAULT_SETTINGS));
			}
		},

		// Import settings from a JSON object
		importSettings: (settingsObject) => {
			const newSettings = { ...DEFAULT_SETTINGS, ...settingsObject };
			set(newSettings);

			// Persist to localStorage
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('userSettings', JSON.stringify(newSettings));
			}
		}
	};
}

// Export the settings store instance
export const settingsStore = createSettingsStore();

// Convenience exports for common settings
export const getPattern = () => settingsStore.getSetting('pattern', DEFAULT_SETTINGS.pattern);
export const getNameCount = () => settingsStore.getSetting('nameCount', DEFAULT_SETTINGS.nameCount);
export const getSidebarOpen = () =>
	settingsStore.getSetting('sidebarOpen', DEFAULT_SETTINGS.sidebarOpen);
export const getAstVisible = () =>
	settingsStore.getSetting('astVisible', DEFAULT_SETTINGS.astVisible);
export const getCollections = () =>
	settingsStore.getSetting('collections', DEFAULT_SETTINGS.collections);
export const setCollections = (collections) =>
	settingsStore.setSetting('collections', collections);