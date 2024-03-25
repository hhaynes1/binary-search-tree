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
        if (value < this.root.value) {
            this.insertNode(value, this.root.left);
        } else if (value > this.root.value) {
            this.insertNode(value, this.root.right);
        }
    }

    insertNode(value, node) {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.value) {
            node.left = this.insertNode(value, node.left);
        } else if (value > node.value) {
            node.right = this.insertNode(value, node.right);
        }
        return node;
    }

    deleteItem(value, node) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.value) {
            node.right = this.deleteItem(value, node.right);
        }

        // at node to be deleted
        if (value === node.value) {
            if (node.isLeaf()) {
                return null;
            } else if (node.onlyLeftChild()) {
                return node.left;
            } else if (node.onlyRightChild()) {
                return node.right;
            } else if (node.bothChildren()) {
                // find next largest node (right one, left all the way)
                let nextNode = node.right;
                while (nextNode.left) {
                    nextNode = nextNode.left;
                }
                // replace value with next largest
                node.value = nextNode.value;
                // remove copied node
                node.right = this.removeNode(nextNode.value, node.right);
            }
        }
        return node;
    }

    removeNode(value, node) {
        if (value < node.value) {
            node.left = this.removeNode(value, node.left);
        } else if (value > node.value) {
            node.right = this.removeNode(value, node.right);
        } else if (value === node.value) {
            return node.right ? node.right : null;
        }
        return node;
    }

    find(value) {
        let root = this.root;
        while (root !== null) {
            if (value === root.value) {
                return root;
            } else if (value < root.value) {
                root = root.left;
            } else if (value > root.value) {
                root = root.right;
            }
        }
        return null;
    }

    // BFS (level order traversal)
    // return array of values if no callback
    levelOrder(queue, callback = []) {
        // add children to queue
        if (queue[0].left) {
            queue.push(queue[0].left);
        }
        if (queue[0].right) {
            queue.push(queue[0].right);
        }

        // callback on start of queue
        if (typeof callback === 'function') {
            callback(queue.shift());
        } else {
            callback.push(queue.shift().value);
        }

        // continue until queue empty
        if (queue.length !== 0) {
            this.levelOrder(queue, callback);
        }
        return callback;
    }

    // [left][root][right]
    inOrder(node = null, callback = []) {
        if (node === null) {
            return;
        }

        if (node.left) {
            this.inOrder(node.left, callback);
        }

        if (typeof callback === 'function') {
            callback(node);
        } else {
            callback.push(node.value);
        }

        if (node.right) {
            this.inOrder(node.right, callback);
        }
        return callback;
    }

    // [root][left][right]
    preOrder(node = null, callback = []) {
        if (node === null) {
            return;
        }

        if (typeof callback === 'function') {
            callback(node);
        } else {
            callback.push(node.value);
        }

        if (node.left) {
            this.preOrder(node.left, callback);
        }

        if (node.right) {
            this.preOrder(node.right, callback);
        }
        return callback;
    }

    // [left][right][root]
    postOrder(node = null, callback = []) {
        if (node === null) {
            return;
        }

        if (node.left) {
            this.postOrder(node.left, callback);
        }

        if (node.right) {
            this.postOrder(node.right, callback);
        }

        if (typeof callback === 'function') {
            callback(node);
        } else {
            callback.push(node.value);
        }
        return callback;
    }

    height(node = null) {
        if (node === null) {
            return 0;
        }
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node = null) {
        if (node === null) {
            return;
        }

        let count = 0;
        let root = this.root;
        while (root !== null) {
            if (node.value === root.value) {
                return count;
            } else if (node.value < root.value) {
                count++;
                root = root.left;
            } else if (node.value > root.value) {
                count++;
                root = root.right;
            }
        }
        return null;
    }

    isBalanced() {

    }

    rebalance() {
        this.root = this.buildTree(this.levelOrder([this.root]));
    }
}