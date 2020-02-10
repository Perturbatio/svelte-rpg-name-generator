export default class LighterVowel {
	
	get token(){
		return 'w';
	}
	
	get description(){
		return 'A single vowel weighted to lighter sounds (this is really just a test)';
	}
	
	handle(exclude){
		exclude = (exclude) ? exclude.split('') : [];
		let values = [ 'a','e','a','e','a','e','a','e','a','e','a','e','a','e','a','e','i','o','u' ].filter((v) => !exclude.includes(v));
		
		return values[parseInt(Math.random()*values.length, 10)]
	}
}
