import { rand } from './../helpers/random'
export default class ElfFemaleEnd {
	get token(){
		return 'l';
	}
	
	get description(){
		return 'The end of an elven style name';
	}
	
	handle(){
		let values = [
			'al',
			'adia',
			'alia',
			'aria',
			'ana',

			'el',

			'índel', 'illia', 'illieth',

			'la', 'lla', 'lai', 'lar', 'laria', 'lia', 'lieth', 'liel',

			'mial',
			'neth',

			'thial', 'thiel',

			'rial', 'riel',
			'wen', 'wel',
		];
		
		return values[rand(0, values.length-1)]
	}
}
