import { stateAttributeName, indexAttributeName, winClassName } from './constants.js';

export default class Token {
    constructor(element) {
        this.domElement = element;
        this.reset();
    }

    getState() {
        return this.state;
    }

    getIndex() {
        return this.index;
    }

    setState(value) {
        this.state = value;
        this.domElement.setAttribute(stateAttributeName, value);
    }

    setIndex(number) {
        if (typeof number !== 'number') {
            throw new Error("Invalid index value");
        }
        this.index = number;
        this.domElement.setAttribute(indexAttributeName, number);
    }

    setWin(index) {
        this.domElement.classList.add(winClassName);
        this.setIndex(index);
    }

    reset() {
        this.setState(null);
        this.setIndex(0);
        this.domElement.classList.remove(winClassName);
    }
}
