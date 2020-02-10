export default class AccentedVowel {
	
	get token(){
		return 'a';
	}
	
	get description(){
		return 'A single accented vowel';
	}
	
	handle(exclude){
		if (typeof exclude === 'string'){
			exclude = (exclude) ? exclude.split('') : [];
		}
		if (!Array.isArray(exclude)){
			exclude = [];
		}
		// let valueString = "áéíóúäöüâôãõ";
		let valueString = '';
		valueString +='æåà'; // As
		valueString +='éèêëē'; // Es
		valueString +='ì'; // Is
		valueString +='œøöò'; // Os
		valueString +='ŭù'; // Us
		let values;

		values = valueString.split('').filter((v) => !exclude.includes(v));
		
		return values[parseInt(Math.random()*values.length, 10)]
	}
}
