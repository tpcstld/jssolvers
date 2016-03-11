// Game: http://0hn0.com/
// Start point: Immediately after choosing a board size.
var searches = 0;

var gridSize = parseInt(document.getElementById("boardsize").children[0].innerHTML);

var grid = [];
for (var xx = 0; xx < gridSize; xx++) {
  var line = [];
  for (var yy = 0; yy < gridSize; yy++) {
    var element = document.querySelector("[data-x='" + xx + "'][data-y='" + yy + "']");
    var answer = "";
    if (element.children[0].className.indexOf("tile-1") !== -1) {
      answer = "R";
    } else if (element.children[0].className.indexOf("tile-2") !== -1) {
      answer = "B";
      var text = element.children[0].children[0].innerHTML;
      if (text !== "") {
        answer = text;
      }
    }

    line.push(answer);
  }
  grid.push(line);
}

function is_blue(element) {
  return element === "B" || (element !== "" && !isNaN(element));
}

function check_ok(board, x, y) {
  if (board[x][y] === "" || isNaN(board[x][y])) {
    return true;
  }

  var number = parseInt(board[x][y]);
  var total = 0;
  var total_sure = 0;

  var sure = true;
  var index = x - 1;
  while (index >= 0) {
    if (is_blue(board[index][y])) {
      total = total + 1;
      if (sure) {
        total_sure = total_sure + 1;
      }
    } else if (board[index][y] === "") {
      total = total + 1;
      sure = false;
    } else if (board[index][y] === "R") {
      break;
    }
    index = index - 1;
  }

  sure = true;
  index = x + 1;
  while (index < gridSize) {
    if (is_blue(board[index][y])) {
      total = total + 1;
      if (sure) {
        total_sure = total_sure + 1;
      }
    } else if (board[index][y] === "") {
      total = total + 1;
      sure = false;
    } else if (board[index][y] === "R") {
      break;
    }
    index = index + 1;
  }

  sure = true;
  index = y - 1;
  while (index >= 0) {
    if (is_blue(board[x][index])) {
      total = total + 1;
      if (sure) {
        total_sure = total_sure + 1;
      }
    } else if (board[x][index] === "") {
      total = total + 1;
      sure = false;
    } else if (board[x][index] === "R") {
      break;
    }
    index = index - 1;
  }

  sure = true;
  index = y + 1;
  while (index < gridSize) {
    if (is_blue(board[x][index])) {
      total = total + 1;
      if (sure) {
        total_sure = total_sure + 1;
      }
    } else if (board[x][index] === "") {
      total = total + 1;
      sure = false;
    } else if (board[x][index] === "R") {
      break;
    }
    index = index + 1;
  }

  return total >= number && total_sure <= number;
}

function is_valid(board) {
  for (var xx = 0; xx < gridSize; xx++) {
    for (var yy = 0; yy < gridSize; yy++) {
      if (!check_ok(board, xx, yy)) {
        return false;
      }
    }
  }
  return true;
}

function solve(board) {
  searches++;
  if (searches % 1000 == 0) {
    console.log("Num searches:", searches);
  }
  if (!is_valid(board)) {
    return null;
  }

  for (var x = 0; x < gridSize; x++ ) {
    for (var y = 0; y < gridSize; y++ ) {
      var value = board[x][y];
      if (value === "") {
        var result = null;
        board[x][y] = "R";
        result = solve(board);
        if (result !== null) {
          return result;
        }
        board[x][y] = "B";
        result = solve(board);
        if (result !== null) {
          return result;
        }

        board[x][y] = "";
        return null;
      }
    }
  }
  return board;
}

var final_answer = solve(grid);

function triggerMouseEvent(node, eventType) {
  var clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}

for (var xx = 0; xx < gridSize; xx++) {
  for (var yy = 0; yy < gridSize; yy++) {
    var thing = final_answer[xx][yy];
    var element = document.querySelector("[data-x='" + xx + "'][data-y='" + yy + "']");
    if (thing == "B") {
      triggerMouseEvent(element, "mousedown");
    } else if (thing == "R") {
      triggerMouseEvent(element, "mousedown");
      triggerMouseEvent(element, "mousedown");
    }
  }
}
