export default class Consonant {
	get token(){
		return 'c';
	}
	
	get description(){
		return 'A single consonant';
	}
	
	handle(){
		let values = "bcdfghjklmnpqrstvwxyz".split('');
		
		return values[parseInt(Math.random()*values.length, 10)]
	}
}
