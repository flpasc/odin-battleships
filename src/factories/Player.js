import Gamemanager from "../../helper/ Gamemanager";
import Gameboard from "./Gameboard";

export default class Player {
	constructor(name = "Player1", ships = [], gameboard) {
		this.name = name;
		this.ships = ships;
		this.gameboard = new Gameboard();
		this.active = false;
	}

	fireShot(location, player) {
		player.gameboard.assignHit(location);
		if (player.gameboard.checkIfHit(location)) return true;
	}
}
