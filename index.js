// 1.  DECLARE VARIABLES AND INITIALIZE CANVAS

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//speed of the game
let speed=130

//load images
const ground = new Image();
ground.src ="./images/tablero3.png";

const queca = new Image();
queca.src ="./images/queca.png";

const gameOverSinB = new Image();
gameOverSinB.src ="./images/gameOverSinBoton.png"

const gameOverConB = new Image();
gameOverConB.src="/images/gameOverConBoton.png"

const headSnakeDown = new Image();
headSnakeDown.src ="./images/cabeza-azul.png";

const headSnakeRight = new Image();
headSnakeRight.src ="./images/cabeza-derecha.png"

const headSnakeLeft = new Image();
headSnakeLeft.src ="./images/cabeza-izquierda.png"

const headSnakeUp = new Image();
headSnakeUp.src ="./images/cabeza-arriba.png"

const piel = new Image();
piel.src ="./images/piel-azul3.png"

const playAgain = new Image();
playAgain.src ="./images/boton-jugar-de-nuevo.png"


//load audio files

const gameOverSound = new Audio();
gameOverSound.src="./audio/Game Over.mp3"

const turningSound = new Audio();
turningSound.src="/audio/swoosh_22.wav"

const eatingSound = new Audio();
eatingSound.src="./audio/Biting Into Flesh 03.wav"

// create snake
let snake = [];

snake[0]= {
    x: 9*box,
    y: 10*box,
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create score

let score = 0;



// 2. CONTROL THE SNAKE

//control the snake
let d;

document.addEventListener("keydown",direction);

function direction (event) {
    let key=event.keyCode;
    let rotation;

    if(key==37 && d!="RIGHT") {
        d="LEFT";
        turningSound.play();
    }
    else if(key==38 && d!="DOWN") {
        d="UP";
        turningSound.play();

    }
    else if(key==39 && d!="LEFT") {
        d="RIGHT";
        turningSound.play();
    }
    else if(key==40 && d!="UP") {
        d="DOWN";
        turningSound.play();
    }
}


function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
            }
        } 
        return false
    }

// play-again button at the end


let playAgainBtn = document.getElementById("play-again-button")

playAgainBtn.addEventListener('click',restart)

function restart() {
    // erase the button
   // let playAgainBtn = document.getElementById("play-again-button")
    playAgainBtn =  document.getElementById("play-again-button").style.display="none";
    console.log(playAgainBtn)

    //take score to 0
    ctx.clearRect(0,0,box*19,box*19)
    score=0;
    //erase the canvas
    draw()
        }




// 3. DRAWING THE CANVAS

function draw(){
    // erase the button
    playAgainBtn =  document.getElementById("play-again-button").style.display="none";
    
    // draw the board of the game
        ctx.drawImage(ground,0,0);
    
       // draw the snake
        for( let i=0; i<snake.length ; i++){
            if (i==0 && d=="DOWN" || d=="" || d==undefined) {
    
                ctx.drawImage(headSnakeDown,snake[0].x,snake[0].y,box,box)
                
            }  if (i==0 && d=="UP") {
    
                ctx.drawImage(headSnakeUp,snake[0].x,snake[0].y,box,box)
                
            }   if (i==0 && d=="LEFT") {
    
                ctx.drawImage(headSnakeLeft,snake[0].x,snake[0].y,box,box)
                
            }   if (i==0 && d=="RIGHT") {
    
                ctx.drawImage(headSnakeRight,snake[0].x,snake[0].y,box,box)
                
            }
            
            if (i!==0) {
                ctx.drawImage(piel,snake[i].x, snake[i].y, box, box);
                ctx.strokeStyle = "black";
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }
            
        }
        
    // draw the queca randomnly
    ctx.drawImage(queca, food.x, food.y, box,box);
   
        //old head position
            
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
      
        //in which direction
       
        if( d === "LEFT" ) {
            snakeX -= box;
        } if( d === "UP") {
            snakeY -= box;
        }
        if( d === "RIGHT") {
            snakeX += box;
        }if( d === "DOWN") {
            snakeY += box;
        }
        
     //add new head
     let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (snake[0].x==food.x && snake[0].y==food.y) {
        if (score=>100){
            speed-=.5
        }
        score+=10;
        eatingSound.play();
        food.x = Math.floor(Math.random()*17+1) * box;
        food.y = Math.floor(Math.random()*15+3) * box;

    } else {
    // remove tail position
    snake.pop();
    }

    
    
    //Game over
    
        if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
            ctx.drawImage(gameOverConB,0,0,608,608);
            document.getElementById("play-again-button").style.display="block";
            gameOverSound.play();
            clearInterval(game);
            
        }
    
        snake.unshift(newHead);
    
    
        //draw score
        ctx.fillStyle = "white";
        ctx.font="45px Arial";
        ctx.fillText(score,3*box,2*box);
        
    }


// call draw function every 100 ms

let game = setInterval(draw,speed);
