export default class HardConsonant {
	get token(){
		return 'h';
	}
	
	get description(){
		return 'A single hard consonant';
	}
	
	handle(){
		let values = "bcdgkpqtxz".split('');
		
		return values[parseInt(Math.random()*values.length, 10)]
	}
}
