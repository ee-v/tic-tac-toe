const getBoxes = (board) => {
  const boxes = Array.from(board.getElementsByClassName('board__box'));
  const aux = [];
  for (let i = 0; i < boxes.length; i += 3) {
    aux.push(boxes.slice(i, i + 3));
  }
  return aux;
};

const setEventClick = (board, onClick) => {
  board.addEventListener('click', (event) => {
    const elem = event.target;
    if (!elem.getAttribute('class').includes('board__box')) { return; }
    onClick(elem);
  });
};

const setWinClassToBox = (box) => {
  box.classList.add('board__box--win');
};

const setDiagonalClass = (boxes, diagonalBoxes) => {
  boxes.forEach((row, rowIndex) => {
    row.forEach((box, columnIndex) => {
      if (diagonalBoxes.some(([r, c]) => r === rowIndex && c === columnIndex)) {
        setWinClassToBox(box);
      }
    });
  });
};

export default class Board {
  constructor(board) {
    this.board = board;
    this.boxes = getBoxes(board);
  }

  static setBoxState(box, player) {
    box.setAttribute('data-state', player);
  }

  static getBoxState(box) {
    return box.getAttribute('data-state');
  }

  getBoard() {
    return this.board;
  }

  getValues() {
    return this.boxes.map((row) => row.map((box) => Board.getBoxState(box)));
  }

  isRowsWinner(player) {
    const values = this.getValues();
    return values.some((row, rowIndex) => {
      const isWinningRow = row.every((box) => box === player);
      if (isWinningRow) {
        this.boxes[rowIndex].forEach((box) => setWinClassToBox(box));
        return true;
      }
      return false;
    });
  }

  isColumnsWinner(player) {
    const values = this.getValues();
    for (let columnIndex = 0; columnIndex < 3; columnIndex += 1) {
      const isWinningColumn = values.every((row) => row[columnIndex] === player);
      if (isWinningColumn) {
        this.boxes.forEach((row) => setWinClassToBox(row[columnIndex]));
        return true;
      }
    }
    return false;
  }

  isDiagonalsWinner(player) {
    const values = this.getValues();
    const diagonalLeftBoxes = [];
    const diagonalRightBoxes = [];

    const isWinningDiagonalLeft = values.every((row, index) => {
      const columnIndex = index;
      if (row[columnIndex] === player) {
        diagonalLeftBoxes.push([index, columnIndex]);
        return true;
      }
      return false;
    });

    const lastIndex = values.length - 1;
    const isWinningDiagonalRight = values.every((row, index) => {
      const columnIndex = lastIndex - index;
      if (row[columnIndex] === player) {
        diagonalRightBoxes.push([index, columnIndex]);
        return true;
      }
      return false;
    });

    if (isWinningDiagonalLeft) {
      setDiagonalClass(this.boxes, diagonalLeftBoxes);
      return true;
    }
    if (isWinningDiagonalRight) {
      setDiagonalClass(this.boxes, diagonalRightBoxes);
      return true;
    }
    return false;
  }

  cleanBoard() {
    this.boxes.forEach((row) => {
      row.forEach((box) => {
        Board.setBoxState(box, '');
        box.classList.remove('board__box--win');
      });
    });
  }

  onBoxClick(event) {
    setEventClick(this.board, event);
  }
}
