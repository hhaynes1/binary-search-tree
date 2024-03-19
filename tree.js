import Node from './node.js';

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        if (!array.length) {
            return null;
        }

        // sort array
        array = array
            .sort((a, b) => (a - b))
            .filter((value, index) => array.indexOf(value) === index);

        // find the middle
        let middle = Math.floor(array.length / 2);
        let left = array.slice(0, middle);
        let right = array.slice(middle + 1, array.length);

        // create root node
        let rootNode = new Node(array[middle]);
        rootNode.left = this.buildTree(left);
        rootNode.right = this.buildTree(right);

        return rootNode;
    }

    insert(value) {

    }

    deleteItem(value) {

    }

    find(value) {
        let root = this.root;
        while (root !== null) {
            if (value === root.value) {
                return root;
            } else if (value < this.root.value) {
                root = root.left;
            } else if (value > this.root.value) {
                root = root.right;
            }
        }
        return null;
    }
}