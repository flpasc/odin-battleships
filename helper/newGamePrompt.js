import Gamemanager from "./ Gamemanager";
import DOMHandler from "./DOMHandler";

export const newGamePrompt = () => {
	const board = document.getElementById("board");
	let popup = document.createElement("div");
	popup.id = "new-game-popup";

	let welcomeText = document.createElement("div");
	welcomeText.textContent = "Hello PirRrate!! Enter name to start the game";
	popup.appendChild(welcomeText);

	let playerName = document.createElement("input");
	playerName.placeholder = "Player1";
	playerName.id = "player-name";
	popup.appendChild(playerName);

	let confirmButton = document.createElement("button");
	confirmButton.textContent = "Start";
	confirmButton.addEventListener("click", () => {
		DOMHandler.setName();
		DOMHandler.closeNewGamePopup();
		Gamemanager.startNewGame();
	});

	popup.appendChild(confirmButton);

	board.appendChild(popup);
};
