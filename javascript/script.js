// game function 


let direction = {x:0,y:0};
let foodsound = new Audio('food.wav');
let gameover = new Audio('gameover.wav');
let musicSound = new Audio('gameon.wav');
let movesound = new Audio('move.wav');
let speed = 2;
let lastPaintTime = 0;
let snakearr = [
    { x:13, y:15}
]


// game function

function main(ctime)
{
    window.requestAnimationFrame(main);
    console.log(ctime);
    if ((ctime - lastPaintTime)/1000 < 1/speed){
        return;

    }
    lastPaintTime = ctime;
    gameEngine();


}

function gameEngine(){
    // part1 : updating the snake location


    //part2 : display the the location of the snake and its food
     board.innerHTML = "";
    snakearr.forEach((e, index)=> {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('food');
        board.appendChild(snakeElement);
    })


}

window.requestAnimationFrame(main);