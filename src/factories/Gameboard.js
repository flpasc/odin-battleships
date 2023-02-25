import Ship from "./Ship";
var _ = require("lodash");

export default class Gameboard {
	constructor(board = [], hits = []) {
		this.board = [];
		this.hits = hits;
		this.deployedShips = [];

		this.xBoarder = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
		this.yBoarder = [91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

		this.init();
	}

	reset() {
		this.board = [];
		this.deployedShips = [];
	}

	init() {
		for (let i = 0; i < 100; i++) {
			this.board.push({ hasShip: false, hasShot: false });
		}
	}

	placeShip(ship, index, direction) {
		if (direction != "horizontal" && direction != "vertical") false;
		if (!this.isLegalPlacement(ship, index, direction)) return false;
		else {
			this.deployedShips.push(ship);
			for (let i = 0; i < ship.length; ++i) {
				if (direction === "horizontal") {
					this.board[index + i].hasShip = true;
					ship.position.push(index + i);
				} else if (direction === "vertical") {
					this.board[index + i * 10].hasShip = true;
					ship.position.push(index + i * 10);
				} else {
					throw new Error("u fucked up direction input, morron");
				}
			}
			return true;
		}
	}

	isLegalPlacement(ship, index, direction) {
		if (index < 0 || index + ship.length * 10 > 100) return false;
		else {
			for (let i = 0; i < ship.length; ++i) {
				// check if ships on board[index]
				if (this.board[index + i].hasShip === true) {
					return false;
				} else if (this.board[index + i * 10].hasShip === true) {
					return false;
					// check if ship exceeds this boarders
				} else if (direction === "horizontal" && this.xBoarder.includes(index + i) && i != ship.length - 1) {
					return false;
				} else if (direction === "vertical" && this.yBoarder.includes(index + i * 10) && i != ship.length - 1) {
					return false;
				}
			}
			return true;
		}
	}
	assignHit(index) {
		if (this.board[index].hasShot) return false;
		else {
			this.board[index].hasShot = true;
		}
	}

	checkIfHit(index) {
		if (this.board[index].hasShip === true) {
			this.hits++;

			console.log(index);

			this.deployedShips.forEach((ship) => {
				console.log(_.includes(ship.position, index));
				console.log(ship.position);

				if (ship.position.includes(index)) {
					ship.hits.push(index);
				}
			});

			return true;
		}
		return false;
	}
	allShipsSunk() {
		let allSunk = false;
		this.deployedShips.forEach((ship) => {
			if (ship.isSunk() === false) {
				allSunk = false;
			} else if (ship.isSunk() === true) {
				allSunk = true;
			}
		});
		return allSunk;
	}

	cpuTurn() {}
	placeShipRandom(ship) {
		const directions = ["horizontal", "vertical"];
		let check = false;

		while (check === false) {
			let randomLocation = Math.floor(Math.random() * 100);
			let randomDirection = directions[Math.floor(Math.random() * directions.length)];

			if (this.isLegalPlacement(ship, randomLocation, randomDirection) === false) {
				check = false;
			}
			if (this.placeShip(ship, randomLocation, randomDirection) === true) {
				check = true;
				return true;
			}
		}
	}

	opponentsBoard() {
		let opponentBoard = [];
		this.board.forEach((cell) => {
			if (cell.hasShot === true && cell.hasShip === true) opponentBoard.push("hit");
			if (cell.hasShot === true && cell.hasShip === false) opponentBoard.push("miss");
			if (cell.hasShot === false && cell.hasShip === false) opponentBoard.push("empty");
			if (cell.hasShot === false && cell.hasShip === true) opponentBoard.push("ship");
		});
		return opponentBoard;
	}
}
