/**
 * Rule Registry
 *
 * This module provides a centralized registry of all rule instances
 * to be used by both the pattern parser and AST processor.
 */

import {
	NestedRule,
	OrRule,
	CharListRule,
	LiteralRule,
	AccentedVowelRule,
	VowelRule,
	VowelPairRule,
	ConsonantRule,
	ConsonantPairRule,
	SoftConsonantRule,
	SoftConsonantPairRule,
	WeightedVowelRule,
	SoftSyllableRule,
	ElvenFemaleStartRule,
	ElvenFemaleEndRule,
	ElvenMaleStartRule,
	ElvenMaleEndRule,
	WeightedOrRule,
	MetalRule,
	MineralRule
} from './rules/index.js';
import { AstProcessor } from './AstProcessor.js';
import { HardConsonantRule } from '$lib/rules/HardConsonantRule.js';

// Create instances of all rule classes
export const rules = [
	new VowelRule(),
	new VowelPairRule(),
	new AccentedVowelRule(),
	new WeightedVowelRule(),
	new ConsonantRule(),
	new ConsonantPairRule(),
	new HardConsonantRule(),
	new SoftConsonantRule(),
	new SoftConsonantPairRule(),
	new SoftSyllableRule(),
	new CharListRule(),
	new NestedRule(),
	new OrRule(),
	new WeightedOrRule(),
	new LiteralRule(),
	new ElvenFemaleStartRule(),
	new ElvenFemaleEndRule(),
	new ElvenMaleStartRule(),
	new ElvenMaleEndRule(),
	new MetalRule(),
	new MineralRule()
];

// Create a map of rule types to rule instances for faster lookup
/**
 * Map of rule types to their corresponding rule instances
 * @type {Object<string, BaseRule>}
 *
 *  @typedef {Object} RuleTypeMap
 * @property {NestedRule} nested - Instance of NestedRule
 * @property {OrRule} or - Instance of OrRule
 * @property {CharListRule} charList - Instance of CharListRule
 * @property {LiteralRule} literal - Instance of LiteralRule
 * @property {AccentedVowelRule} accentedVowel - Instance of AccentedVowelRule
 * @property {VowelRule} vowel - Instance of VowelRule
 * @property {VowelPairRule} vowelPair - Instance of VowelPairRule
 * @property {ConsonantRule} consonant - Instance of ConsonantRule
 * @property {ConsonantPairRule} consonantPair - Instance of ConsonantPairRule
 * @property {SoftConsonantRule} softConsonant - Instance of SoftConsonantRule
 * @property {SoftConsonantPairRule} softConsonantPair - Instance of SoftConsonantPairRule
 * @property {WeightedVowelRule} weightedVowel - Instance of WeightedVowelRule
 * @property {SoftSyllableRule} softSyllable - Instance of SoftSyllableRule
 * @property {ElvenFemaleStartRule} elvenFemaleStart - Instance of ElvenFemaleStartRule
 * @property {ElvenFemaleEndRule} elvenFemaleEnd - Instance of ElvenFemaleEndRule
 * @property {WeightedOrRule} weightedOr - Instance of WeightedOrRule
 */
export const ruleTypeMap = {
	nested: rules.find((rule) => rule instanceof NestedRule),
	or: rules.find((rule) => rule instanceof OrRule),
	charList: rules.find((rule) => rule instanceof CharListRule),
	literal: rules.find((rule) => rule instanceof LiteralRule),
	accentedVowel: rules.find((rule) => rule instanceof AccentedVowelRule),
	vowel: rules.find((rule) => rule instanceof VowelRule),
	vowelPair: rules.find((rule) => rule instanceof VowelPairRule),
	consonant: rules.find((rule) => rule instanceof ConsonantRule),
	consonantPair: rules.find((rule) => rule instanceof ConsonantPairRule),
	hardConsonant: rules.find((rule) => rule instanceof HardConsonantRule),
	softConsonant: rules.find((rule) => rule instanceof SoftConsonantRule),
	softConsonantPair: rules.find((rule) => rule instanceof SoftConsonantPairRule),
	weightedVowel: rules.find((rule) => rule instanceof WeightedVowelRule),
	softSyllable: rules.find((rule) => rule instanceof SoftSyllableRule),
	elvenFemaleStart: rules.find((rule) => rule instanceof ElvenFemaleStartRule),
	elvenFemaleEnd: rules.find((rule) => rule instanceof ElvenFemaleEndRule),
	elvenMaleStart: rules.find((rule) => rule instanceof ElvenMaleStartRule),
	elvenMaleEnd: rules.find((rule) => rule instanceof ElvenMaleEndRule),
	weightedOr: rules.find((rule) => rule instanceof WeightedOrRule),
	metal: rules.find((rule) => rule instanceof MetalRule),
	mineral: rules.find((rule) => rule instanceof MineralRule)
};

// After creating rules and ruleTypeMap
export const astProcessor = new AstProcessor(rules, ruleTypeMap);
