import Token from './token.js';

const createBox = () => {
  const div = document.createElement('div');
  div.classList.add('board__box');
  return new Token(div);
}

const createBoxes = () => {
  let boxes = [];
  for (let i = 1; i < 10; i++) {
    boxes.push(createBox());
  }
  return boxes;
}

const renderBoxes = (board, boxes) => {
  for (let box of boxes) {
    board.append(box.domElement);
  }
}

export default class Board {
  constructor() {
    this.board = document.getElementById('board');
    this.boxes = createBoxes();
    renderBoxes(board, this.boxes);
  }

  getBoard = () => {
    const board = [];
    for (let i = 0; i < 9; i += 3) {
      board.push(this.boxes.slice(i, i + 3));
    }
    return board;
  };

  setBoxClickEvent(customEvent) {
    this.board.addEventListener('click', (event) => {
      const element = event.target;
      const index = Array.prototype.indexOf.call(this.board.children, element);
      customEvent(this.boxes[index]);
    });
  }

  clean() {
    this.boxes.forEach((box) => {
      box.reset();
    });
  }

}