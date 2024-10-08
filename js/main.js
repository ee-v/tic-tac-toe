import Board from './board.js';
import Game from './game.js';

(() => {
  const textPlayer = document.getElementById('textPlayer');
  const btnNewGame = document.getElementById('btnNewGame');
  const myBoard = new Board();
  const game = new Game();

  const reset = () => {
    myBoard.clean();
    game.reset();
    textPlayer.innerText = `Es turno del jugador\n${game.actualPlayer}`;
  }

  myBoard.onBoxClick((box) => {
    if (game.isThereWinner) { return; }
    if (box.state !== null) { return; }
    box.state = game.actualPlayer;
    game.addMove();
    if (game.moves >= 5) {
      game.checkWinner(myBoard.board);
      if (game.isThereWinner) {
        textPlayer.innerText = `El ganador es el jugador\n${game.actualPlayer}`;
        return;
      }
    }
    if (!game.isThereWinner && game.moves === 9) {
      textPlayer.innerHTML = 'Sin ganador :(';
      return;
    }
    game.switchTurn();
    textPlayer.innerText = `Es turno del jugador\n${game.actualPlayer}`;
  });

  btnNewGame.addEventListener('click', reset);

  reset();
})();