import { stateAttributeName, indexAttributeName, winClassName, validStates } from './constants.js';

export default class Token {
    constructor(element) {
        this._domElement = element;
        this._state = null;
        this._index = 0;
    }

    get domElement() {
        return this._domElement;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        if (!validStates.includes(value)) {
            throw new TypeError("Invalid state value");
        }
        if (this._state === value) { return; }
        this._state = value;
        this._domElement.setAttribute(stateAttributeName, value);
    }

    get index() {
        return this._index;
    }

    set index(number) {
        if (typeof number !== 'number') {
            throw new Error("Invalid index value");
        }
        if (this._index === number) { return; }
        this._index = number;
        this._domElement.setAttribute(indexAttributeName, number);
    }

    setWin(index) {
        this.index = index;
        this._domElement.classList.add(winClassName);
    }

    reset() {
        this.state = null;
        this.index = 0;
        this._domElement.classList.remove(winClassName);
    }
}
