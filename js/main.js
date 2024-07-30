import Board from './board.js';

(() => {
  const charPlayerOne = 'times';
  const charPlayerTwo = 'circle';

  let player = 1;
  let moves = 0;
  let isThereWinner = false;

  const textPlayer = document.getElementById('textPlayer');
  const board = document.getElementById('board');
  const btnNewGame = document.getElementById('btnNewGame');

  const myBoard = new Board(board);

  const changePlayer = () => {
    player = player === 1 ? 2 : 1;
  };

  const reset = () => {
    player = 1;
    moves = 0;
    isThereWinner = false;
    myBoard.cleanBoard();
    textPlayer.innerText = `Es turno del jugador\n${player}`;
  };

  const getCharacterPlayer = () => (player === 1 ? charPlayerOne : charPlayerTwo);

  const checkForWinner = () => {
    const charPlayer = getCharacterPlayer();
    const rowsResult = myBoard.isRowsWinner(charPlayer);
    const columnsResult = myBoard.isColumnsWinner(charPlayer);
    const diagonalsResult = myBoard.isDiagonalsWinner(charPlayer);
    const result = [rowsResult, columnsResult, diagonalsResult].some((r) => r === true);
    isThereWinner = result;
  };

  myBoard.onBoxClick((box) => {
    if (isThereWinner) { return; }
    if (Board.getBoxState(box) !== '') { return; }
    const charPlayer = getCharacterPlayer();
    Board.setBoxState(box, charPlayer);
    moves += 1;
    if (moves >= 5) {
      checkForWinner();
      if (isThereWinner) {
        textPlayer.innerText = `El ganador es el jugador\n${player}`;
        return;
      }
    }
    if (!isThereWinner && moves === 9) {
      textPlayer.innerHTML = 'Sin ganador :(';
      return;
    }
    changePlayer();
    textPlayer.innerText = `Es turno del jugador\n${player}`;
  });

  btnNewGame.addEventListener('click', () => {
    reset();
  });

  reset();
})();
