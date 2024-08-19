const characterPlayerOne = 'times';
const characterPlayerTwo = 'circle';

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

const setDiagonalClass = (boxes, diagonalBoxes) => {
    boxes.forEach((row, rowIndex) => {
        row.forEach((box, columnIndex) => {
            if (diagonalBoxes.some(([r, c]) => r === rowIndex && c === columnIndex)) {
                box.setWin(rowIndex + 1);
            }
        });
    });
};

const checkDiagonalWinner = (board, actualPlayer) => {
    const diagonalLeftBoxes = [];
    const diagonalRightBoxes = [];

    const isWinningDiagonalLeft = board.every((row, index) => {
        const columnIndex = index;
        if (row[columnIndex].state === actualPlayer) {
            diagonalLeftBoxes.push([index, columnIndex]);
            return true;
        }
        return false;
    });

    const lastIndex = board.length - 1;
    const isWinningDiagonalRight = board.every((row, index) => {
        const columnIndex = lastIndex - index;
        if (row[columnIndex].state === actualPlayer) {
            diagonalRightBoxes.push([index, columnIndex]);
            return true;
        }
        return false;
    });

    if (isWinningDiagonalLeft) {
        setDiagonalClass(board, diagonalLeftBoxes);
        return true;
    }
    if (isWinningDiagonalRight) {
        setDiagonalClass(board, diagonalRightBoxes);
        return true;
    }
    return false;
}

export default class Game {
    constructor() {
        this.moves = 0;
        this.actualPlayer = characterPlayerOne;
        this.isThereWinner = false;
    }

    addMove() {
        this.moves += 1;
    }

    switchTurn() {
        this.actualPlayer = this.actualPlayer === characterPlayerOne ? characterPlayerTwo : characterPlayerOne;
    }

    checkWinner(board) {
        const rowsResult = checkRowsWinner(board, this.actualPlayer);
        const columnsResult = checkColumnsWinner(board, this.actualPlayer);
        const diagonalsResult = checkDiagonalWinner(board, this.actualPlayer);
        this.isThereWinner = [rowsResult, columnsResult, diagonalsResult].some((result) => result === true);
    }

    reset() {
        this.moves = 0;
        this.actualPlayer = characterPlayerOne;
        this.isThereWinner = false;
    }
}