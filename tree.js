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

    insertNode(value, node = this.root) {
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

    deleteItem(value, node = this.root) {
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
    levelOrder(callback = [], queue = [this.root]) {
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
            this.levelOrder(callback, queue);
        }
        return callback;
    }

    // [left][root][right]
    inOrder(callback = [], node = this.root) {
        if (node.left) {
            this.inOrder(callback, node.left);
        }

        if (typeof callback === 'function') {
            callback(node);
        } else {
            callback.push(node.value);
        }

        if (node.right) {
            this.inOrder(callback, node.right);
        }
        return callback;
    }

    // [root][left][right]
    preOrder(callback = [], node = this.root) {
        if (typeof callback === 'function') {
            callback(node);
        } else {
            callback.push(node.value);
        }

        if (node.left) {
            this.preOrder(callback, node.left);
        }

        if (node.right) {
            this.preOrder(callback, node.right);
        }
        return callback;
    }

    // [left][right][root]
    postOrder(callback = [], node = this.root) {
        if (node.left) {
            this.postOrder(callback, node.left);
        }

        if (node.right) {
            this.postOrder(callback, node.right);
        }

        if (typeof callback === 'function') {
            callback(node);
        } else {
            callback.push(node.value);
        }
        return callback;
    }

    height(node = this.root) {
        if (node === null) {
            return 0;
        }
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node = this.root) {
        if (typeof node !== 'object') {
            // if argument not Node, search tree
            node = this.find(node);
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

    isBalanced(node = this.root) {
        if (node === null) {
            return null;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }

        this.isBalanced(node.left);
        this.isBalanced(node.right);
        return true;
    }

    rebalance() {
        this.root = this.buildTree(this.levelOrder());
    }

    // tree print function, provided from Odin Project assignment description
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            console.log('test')
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}