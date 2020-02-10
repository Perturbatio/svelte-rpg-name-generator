import { rand } from './../helpers/random'
export default class ConsonantPair {
	get token(){
		return 'C';
	}
	
	get description(){
		return 'A "nice" consonant pair';
	}
	
	handle(){
		let values = ['bs','ck','dh','ll','lk','mn','th','lm','sp','dz','ym','zh'];
		
		return values[rand(0, values.length-1)]
	}
}
