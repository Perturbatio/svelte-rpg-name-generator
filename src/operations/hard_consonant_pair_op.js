import { rand } from './../helpers/random'
export default class HardConsonantPair {
	get token(){
		return 'H';
	}
	
	get description(){
		return 'A double hard consonant';
	}
	
	handle(){
		let values = [
		  'ck', 'dz', 'tz', 'cz', 'pt'
        ];
		
		return values[rand(0, values.length-1)]
	}
}
