export default class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    isLeaf() {
        return (!this.left && !this.right) ? true : false;
    }

    onlyLeftChild() {
        return (this.left && !this.right) ? true : false;
    }

    onlyRightChild() {
        return (!this.left && this.right) ? true : false;
    }

    bothChildren() {
        return (this.left && this.right) ? true : false;
    }
}