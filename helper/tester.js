function placeShipRandom() {
	const directions = ["horizontal", "vertical"];

	let array = [];

	for (let i = 0; i < 10000; i++) {
		let randomLocation = Math.floor(Math.random() * 101);
		let randomDirection = directions[Math.floor(Math.random() * directions.length)];

		array.push(randomLocation);
	}
	array.forEach((element) => {
		if (element > 99 || element < 0) console.log("error");
	});
}

placeShipRandom();
