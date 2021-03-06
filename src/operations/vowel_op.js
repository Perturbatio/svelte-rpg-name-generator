import { rand } from './../helpers/random'
export default class Vowel {
	
	get token(){
		return 'v';
	}
	
	get description(){
		return 'A single vowel';
	}

	/**
	 *
	 * @param exclude {string|[]}
	 * @returns {string}
	 */
	handle(exclude){
		exclude = (exclude) ? exclude.split('') : [];
		let values = [ 'a','e','i','o','u' ].filter((v) => !exclude.includes(v));
		
		return values[rand(0, values.length-1)]
	}
}
