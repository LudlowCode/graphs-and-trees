/**
 * Template for BST node, and by extension a binary search tree itself 
 * (which is simply a collection of nodes.)
 * @author Dave Edwards
 */
class BinarySearchTreeNode {
    constructor(nodeData, leftChild, rightChild) {
        this.nodeData = nodeData;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
    /**
     * A recursive method to append a node to the subtree of which this BinarySearchTreeNode is the root.
     * @param {BinarySearchTreeNode} otherNode The node to be added to the tree structure.
     */
    appendNode(otherNode) {
        if (otherNode.nodeData < this.nodeData) {
            if (this.leftChild == null) {
                this.leftChild = otherNode;
            }
            else {
                this.leftChild.appendNode(otherNode);
            }
        }
        else {
            if (this.rightChild == null) {
                this.rightChild = otherNode;
            }
            else {
                this.rightChild.appendNode(otherNode);
            }
        }
    }
}

/**
 * Randomize array in-place using Durstenfeld shuffle algorithm:
 * Make the final item a randomly chosen one (by swapping), repeat with the (n-1)th item
 * @param {array} array to be shuffled in place.
 */
function shuffleArray(array) {
    //Start nextPos as the final index of the array. Reduce it by 1 each loop
    for (var nextPos = array.length - 1; nextPos > 0; nextPos--) {
        var randomPos = Math.floor(Math.random() * (nextPos + 1));
        //Swap a randomly picked item with the one at nextPos
        [array[nextPos], array[randomPos]] = [array[randomPos], array[nextPos]];
    }
    console.log(array);
}

/**
 * Creates a binary search tree from an array of comarable terms.
 * @param {array} array of items to become nodes in a BST.
 * @return {BinarySearchTreeNode} the root node of the BST.
 */
function createBST(array) {
    shuffleArray(array);
    root = new BinarySearchTreeNode(array.pop(), null, null);
    while (array.length > 0) {
        root.appendNode(new BinarySearchTreeNode(array.pop(), null, null));
    }
    return root;
}

function inOrderTraverse(nodeBST) {
    if (nodeBST != null) {
        inOrderTraverse(nodeBST.leftChild);
        console.log(nodeBST.nodeData);
        inOrderTraverse(nodeBST.rightChild);
    }
}

function preOrderTraverse(nodeBST) {
    if (nodeBST != null) {
        console.log(nodeBST.nodeData);
        preOrderTraverse(nodeBST.leftChild);
        preOrderTraverse(nodeBST.rightChild);
    }
}

function postOrderTraverse(nodeBST) {
    if (nodeBST != null) {
        preOrderTraverse(nodeBST.leftChild);
        preOrderTraverse(nodeBST.rightChild);
        console.log(nodeBST.nodeData);

    }
}

/**
 * Creates a JSON object for use by https://fperucic.github.io/treant-js/
 * @param {BinarySearchTreeNode} rootBSTNode 
 */
function createJSONTreeForWebFromRoot(nodeBST) {
    //Start JSON
    simple_chart_config = {
        chart: {
            container: "#tree-simple"
        },


        nodeStructure: {
            /*text: { name: String(rootBSTNode.nodeData) },
            children: [
                {
                    text: { name: "First child" }
                },
                {
                    text: { name: "Second child" }
                }
            ]*/
        }
    };
    simple_chart_config.nodeStructure.text = { name: String(nodeBST.nodeData) };
    //If node has any children
    if (nodeBST.leftChild != null || nodeBST.rightChild != null) {
        //Add a children property (array)
        simple_chart_config.nodeStructure.children = [];
        if (nodeBST.leftChild != null) {
            simple_chart_config.nodeStructure.children.push(appendJSONNodeStructureForWebFromBSTNode(nodeBST.leftChild));
        }
        if (nodeBST.rightChild != null) {
            simple_chart_config.nodeStructure.children.push(appendJSONNodeStructureForWebFromBSTNode(nodeBST.rightChild));
        }
    }
    return simple_chart_config;

}


/**
 * Creates a JSON object for use by https://fperucic.github.io/treant-js/
 * text: { name: String(rootBSTNode.nodeData) },
            children: [
                {
                    text: { name: "First child" }
                },
                {
                    text: { name: "Second child" }
                }
            ]
 * @param {BinarySearchTreeNode} rootBSTNode 
 */
function appendJSONNodeStructureForWebFromBSTNode(nodeBST) {
    stringJSON = "text: {name: " + String(nodeBST.nodeData) + "}";


    if (nodeBST.leftChild != null || nodeBST.rightChild != null) {
        //Add a children property (array)
        stringJSON += ",children: [{";

        if (nodeBST.leftChild != null) {
            stringJSON += appendJSONNodeStructureForWebFromBSTNode(nodeBST.leftChild) + "}";
            if (nodeBST.rightChild != null) stringJSON += ", {";
        }
        if (nodeBST.rightChild != null) {
            stringJSON += appendJSONNodeStructureForWebFromBSTNode(nodeBST.rightChild) + "}";
        }
        stringJSON += "]";
    }
    return stringJSON;
}

//Testing
{
    let array = [1, 2, 14, 0, -3, 4, 15];
    let newRoot = createBST(array);

    console.table(newRoot);

    console.log("In reverse order:");
    reverseInOrderTraverse(newRoot);
    console.log("");

    console.log("In order:");
    inOrderTraverse(newRoot);
    console.log("");

    console.log("Pre-order:");
    preOrderTraverse(newRoot);
    console.log("");

    console.log("Post-order:");
    postOrderTraverse(newRoot);
    console.log("");

    // thing = createJSONTreeForWebFromRoot(newRoot);
    // console.log(JSON.stringify(thing));//consider JSON
}
