import Gameboard from "../src/factories/Gameboard";
import Gamemanager from "./ Gamemanager";

export default class DOMHandler {
	static printGameboard(board) {
		const gameBoard = document.getElementById("board");
		const shipBoard = document.createElement("div");
		shipBoard.classList = "shipboard";

		board.forEach((element) => {
			let newField = document.createElement("div");
			newField.classList.add("field");

			if (element.hasShip === true) {
				newField.classList.add("occupied");
			}
			shipBoard.appendChild(newField);
		});
		gameBoard.appendChild(shipBoard);
	}

	static printOpponentsGameboard(board) {
		let divID = 0;

		const gameBoard = document.getElementById("board");
		const opponenGameboard = document.createElement("div");
		opponenGameboard.classList.add("opponend");
		opponenGameboard.setAttribute("id", "opponend-board");

		board.forEach((element) => {
			let newField = document.createElement("div");
			newField.classList.add("field");
			newField.dataset.id = divID;
			newField.addEventListener("click", (e) => {
				Gamemanager.handleClick(e.target);
			});

			if (element === "hit") {
				newField.classList.add("hit");
			}
			if (element === "miss") {
				newField.classList.add("miss");
			}
			if (element === "empty") {
				newField.classList.add("empty");
			}
			if (element === "ship") {
				newField.classList.add("ship");
			}
			opponenGameboard.appendChild(newField);
			divID++;
		});
		gameBoard.appendChild(opponenGameboard);
	}

	static clearOpponendGameboard() {
		const opponendGameboard = document.getElementById("opponend-board");
		opponendGameboard.remove();
	}

	static setName() {
		let name = document.getElementById("player-name").value;
		const nameField = document.getElementById("p1name");

		nameField.textContent = name;
		return name;
	}

	static closeNewGamePopup() {
		let popup = document.getElementById("new-game-popup");
		popup.style.display = "none";
	}
}
