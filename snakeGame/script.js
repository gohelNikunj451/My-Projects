console.log("hello world");

// game constants & variables
let gameBox = document.querySelector(".gameBox");

const foodSound = new Audio("music\\food.mp3");
const gameOverSound = new Audio("music\\gameover.mp3");
const moveSound = new Audio("music\\move.mp3");
const bgMusic = new Audio("music\\music.mp3");

let scoreBoard = document.querySelector(".score");
let hsBoard = document.querySelector(".hsBoard");
let score = 0;
let hsValue = 0;
let hs = localStorage.getItem("highScore");
if (hs == null) {
  hsValue = 0;
  localStorage.setItem("highScore", JSON.stringify(hsValue));
} else {
  hsValue = JSON.parse(hs);
}
let speed = 5;
let lastPaintTime = 0;

let easyBtn = document.querySelector("#easyBtn");
let hardBtn = document.querySelector("#hardBtn");
let extBtn = document.querySelector("#extreamBtn");
let welcomeBox = document.querySelector(".welcomeBox");

let gameOverBox = document.querySelector(".gameOverBox");

let snackArr = [
  // snack position array
  { x: 10, y: 10 }, // position of snack in object in array for postion of snack
];
let food = { x: 9, y: 2 }; // food object
let inputDir = { x: 0, y: 0 }; // update key track object

// game functions

hsBoard.innerHTML = `High Score : ${hsValue}`;

function mainStart() {
  function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime)
  }
  function isCollied(snackArr) {
    for (let i = 1; i < snackArr.length; i++) {
      if (snackArr[i].x === snackArr[0].x && snackArr[i].y === snackArr[0].y) {
        return true;
      }
    }
    if (
      snackArr[0].x >= 18 ||
      snackArr[0].x <= 0 ||
      snackArr[0].y >= 18 ||
      snackArr[0].y <= 0
    ) {
      return true;
    }
    return false;
  }
  function gameEngine() {
    // part 1 : updating the snack food & array
    // bgMusic.play();
    scoreBoard.innerHTML = `Score : ${score}`;
    hsBoard.innerHTML = `High Score : ${hsValue}`;

    // Game over
    if (isCollied(snackArr)) {
      gameOverSound.play();
      bgMusic.pause();
      inputDir = { x: 0, y: 0 };
      score = 0;
      gameOverBox.style.display = "block";
      welcomeBox.style.display = "flex";

      snackArr = [{ x: 10, y: 10 }];
    }
    // if you eaten food than increament snake and regenerate the food
    if (snackArr[0].x == food.x && snackArr[0].y == food.y) {
      foodSound.play();
      score++;
      if (score > hsValue) { // upgrade high score
        hsValue = score;
        localStorage.setItem("highScore", JSON.stringify(hsValue));
      }
      console.log(score);
      snackArr.unshift({
        x: snackArr[0].x + inputDir.x,
        y: snackArr[0].y + inputDir.y,
      });
      //food position
      let a = 2;
      let b = 16;
      food = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random()),
      };
    }

    //part 2 : rendering the snack food & size
    for (let i = snackArr.length - 2; i >= 0; i--) {
      snackArr[i + 1] = { ...snackArr[i] };
    }
    snackArr[0].x += inputDir.x;
    snackArr[0].y += inputDir.y;

    gameBox.innerHTML = "";

    snackArr.forEach((e, index) => {
      // display snake
      snackElement = document.createElement("div");

      snackElement.style.gridRowStart = e.y;
      snackElement.style.gridColumnStart = e.x;

      if (index === 0) {
        snackElement.classList.add("head");
      } else {
        snackElement.classList.add("snack");
      }
      gameBox.appendChild(snackElement);

      // display food
      foodElement = document.createElement("div");

      foodElement.style.gridRowStart = food.y;
      foodElement.style.gridColumnStart = food.x;

      foodElement.classList.add("food");
      gameBox.appendChild(foodElement);
    });
  }

  // main logic starts here
  hs = localStorage.getItem("highScore");
  if (hs == null) {
    hsValue = 0;
    localStorage.setItem("highScore", JSON.stringify(hsValue));
  } else {
    hsValue = JSON.parse(hs);
  }

  window.requestAnimationFrame(main); // Start

  window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 };
    gameOverBox.style.display = "none";
    bgMusic.play();
    welcomeBox.style.display = "none";
    switch (e.key) {
      case "w":
        moveSound.play();
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;
      case "s":
        moveSound.play();
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
      case "a":
        moveSound.play();
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
      case "d":
        moveSound.play();
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
      default:
        console.log("unknow");
        break;
    }
  });
}

easyBtn.addEventListener("click", () => {
  speed = 5;
  mainStart();
  gameOverBox.style.display = "none";
  bgMusic.play();
  welcomeBox.style.display = "none";
})
hardBtn.addEventListener("click", () => {
  speed = 10;
  mainStart();
  bgMusic.play();
  gameOverBox.style.display = "none";
  welcomeBox.style.display = "none";

})
extBtn.addEventListener("click", () => {
  speed = 15;
  bgMusic.play();
  gameOverBox.style.display = "none";
  welcomeBox.style.display = "none";
  mainStart();
})