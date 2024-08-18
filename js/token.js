class Token {
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
        if (value !== 'X' && value !== 'O' && value !== null) {
            throw new Error("Invalid state value");
        }
        this.state = value;
        this.domElement.setAttribute('data-state', value);
    }

    setIndex(number) {
        if (typeof number !== 'number' || number < 0) {
            throw new Error("Invalid index value");
        }
        this.index = number;
        this.domElement.setAttribute('data-index', number);
    }

    setWin() {
        this.domElement.classList.add('board__box--win');
    }

    reset() {
        this.setState(null);
        this.setIndex(null);
        this.domElement.classList.remove('board__box--win');
    }
}
