export default class VowelPair {
	get token(){
		return 'V';
	}
	
	get description(){
		return 'A "nice" vowel pair';
	}
	
	handle(){
		let vowels = 'aeiou'.split('');
		let preventDoublesOf = ['a', 'i', 'u'];
		let result = vowels[parseInt(Math.random()*vowels.length, 10)];

		if (preventDoublesOf.includes(result)){
			vowels = vowels.filter((v) => v !== result);
		}
		return result + vowels[parseInt(Math.random()*vowels.length, 10)];

	}
}
