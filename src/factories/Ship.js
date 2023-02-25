export default class Ship {
	constructor(length, position = []) {
		this.length = length;
		this.position = position;
		this.hits = [];
	}

	hit(index) {
		this.hits.push(index);
	}

	isSunk() {
		return JSON.stringify(this.position.sort()) === JSON.stringify(this.hits.sort());
	}
}
