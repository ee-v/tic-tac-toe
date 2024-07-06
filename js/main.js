'use strict';
import { Board } from './board.js';

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

    myBoard.onBoxClick((box) => {
        if (isThereWinner) { return; }
        if (myBoard.getBoxState(box) !== '') { return; }
        const charPlayer = getCharacterPlayer(player);
        myBoard.setBoxState(box, charPlayer);
        moves++;
        if (moves >= 5) {
            checkForWinner();
            if (isThereWinner) {
                setText(false, player, textPlayer);
                return;
            }
        }
        if (!isThereWinner && moves === 9) {
            textPlayer.innerHTML='Sin ganador :(';
            return;
        }
        changePlayer();
        setText(true, player, textPlayer);
    });

    btnNewGame.addEventListener('click', () => {
        reset();
    });

    const setText = (isTurn, player, elem) => {
        let text = isTurn ? 'Es turno del jugador\n' + player : 'El ganador es el jugador\n' + player;
        elem.innerText = text;
    };

    const changePlayer = () => {
        player = player === 1 ? 2 : 1;
    }

    const reset = () => {
        player = 1;
        moves = 0;
        isThereWinner = false;
        myBoard.cleanBoard();
        setText(true, player, textPlayer)
    };

    const getCharacterPlayer = (player) => {
        return player === 1 ? charPlayerOne : charPlayerTwo;
    }

    const checkForWinner = () => {
        const charPlayer = getCharacterPlayer(player);
        const rowsResult = myBoard.isRowsWinner(charPlayer);
        const columnsResult = myBoard.isColumnsWinner(charPlayer);
        const diagonalsResult = myBoard.isDiagonalsWinner(charPlayer);
        const result = [rowsResult, columnsResult, diagonalsResult].some((r) => r === true);
        isThereWinner = result;
    };

    reset();
})();