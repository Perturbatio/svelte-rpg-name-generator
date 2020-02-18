import { rand } from './../helpers/random'
export default class LighterVowel {
    /**
     *
     * @returns {string}
     */
	get token(){
		return 'w';
	}

    /**
     *
     * @returns {string}
     */
	get description(){
		return 'A single vowel weighted to lighter sounds';
	}

    /**
     *
     * @param exclude {string|[]}
     * @returns {string}
     */
	handle(exclude){
		exclude = (exclude) ? exclude.split('') : [];
		let values = 'aaaaaaeeeeeeiiioou'.split('').filter((v) => !exclude.includes(v));
		
		return values[rand(0, values.length-1)]
	}
}
