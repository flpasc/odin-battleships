import Player from "../src/factories/player";
import DOMHandler from "./DOMHandler";
import Ship from "../src/factories/Ship";

export default class Gamemanager {
	static players = [];
	static activePlayer;
	static passivePlayer;
	static turn = 0;
	static message = "";
	static winner = "";

	static startFleet = () => {
		let cruiser = new Ship(2);
		let uboat = new Ship(2);
		let battleship = new Ship(3);
		let carrier = new Ship(4);

		return [cruiser, uboat, battleship, carrier];
	};

	static newPlayer() {
		let name = DOMHandler.setName();
		let player = new Player(name);

		Gamemanager.players.push(player);
	}
	static toggleActivePlayer() {
		if (Gamemanager.activePlayer === Gamemanager.players[0]) {
			Gamemanager.activePlayer = Gamemanager.players[1];
			Gamemanager.passivePlayer = Gamemanager.players[0];
		} else {
			Gamemanager.activePlayer = Gamemanager.players[0];
			Gamemanager.passivePlayer = Gamemanager.players[1];
		}
	}

	static startNewGame() {
		let player1 = new Player("player1", Gamemanager.startFleet());
		Gamemanager.players.push(player1);
		let CPU = new Player("Otto", Gamemanager.startFleet());
		Gamemanager.players.push(CPU);
		Gamemanager.activePlayer = Gamemanager.players[0];
		Gamemanager.passivePlayer = Gamemanager.players[1];

		Gamemanager.deployRandomShips();

		DOMHandler.printGameboard(Gamemanager.activePlayer.gameboard.board);
		DOMHandler.printOpponentsGameboard(Gamemanager.passivePlayer.gameboard.opponentsBoard());
	}

	static gameOver() {
		console.log("gameover");
	}

	static deployRandomShips() {
		Gamemanager.players.forEach((player) => {
			player.ships.forEach((ship) => {
				player.gameboard.placeShipRandom(ship);
			});
		});
	}

	static handleClick(ship) {
		let shipID = ship.getAttribute("data-id");
		let endTurn = false;

		while (endTurn === false) {
			if (Gamemanager.activePlayer.fireShot(shipID)) {
				DOMHandler.clearOpponendGameboard();
				DOMHandler.printOpponentsGameboard(Gamemanager.passivePlayer.gameboard.opponentsBoard());

				if (Gamemanager.passivePlayer.gameboard.allShipsSunk()) {
					endTurn = true;

					Gamemanager.gameOver();
				}

				return;
			} else {
				endTurn = true;
			}
		}

		DOMHandler.clearOpponendGameboard();
		DOMHandler.printOpponentsGameboard(Gamemanager.passivePlayer.gameboard.opponentsBoard());
	}
}
