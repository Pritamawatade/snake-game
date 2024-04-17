// game function
let inputdir = { x: 0, y: 0 };
let foodsound = new Audio("../assets/food.wav");
let gameover = new Audio("../assets/gameover.wav");
let musicSound = new Audio("../assets/gameon.wav");
let movesound = new Audio("../assets/move.mp3");
let speed = 9;
let lastPaintTime = 0;
let score = 0;
let snakearr = [{ x: 13, y: 15 }];

food = { x: 6, y: 10 };

// game function

function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isColide(snake) {
  for (let i = 1; i < snakearr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  // part1 : updating the snake location

  if (isColide(snakearr)) {
    gameover.play();
    musicSound.pause();
    inputdir = { x: 0, y: 0 };
    alert("Game over. press anykey to play again");

    snakearr = [{ x: 13, y: 15 }];
    score = 0;
    musicSound.play();
  }

  //if you sanke  ate the food increase the score and reposition the food

  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    foodsound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      HIscorebox.innerHTML = "HIscore : " + hiscoreval;
    }
    scorebox.innerHTML = "Score: " + score;
    snakearr.unshift({
      x: snakearr[0].x + inputdir.x,
      y: snakearr[0].y + inputdir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // moving the snake

  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }

  snakearr[0].x += inputdir.x;
  snakearr[0].y += inputdir.y;

  // part2 : display the the location of the snake and its food
  // display the snake
  board.innerHTML = "";
  snakearr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //display the food element

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");

  board.appendChild(foodElement);
}

// main logic starts here

musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  HIscorebox.innerHTML = "Hiscore : " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputdir = { x: 0, y: 1 }; //start the game
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      inputdir.y = -1;
      inputdir.x = 0;
      console.log("ArrowUp");
      break;
    case "ArrowDown":
      inputdir.y = 1;
      inputdir.x = 0;
      console.log("Arrowdown");
      break;
    case "ArrowLeft":
      inputdir.x = -1;
      inputdir.y = 0;
      console.log("Arrowleft");
      break;
    case "ArrowRight":
      inputdir.x = 1;
      inputdir.y = 0;
      console.log("Arrowright");
      break;
    default:
      break;
  }
});
