export default class ElfFemaleStart {
	get token(){
		return 'f';
	}
	
	get description(){
		return 'The beginning of an elven style name';
	}
	
	handle(){
		let values = [
			'Afeli', 'Aglora', 'Aila', 'Alia', 'Alea', 'Alara', 'Aleni', 'Ama', 'Amea', 'Amie', 'Amo', 'Amuri', 'Ana', 'Ane', 'Anuri',
			'Anuria', 'Ara', 'Are', 'Ari', 'Aria', 'Arie', 'Asa', 'Asie', 'Assa', 'Assie', 'Atha', 'Athe', 'Athi', 'Athie', 'Athia',

			'Eda', 'Ede', 'Edi', 'Edo', 'Edae', 'Edari', 'Edera', 'Edere', 'Ederi', 'Edesi', 'Edesil',

			'Fala', 'Faila', 'Faili', 'Faeli', 'Faela', 'Faera', 'Faesh', 'Fahli', 'Fehli',

			'Galie', 'Galea', 'Galeo',  'Glo', 'Glorf', 'Glari'

		];
		
		return values[parseInt(Math.random()*values.length, 10)]
	}
}
