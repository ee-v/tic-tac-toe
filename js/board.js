import Token from './token.js';

const createBox = () => {
  const div = document.createElement('div');
  div.classList.add('board__box');
  return new Token(div);
}

const createBoxes = () => {
  const boxes = [];
  for (let i = 1; i < 10; i++) {
    boxes.push(createBox());
  }
  return boxes;
}

const renderBoxes = (board, boxes) => {
  boxes.forEach((box) => board.append(box.domElement));
}

export default class Board {
  constructor() {
    this._board = document.getElementById('board');
    this._boxes = createBoxes();
    renderBoxes(this._board, this._boxes);
  }

  get boxes() {
    return this._boxes;
  }

  get board() {
    const board = [];
    for (let i = 0; i < 9; i += 3) {
      board.push(this.boxes.slice(i, i + 3));
    }
    return board;
  }

  onBoxClick(customEvent) {
    this._board.addEventListener('click', (event) => {
      const element = event.target;
      const index = Array.from(this._board.children).indexOf(element);
      customEvent(this.boxes[index]);
    });
  }

  clean() {
    this.boxes.forEach((box) => {
      box.reset();
    });
  }
}
