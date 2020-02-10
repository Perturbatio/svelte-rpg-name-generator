import { rand } from './../helpers/random'
export default class HardConsonant {
	get token(){
		return 'h';
	}
	
	get description(){
		return 'A single hard consonant';
	}
	
	handle(){
		let values = "bcdgkpqtxz".split('');
		
		return values[rand(0, values.length-1)]
	}
}
