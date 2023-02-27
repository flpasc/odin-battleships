import Gamemanager from "./ Gamemanager";
import DOMHandler from "./DOMHandler";

export const gameOverPrompt = () => {
	const board = document.getElementById("board");
	let popup = document.createElement("div");
	popup.id = "game-over-prompt";

	let gameOverMessage = document.createElement("h2");
	gameOverMessage.textContent = "GAME OVER";
	popup.appendChild(gameOverMessage);

	let replayButton = document.createElement("button");
	replayButton.textContent = "Play Again!";
	replayButton.addEventListener("click", () => {
		console.log("restart broo");
		Gamemanager.resetGame();
		Gamemanager.startNewGame();
	});
	popup.appendChild(replayButton);

	board.appendChild(popup);
};
