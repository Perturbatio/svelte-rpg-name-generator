export default class OldProcessor {
	constructor(){
		this._operations = new Map();
	}
	
	register(operation) {
		this._operations.set(operation.token, operation);
	}
	
	has(operation){
		return this._operations.has(operation);
	}
	
	run(token){
		return this._operations.get(token).handle();
	}

	getTokens(){
		return Array.from(this._operations.keys()).map((k) => { 
			let op = this._operations.get(k);
			return {token:op.token, description:op.description}
		});
	}
}

