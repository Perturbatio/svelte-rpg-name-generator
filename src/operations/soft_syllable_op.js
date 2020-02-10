import Vowel from './vowel_op'
import SoftConsonant from './soft_consonant_op'

import { rand } from './../helpers/random'
export default class SoftSyllable {
    get token() {
        return 'y'
    }

    get description() {
        return 'A soft sounding syllable'
    }

    handle() {

        let consonantGenerator = new SoftConsonant();
        let vowelPair = new Vowel();

        return consonantGenerator.handle() + vowelPair.handle();

    }
}
