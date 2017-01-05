'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

class HashTable{
    constructor(){
        this.hash = {};
    }
    set(key, value){
        this.hash[key] = value;
    }
    find(key){
        return this.hash[key] ? true: false;
    }
    get(key){
        return this.hash[key];
    }
}
var hash = new HashTable();

function AImove() {
    var t0 = performance.now()
    var AIColor = 'black';
    var startBoard = tree.root;
    var min = 999;
    var max = -999;
    createChildren(startBoard);

    var futureBoardValues = startBoard.children.map(function(ele) {
        return findBestMoveMaxi(ele, 5, max, min)
    });

    var bestBoards = startBoard.children.reduce(function(accum, cur) {
        if (accum[accum.length - 1].whiteScore > cur.whiteScore) {
            accum = [cur]
        } else if (accum[accum.length - 1].whiteScore === cur.whiteScore) {
            accum.push(cur)
        }

        return accum
    }, [startBoard.children[0]])

    var minVal = Math.min(...futureBoardValues);
    var minInds = futureBoardValues.reduce(function(accum, cur, i) {
        if (cur === minVal) {
            accum.push(i);
        }

        return accum;
    }, [])
    var minInd = minInds[Math.floor(Math.random() * minInds.length)];
    game.move(startBoard.children[minInd].prevMove)
    board.position(game.fen());
    console.log(`time to move is ${performance.now() - t0}`);
}

function createChildren(node) {
    //create fen
    var fen = node.board.fen;
    //check if fen already created;
    if (hash.find(fen)) {
        return hash.get(gen);
    }
    var possibleMoves = node.board.moves();

    if (possibleMoves.length === 0)
        return;

    node.children = []
    // value of each moves
    for (var i = 0; i < possibleMoves.length; i++) {
        var possibleBoard = new Chess(node.board.fen());
        possibleBoard.move(possibleMoves[i]);
        let boardVals = getBoardValues(possibleBoard)

        node.children.push(new Node(possibleMoves[i], possibleBoard, boardVals.whiteScore, boardVals.blackScore))
    }
    //store new node in the hashtbale;
    hash.set(fen, node.children);
}
