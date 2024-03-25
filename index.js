import Tree from './tree.js';

// tree print function, provided from Odin Project assignment description
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

(() => {
    let testData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    let tree = new Tree(testData);
    console.log(tree);
    prettyPrint(tree.root);

    console.log('\nINSERT');
    tree.insert(42);
    tree.insert(6);
    prettyPrint(tree.root);

    console.log('\nDELETE');
    tree.deleteItem(1, tree.root);
    tree.deleteItem(6, tree.root);
    tree.deleteItem(7, tree.root);
    tree.deleteItem(8, tree.root);
    tree.deleteItem(9, tree.root);
    tree.deleteItem(4, tree.root);
    prettyPrint(tree.root);

    console.log('\nFIND');
    console.log(tree.find(1));
    console.log(tree.find(2));
    console.log(tree.find(3));

    console.log('\nLEVEL ORDER');
    tree.levelOrder([tree.root], (node) => { console.log(node.value) });
    console.log(tree.levelOrder([tree.root]));
    prettyPrint(tree.root);
    
    console.log('\nPREORDER');
    tree.preOrder(tree.root, (node) => { console.log(node.value) });
    console.log(tree.preOrder(tree.root));
    prettyPrint(tree.root);
})();