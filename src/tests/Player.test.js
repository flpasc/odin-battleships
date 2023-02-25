import Gameboard from "../factories/Gameboard";
import Player from "../factories/Player";

describe("Player tests", () => {
	it("fire a Shot", () => {
		let testboard = new Gameboard();
		let player1 = new Player();

		player1.fireShot(testboard, 12);
		expect(testboard.board[12].hasShot).toBe(true);
	});
});
