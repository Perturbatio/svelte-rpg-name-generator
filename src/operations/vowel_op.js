export default class Vowel {
	
	get token(){
		return 'v';
	}
	
	get description(){
		return 'A single vowel';
	}
	
	handle(exclude){
		exclude = (exclude) ? exclude.split('') : [];
		let values = [ 'a','e','i','o','u' ].filter((v) => !exclude.includes(v));
		
		return values[parseInt(Math.random()*values.length, 10)]
	}
}
