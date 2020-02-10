export default class SoftConsonant {
	get token(){
		return 's';
	}
	
	get description(){
		return 'A single soft consonant';
	}
	
	handle(){
		let values = "cfghjlmnrswy".split('');
		
		return values[parseInt(Math.random()*values.length, 10)]
	}
}
