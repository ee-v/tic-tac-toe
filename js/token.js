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
        this.domElement.setAttribute('data-state', value);
    }

    setIndex(number) {
        if (typeof number !== 'number') {
            throw new Error("Invalid index value");
        }
        this.index = number;
        this.domElement.setAttribute('data-index', number);
    }

    setWin(index) {
        this.domElement.classList.add('board__box--win');
        this.setIndex(index);
    }

    reset() {
        this.setState(null);
        this.setIndex(0);
        this.domElement.classList.remove('board__box--win');
    }
}
