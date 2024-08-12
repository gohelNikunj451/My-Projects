let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let turnO = true;
let newBtn = document.querySelector("#newGame");
let msg = document.querySelector("#winnerName");
let count = 0;
let CountWinStr = localStorage.getItem('CountWin');
let countWin;
if (CountWinStr != undefined) {
     countWin = JSON.parse(CountWinStr);
} else {
     countWin = {
        Xcount: 0,
        Ocount: 0,
        tie: 0,
    }
}


const winPattern = [ // winnig possible pattern
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
resetBtn.addEventListener("click", () => { // reset button action
    reset();
})
const reset = () => { // reset button process elements
    turnO = true;
    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
    msg.innerText = "";
    count = 0;
    countWin.Xcount = 0;
    countWin.Ocount = 0;
    countWin.tie = 0;
    scoreBord();


}
newBtn.addEventListener("click", () => {
    turnO = true;
    for (let box of boxes) {
        box.innerHTML = "";
        box.disabled = false;
    }
    msg.innerText = "";
    count = 0;
})
boxes.forEach((box) => { // for click and which text are show O or X
    box.addEventListener("click", () => {


        if (turnO) {
            box.innerHTML = "O";
            turnO = false;
        }
        else {
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWinner(box);
        scoreBord();


    })
})

const checkWinner = (box) => { // for check winner
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                console.log("Winner");
                showWinner(pos1);
                break;
            }
            else if (count == 10) {
                tieGame();
                break;
            }

        }

    }

}
const showWinner = (winner) => {
    msg.innerHTML = `Winner is ${winner}`; // if winner then disable all button and show msg
    if (winner == "O") countWin.Ocount++;
    else countWin.Xcount++;
    scoreBord();


    disableBtn();
}
const tieGame = () => {
    msg.innerHTML = `Game is tie`;

    countWin.tie++;
    count = 0;
    scoreBord();


}
const scoreBord = () => {
    localStorage.setItem('CountWin', JSON.stringify(countWin))
    document.querySelector(".Xscore").innerHTML = `X : ${countWin.Xcount}`;
    document.querySelector(".Oscore").innerHTML = `O : ${countWin.Ocount}`;
    document.querySelector(".tie").innerHTML = `tie : ${countWin.tie}`;
}
const disableBtn = () => { // for disabled button
    for (let box of boxes) {
        box.disabled = true;
    }
}