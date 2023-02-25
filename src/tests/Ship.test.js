import Gameboard from "../factories/Gameboard";
import Ship from "../factories/Ship";

describe("Ship unit tests", () => {
	let testShipFour;

	beforeEach(() => {
		testShipFour = new Ship(4, [12, 13, 14, 15]);
	});

	it("ship +1 hit", () => {
		testShipFour.hit(44);
		expect(testShipFour.hits).toStrictEqual([44]);
	});

	it("ship +2 hit", () => {
		testShipFour.hit(12);
		testShipFour.hit(13);
		expect(testShipFour.hits).toStrictEqual([12, 13]);
	});

	it("ship not sunk", () => {
		testShipFour.hit(12);
		expect(testShipFour.isSunk()).toBe(false);
	});

	it("ship sunk", () => {
		testShipFour.hit(12);
		testShipFour.hit(13);
		testShipFour.hit(14);
		testShipFour.hit(15);
		expect(testShipFour.isSunk()).toBe(true);
	});
});
