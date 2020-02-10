import { rand } from './../helpers/random'
export default class Consonant {
	get token(){
		return 'c';
	}
	
	get description(){
		return 'A single consonant';
	}
	
	handle(){
		let values = "bcdfghjklmnpqrstvwxyz".split('');
		
		return values[rand(0, values.length-1)]
	}
}
