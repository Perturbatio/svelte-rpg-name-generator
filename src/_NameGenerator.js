import OldProcessor from './OldProcessor.js';
import Vowel from './operations/vowel_op.js';
import VowelPair from './operations/vowel_pair_op.js';
import Consonant from './operations/consonant_op.js';
import ConsonantPair from './operations/consonant_pair_op.js';
import SoftConsonant from './operations/soft_consonant_op.js';
import SoftConsonantPair from './operations/soft_consonant_pair_op.js';
import LighterVowel from './operations/lighter_vowel_op.js';
import LogicalGroup from './operations/logical_group_op.js';
import AccentedVowel from './operations/accented_vowel_op.js';
import ElfFemaleStart from './operations/elf_female_start_op.js';
import ElfFemaleEnd from './operations/elf_female_end_op.js';
import HardConsonant from './operations/hard_consonant_op.js';
import SoftSyllable from './operations/soft_syllable_op.js';
import {tokenizerFactory} from './tokenizer/Tokenizer'
import {process} from './Processor'

const ops = [
	new Vowel,
	new VowelPair,
	new Consonant(),
	new ConsonantPair(),
	new SoftConsonant(),
	new SoftConsonantPair(),
	new HardConsonant,
	new LighterVowel,
	new LogicalGroup,
	new AccentedVowel,
	new ElfFemaleStart,
	new ElfFemaleEnd,
	new SoftSyllable
]
let tokenizer = tokenizerFactory( ops )


let opProcessor = new OldProcessor();
const stringDelimiter = '"'
const orDelimiter = '|';
const literals = "' -";

opProcessor.register(new Vowel);
opProcessor.register(new VowelPair);
opProcessor.register(new Consonant());
opProcessor.register(new ConsonantPair());
opProcessor.register(new SoftConsonant());
opProcessor.register(new SoftConsonantPair());
opProcessor.register(new HardConsonant);
opProcessor.register(new LighterVowel);
opProcessor.register(new LogicalGroup);
opProcessor.register(new AccentedVowel);
opProcessor.register(new ElfFemaleStart);
opProcessor.register(new ElfFemaleEnd);
opProcessor.register(new SoftSyllable);

function read(str, cursor){
	let result;
	if (str[cursor]) {
		result = str[cursor];
	}
	return result;
}

function readString(pattern, cursor){
	let result = '';
	let char = read(pattern, cursor);

	do {
		result += char;
		cursor++;
		char = read(pattern, cursor);
	} while (char !== stringDelimiter && cursor < pattern.length);

	cursor++;

	return {result, cursor};
}

function flipCoin(){
	return !!Math.round(Math.random())
}

function handleOr(lookahead, current, result, cursor, pattern){
    lookahead = read(pattern, cursor+1); // find the char after the OR

    if (opProcessor.has(current) && opProcessor.has(lookahead)){
        result += flipCoin() ? opProcessor.run(current) : opProcessor.run(lookahead);
        cursor += 2;// skip ahead
    } else if (lookahead === stringDelimiter){ // String

        let stringValue = readString(pattern, cursor+2);
			
        if (flipCoin()){
            result += stringValue.result;
        } else {
            result += opProcessor.run(current);
        }

        cursor = stringValue.cursor; // either way, advance the cursor passed the OR'd string

    } else {
			result = `Invalid opcode at cursor position ${cursor}`
		}
	
    return [
        lookahead,
				current,
        result,
        cursor,
    ];
}

function run(pattern){
	let result = '';
	let current;
	let lookahead;
	let cursor = 0;
	let maxIterations = 40;// a simple infinite loop buster
	let currentIterations = 0;

	current = read(pattern, cursor);
	cursor++;
	lookahead = read(pattern, cursor);

	while(current && (currentIterations < maxIterations)){
		currentIterations += 1;

		switch (true){
			// OR
			case lookahead === orDelimiter:
				//console.log('OR');
				[lookahead, current, result, cursor] =  handleOr(lookahead, current, result, cursor, pattern);
				break;
			// String
			case current === stringDelimiter:
				//console.log('string1');
				
				let stringValue = readString(pattern, cursor);
				cursor = stringValue.cursor;
				lookahead = read(pattern, cursor);
				
				if ( lookahead === orDelimiter ){
					//console.log('OR');
					let flipResult = flipCoin();
					let lookahead2 = read(pattern, cursor+1);
					if ( lookahead2 === stringDelimiter ){ // ugly OR for strings
						//console.log('String');
						let secondString = readString(pattern, cursor+2);
						if (flipResult){
							stringValue = secondString;
						}
						result += stringValue.result;
						cursor = secondString.cursor;
					} else if (opProcessor.has(lookahead2)){
					//console.log('OP');
						result += (flipResult) ? stringValue.result : opProcessor.run(lookahead2)
					} else {
						return `Invalid opcode at cursor position ${cursor}`
					}
				} else {
						result += stringValue.result;
					cursor = stringValue.cursor;
				}
					//cursor = stringValue.cursor;
				break;
			case literals.includes(current):
				result += current;
			break;
			default:
				if (opProcessor.has(current)){
					result = result + opProcessor.run(current);
				} else {
					return `Invalid opcode at cursor position ${cursor}`
				}
		}

		current = read(pattern, cursor);
		cursor++;
		lookahead = read(pattern, cursor);

	}

	return result;
}

export const tokens = opProcessor.getTokens();

export function generateName(pattern){
	return run(pattern);
}