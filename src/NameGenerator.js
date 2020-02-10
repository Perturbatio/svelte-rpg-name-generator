import OldProcessor from './OldProcessor.js'
import Vowel from './operations/vowel_op.js'
import VowelPair from './operations/vowel_pair_op.js'
import Consonant from './operations/consonant_op.js'
import ConsonantPair from './operations/consonant_pair_op.js'
import SoftConsonant from './operations/soft_consonant_op.js'
import SoftConsonantPair from './operations/soft_consonant_pair_op.js'
import LighterVowel from './operations/lighter_vowel_op.js'
import LogicalGroup from './operations/logical_group_op.js'
import AccentedVowel from './operations/accented_vowel_op.js'
import ElfFemaleStart from './operations/elf_female_start_op.js'
import ElfFemaleEnd from './operations/elf_female_end_op.js'
import HardConsonant from './operations/hard_consonant_op.js'
import SoftSyllable from './operations/soft_syllable_op.js'
import {tokenizerFactory} from './tokenizer/Tokenizer'
import {process} from './Processor'
import SoftSyllablePairs from './operations/soft_syllable_with_pairs_op';

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
    new SoftSyllable,
    new SoftSyllablePairs(),
]

let tokenizer = tokenizerFactory( ops )

export const tokens = ops.map( op => {
    return {token: op.token, description: op.description}
} )

export function generateName( pattern ) {
    if ( pattern.length ) {
        return process( tokenizer.tokenize( pattern ).tokens )
    } else {
    	return 'no pattern'
	}
}