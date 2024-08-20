import { characterPlayerOne, characterPlayerTwo } from './constants.js';

const checkRowsWinner = (board, actualPlayer) => {
    return board.some((row, rowIndex) => {
        const isWinningRow = row.every((box) => box.state === actualPlayer);
        if (isWinningRow) {
            board[rowIndex].forEach((box, index) => box.setWin(index + 1));
            return true;
        }
        return false;
    });
}

const checkColumnsWinner = (board, actualPlayer) => {
    for (let columnIndex = 0; columnIndex < 3; columnIndex += 1) {
        const isWinningColumn = board.every((row) => row[columnIndex].state === actualPlayer);
        if (isWinningColumn) {
            board.forEach((row, index) => row[columnIndex].setWin(index + 1));
            return true;
        }
    }
    return false;
}

const setDiagonalWin = (board, winningBoxes) => {
    board.forEach((row, rowIndex) => {
        row.forEach((box, columnIndex) => {
            const isWinningBox = winningBoxes.some(([winningRowIndex, winningColumnIndex]) => winningRowIndex === rowIndex && winningColumnIndex === columnIndex);
            if (isWinningBox) {
                box.setWin(rowIndex + 1);
            }
        });
    });
};

const getDiagonalWinningBoxes = (board, actualPlayer, getColumnIndex) => {
    const winningBoxes = []
    const isWinningDiagonal = board.every((row, index) => {
        const columnIndex = getColumnIndex(index);
        if (row[columnIndex].state === actualPlayer) {
            winningBoxes.push([index, columnIndex]);
            return true;
        }
        return false;
    });
    return { winningBoxes, isWinningDiagonal };
}

const checkDiagonalsWinner = (board, actualPlayer) => {
    const leftWinning = getDiagonalWinningBoxes(board, actualPlayer, (index) => index);

    const lastIndex = board.length - 1;
    const rightWinning = getDiagonalWinningBoxes(board, actualPlayer, (index) => lastIndex - index);

    const diagonalsResult = [leftWinning, rightWinning];
    const winningDiagonal = diagonalsResult.find((result) => result.isWinningDiagonal);
    if (winningDiagonal) {
        setDiagonalWin(board, winningDiagonal.winningBoxes);
        return true;
    }
    return false;
}

export default class Game {
    constructor() {
        this._moves = 0;
        this._actualPlayer = characterPlayerOne;
        this._isThereWinner = false;
    }

    get moves() {
        return this._moves;
    }

    get actualPlayer() {
        return this._actualPlayer;
    }

    get isThereWinner() {
        return this._isThereWinner;
    }

    addMove() {
        this._moves += 1;
    }

    switchTurn() {
        this._actualPlayer = this.actualPlayer === characterPlayerOne ? characterPlayerTwo : characterPlayerOne;
    }

    checkWinner(board) {
        const rowsResult = checkRowsWinner(board, this.actualPlayer);
        const columnsResult = checkColumnsWinner(board, this.actualPlayer);
        const diagonalsResult = checkDiagonalsWinner(board, this.actualPlayer);
        this._isThereWinner = rowsResult || columnsResult || diagonalsResult;
    }

    reset() {
        this._moves = 0;
        this._actualPlayer = characterPlayerOne;
        this._isThereWinner = false;
    }
}