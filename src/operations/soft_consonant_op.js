import { rand } from './../helpers/random'
export default class SoftConsonant {
	get token(){
		return 's';
	}
	
	get description(){
		return 'A single soft consonant';
	}
	
	handle(){
		let values = "fghjlmnrswy".split('');
		
		return values[rand(0, values.length-1)]
	}
}
