import Gameboard from "../factories/Gameboard";
import Ship from "../factories/Ship";
import Player from "../factories/player";

describe("Gameboard tests", () => {
	let board = [];
	let testShipFour;
	let testShipOne;
	let testShipTwo;
	let testShipThree;
	let testGameboard;

	beforeEach(() => {
		testGameboard = new Gameboard();
		testShipFour = new Ship(4);
		testShipOne = new Ship(1);
		testShipTwo = new Ship(1);
		testShipThree = new Ship(1);
		testGameboard.reset();
		testGameboard.init();
	});

	it("initializing correct testGameboard", () => {
		for (let i = 0; i < 100; i++) {
			board.push({ hasShip: false, hasShot: false });
		}
		expect(testGameboard.board).toStrictEqual(board);
	});

	it("place a ship horizontal", () => {
		testGameboard.placeShip(testShipFour, 42, "horizontal");
		expect(
			testGameboard.board[42].hasShip &&
				testGameboard.board[43].hasShip &&
				testGameboard.board[44].hasShip &&
				testGameboard.board[45].hasShip
		).toBe(true);
	});

	it("place a ship vertical", () => {
		testGameboard.placeShip(testShipFour, 11, "vertical");
		expect(
			testGameboard.board[11].hasShip &&
				testGameboard.board[21].hasShip &&
				testGameboard.board[31].hasShip &&
				testGameboard.board[41].hasShip
		).toBe(true);
	});

	it("place ship ontop other ship", () => {
		testGameboard.placeShip(testShipFour, 11, "horizontal");
		expect(testGameboard.placeShip(testShipOne, 12, "horizontal")).toBe(false);
	});

	it("make illegal placement horizontal", () => {
		expect(testGameboard.placeShip(testShipFour, 9, "horizontal")).toBe(false);
	});

	it("make illegal placement vertical", () => {
		expect(testGameboard.placeShip(testShipFour, 96, "vertical")).toBe(false);
	});

	it("assign hit to testGameboard", () => {
		testGameboard.assignHit(42);
		expect(testGameboard.board[42].hasShot).toBe(true);
	});

	it("assign hit to ship", () => {
		testGameboard.placeShip(testShipFour, 33, "horizontal");
		testGameboard.assignHit(34);
		testGameboard.checkIfHit(34);
		expect(testShipFour.hits).toStrictEqual([34]);
	});

	it("all ships sunk to be false", () => {
		testGameboard.placeShip(testShipOne, 11, "horizontal");
		testGameboard.placeShip(testShipTwo, 34, "horizontal");
		testGameboard.placeShip(testShipThree, 91, "horizontal");

		testGameboard.assignHit(11);
		testGameboard.checkIfHit(11);

		expect(testGameboard.allShipsSunk()).toBe(false);
	});

	it("all ships sunk to be true", () => {
		testGameboard.placeShip(testShipOne, 11, "horizontal");
		testGameboard.placeShip(testShipTwo, 34, "horizontal");
		testGameboard.placeShip(testShipThree, 91, "horizontal");

		testGameboard.assignHit(11);
		testGameboard.checkIfHit(11);

		testGameboard.assignHit(34);
		testGameboard.checkIfHit(34);

		testGameboard.assignHit(91);
		testGameboard.checkIfHit(91);

		expect(testGameboard.allShipsSunk()).toBe(true);
	});

	it("place random ship", () => {
		testGameboard.placeShipRandom(testShipFour);
		testGameboard.placeShipRandom(testShipFour);
		testGameboard.placeShipRandom(testShipFour);
		testGameboard.placeShipRandom(testShipFour);
	});

	it("return board for opponend", () => {
		testGameboard.placeShip(testShipFour, 11, "horizontal");
		testGameboard.assignHit(11);
		testGameboard.assignHit(10);
		testGameboard.assignHit(14);
	});
});
