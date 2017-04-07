/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/



window.findNRooksSolution = function(n) {
  var newBoard = new Board({n: n});
  var nextSpace = function(rI, cI, n) {
    if (cI === n - 1) {
      rI += 1;
      cI = 0;
    } else {
      cI += 1;
    }
    return [rI, cI];
  }

  var recurse = function(board, rN, rI, cI) {
    if (rN !== n) {
      board.togglePiece(rI, cI);
      if (!board.hasAnyRooksConflicts()) {
        rN++
      } else {
        board.togglePiece(rI, cI);
      }
      var newIndices = nextSpace(rI, cI, n);
    } else {
      return board.rows();
    }
    return recurse(board, rN, newIndices[0], newIndices[1])
  }
  var solution = recurse(newBoard, 0, 0, 0);
  return solution;
};


window.countNRooksSolutions = function(n) {
  var counter = 0;
  var newBoard = new Board({n: n});
  var nextSpace = function(rI, cI, n) {
    if (cI === n - 1) {
      rI += 1;
      cI = 0;
    } else {
      cI += 1;
    }
    return [rI, cI];
  };

  var recurse = function(board, rN, rI, cI) {
    if (rN === n) {
      counter++;
      return;
    }
    if (rI > n - 1) {
      return;
    } else {
      board.togglePiece(rI, cI);
      if (!board.hasAnyRooksConflicts()) {
        rN++;
        var newIndices = nextSpace(rI, cI, n);
        recurse(board, rN, newIndices[0], newIndices[1]);
        board.togglePiece(rI, cI);
        rN--;
        recurse(board, rN, newIndices[0], newIndices[1]);
      } else {
        board.togglePiece(rI, cI);
        var newIndices = nextSpace(rI, cI, n);
        recurse(board, rN, newIndices[0], newIndices[1]);
      }
    }
  };
  recurse(newBoard, 0, 0, 0);
  return counter;
};

window.nextSpace = function(rI, cI, n) {
  if (cI === n - 1) {
    rI += 1;
    cI = 0;
  } else {
    cI += 1;
  }
  return [rI, cI];
};

window.findNQueensSolution = function(n) {
  var newBoard = new Board({n: n});
  var recurse = function (board, qN, rowIndex, colIndex) {
    if (qN === n) {
      return board.rows(); 
    }
    if (rowIndex > n - 1) {
      return;
    } else {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasAnyQueensConflicts()) {
        qN += 1; 
        var newIndices = this.nextSpace(rowIndex, colIndex, n);      //
        var success = recurse(board, qN, newIndices[0], newIndices[1]);
        if (success) {
          return board.rows();
        }
        board.togglePiece(rowIndex, colIndex);
        qN--;
        return recurse(board, qN, newIndices[0], newIndices[1]);    
      } else {
        board.togglePiece(rowIndex, colIndex);
        var newIndices = this.nextSpace(rowIndex, colIndex, n);
        return recurse(board, qN, newIndices[0], newIndices[1]);
      }
    }  
    return recurse(board, qN, newIndices[0], newIndices[1]);
  };
  var solution = recurse(newBoard, 0, 0, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 

  var newBoard = new Board({n: n});
  var recurse = function (board, qN, rI, cI) {
    if (qN === n) {
      solutionCount++;
      return;
    }
    if (rI > n - 1) {
      return;
    } else {
      board.togglePiece(rI, cI);
      if (!board.hasAnyQueensConflicts()) {
        qN += 1; 
        var newIndices = this.nextSpace(rI, cI, n);      //
        recurse(board, qN, newIndices[0], newIndices[1]);
        board.togglePiece(rI, cI);
        qN--;
        recurse(board, qN, newIndices[0], newIndices[1]);    
      } else {
        board.togglePiece(rI, cI);
        var newIndices = this.nextSpace(rI, cI, n);
        recurse(board, qN, newIndices[0], newIndices[1]);
      } 
    }  
  };
  recurse(newBoard, 0, 0, 0);
  return solutionCount;
};


