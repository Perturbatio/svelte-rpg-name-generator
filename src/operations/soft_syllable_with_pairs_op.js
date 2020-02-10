import VowelPair from './vowel_pair_op'
import Vowel from './vowel_op'
import SoftConsonantPair from './soft_consonant_pair_op';
import SoftConsonant from './soft_consonant_op'
import { flip } from './../helpers/random'

export default class SoftSyllablePairs {
    get token() {
        return 'Y'
    }

    get description() {
        return 'A soft sounding syllable allowing pairs of consonants or vowels'
    }

    handle() {

        let consonantGenerator = (flip()) ? new SoftConsonantPair() : new SoftConsonant();
        let vowelPair = (flip()) ? new VowelPair() : new Vowel();

        return consonantGenerator.handle() + vowelPair.handle();

    }
}
