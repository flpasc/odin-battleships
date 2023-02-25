import Gamemanager from "../../helper/ Gamemanager";
import Player from "../factories/player";

describe("gamemanager tests", () => {
	let player1 = new Player();
	let player2 = new Player();

	beforeEach(() => {
		Gamemanager.addPlayer("Player1");
		Gamemanager.addPlayer("Player2");
	});

	it("change active player1", () => {
		Gamemanager.activePlayer = "Player1";
		Gamemanager.toggleActivePlayer();
		expect(Gamemanager.activePlayer).toBe("Player2");
	});
	it("change active player2", () => {
		Gamemanager.activePlayer = "Player2";
		Gamemanager.toggleActivePlayer();
		expect(Gamemanager.activePlayer).toBe("Player1");
	});
});
