import VowelPair from './vowel_pair_op'
import Vowel from './vowel_op'
import SoftConsonantPair from './soft_consonant_pair_op';
import SoftConsonant from './soft_consonant_op'

export default class SoftSyllablePairs {
    get token() {
        return 'Y'
    }

    get description() {
        return 'A soft sounding syllable allowing pairs of consonants or vowels'
    }

    handle() {

        let consonantGenerator = (this._YesNo()) ? new SoftConsonantPair() : new SoftConsonant();
        let vowelPair = (this._YesNo()) ? new VowelPair() : new Vowel();

        return consonantGenerator.handle() + vowelPair.handle();

    }

    _YesNo(){
        return !!Math.round( Math.random() *10 );
    }
}
