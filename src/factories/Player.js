import Gamemanager from "../../helper/ Gamemanager";
import Gameboard from "./Gameboard";

export default class Player {
	constructor(name = "Player1", ships = [], gameboard) {
		this.name = name;
		this.ships = ships;
		this.gameboard = new Gameboard();
		this.active = false;
	}

	fireShot(location) {
		Gamemanager.passivePlayer.gameboard.assignHit(location);
		if (Gamemanager.passivePlayer.gameboard.checkIfHit(location)) return true;
	}
}
