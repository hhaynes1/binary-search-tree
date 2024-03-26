import Tree from './tree.js';

(() => {
    let testData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    let tree = new Tree(testData);
    console.log(tree);
    tree.prettyPrint();

    console.log('\nINSERT');
    tree.insert(42);
    tree.insert(6);
    tree.prettyPrint();

    console.log('\nDELETE');
    tree.deleteItem(1, tree.root);
    tree.deleteItem(6, tree.root);
    tree.deleteItem(7, tree.root);
    tree.deleteItem(8, tree.root);
    tree.deleteItem(9, tree.root);
    tree.deleteItem(4, tree.root);
    tree.prettyPrint();

    console.log('\nFIND');
    console.log(tree.find(1));
    console.log(tree.find(2));
    console.log(tree.find(3));

    console.log('\nLEVEL ORDER');
    tree.levelOrder((node) => { console.log(node.value) });
    console.log(tree.levelOrder());
    tree.prettyPrint();

    console.log('\nINORDER');
    tree.inOrder((node) => { console.log(node.value) });
    console.log(tree.inOrder());
    tree.prettyPrint();

    console.log('\nPREORDER');
    tree.preOrder((node) => { console.log(node.value) });
    console.log(tree.preOrder());
    tree.prettyPrint();

    console.log('\nPOSTORDER');
    tree.postOrder((node) => { console.log(node.value) });
    console.log(tree.postOrder());
    tree.prettyPrint();

    console.log('\nHEIGHT');
    console.log(tree.height());

    console.log('\nDEPTH');
    console.log(tree.depth());
    console.log(tree.depth(324));

    console.log('\nISBALANCED');
    console.log(tree.isBalanced());

    console.log('\nREBALANCE');
    tree.rebalance();
    tree.prettyPrint();
});

// "Tie it all together" Section
(() => {
    // Generate random numbers <100
    let treeData = [];
    for (let i = 0; i < 100; i++) {
        treeData.push(Math.floor(Math.random() * 100))
    }
    console.log(treeData);

    // Create Tree
    let testTree = new Tree(treeData);
    console.log(testTree);
    testTree.prettyPrint();

    console.log('\nISBALANCED');
    console.log(testTree.isBalanced());

    // print in all orders
    console.log('\nLEVEL ORDER');
    console.log(testTree.levelOrder());
    testTree.prettyPrint();

    console.log('\nINORDER');
    console.log(testTree.inOrder());
    testTree.prettyPrint();

    console.log('\nPREORDER');
    console.log(testTree.preOrder());
    testTree.prettyPrint();

    console.log('\nPOSTORDER');
    console.log(testTree.postOrder());
    testTree.prettyPrint();

    // unbalance the tree
    for (let i = 0; i < 25; i++) {
        testTree.insert(Math.floor(Math.random() * 200) + 100);
    }

    // is it balanced?
    console.log('\nUNBALANCED?')
    console.log(!testTree.isBalanced());
    testTree.prettyPrint();

    // rebalance
    testTree.rebalance();
    console.log('\nREBALANCED?');
    console.log(testTree.isBalanced());
    testTree.prettyPrint();

    // print in all orders
    console.log('\nLEVEL ORDER');
    console.log(testTree.levelOrder());
    testTree.prettyPrint();

    console.log('\nINORDER');
    console.log(testTree.inOrder());
    testTree.prettyPrint();

    console.log('\nPREORDER');
    console.log(testTree.preOrder());
    testTree.prettyPrint();

    console.log('\nPOSTORDER');
    console.log(testTree.postOrder());
    testTree.prettyPrint();
})();