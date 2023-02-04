
//board
var blocksize= 25;
var rows=20;
var cols=20;
var board;
var context;
var img;
var apple;

//head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var velocityX = 0;
var velocityY = 0;

var snakebody = [];

//gameover
var gameover = false;

//food
var foodX;
var foodY;

//scoreboard
var score = 0;

//sound
const eatSound = new Audio('./assets/audio/eating.wav');
const game_over = new Audio('./assets/audio/gameover.mp3');

window.onload = function(){
  board = document.getElementById("board")
  board.height = rows * blocksize;
  board.width = cols * blocksize;
  context = board.getContext("2d");
  img=document.getElementById('bg-img');
  apple = new Image();
  apple.src = './assets/img/apple.png'
  randomFood();
  document.addEventListener("keyup", ChangeDirection);
  setInterval(update, 1000/10);
  
}

function update(){
  if(gameover){
    return;
  }
  
  /*context.fillStyle = "black"; */
  context.drawImage(img, 0, 0);
  //context.fillRect(0, 0, board.width , board.height); 

  snakeX += velocityX * blocksize;
  snakeY += velocityY * blocksize;

  //context.fillStyle = "red";
  context.drawImage(apple, foodX, foodY);
  //context.fillRect(foodX , foodY , blocksize, blocksize);

  context.shadowBlur = 10;
  context.shadowColor = 'black';
  context.fillStyle = "lime";
  context.fillRect(snakeX , snakeY , blocksize, blocksize);

 //gameover conditions
 if( snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows*blocksize ){
  gameover = true;
  game_over.play();
  alert("Game Over");
  location.reload();
}

 for( let i = 0; i < snakebody.length; i++ ){
 if( snakeX == snakebody[i][0] && snakeY == snakebody[i][1]){
  gameover = true;
  game_over.play();
  alert("Game Over");
  location.reload();
} 
}

  if(snakeX == foodX && snakeY == foodY){   
    snakebody.push([foodX, foodY]);
    randomFood();
    eatSound.play();
    score+=4;
  }

  for( let i = snakebody.length-1; i > 0; i-- ){
    snakebody[i] = snakebody[i-1];
  }

  if(snakebody.length){
    snakebody[0] = [snakeX, snakeY];
  } 

  for (let i=0; i<snakebody.length; i++){
    context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
  }
  drawScore();
}

function randomFood(){
  foodX = Math.floor(Math.random() * cols) * blocksize;
  foodY = Math.floor(Math.random() * rows) * blocksize;
}

function ChangeDirection(e){
 if(e.code == "ArrowUp" && velocityY != 1){
   velocityY = -1;
   velocityX= 0;
 } 
 else if(e.code == "ArrowDown" && velocityY != -1){
  velocityY = 1;
  velocityX= 0;
}
else if(e.code == "ArrowRight" && velocityX != -1){
  velocityY = 0;
  velocityX= 1;
}
else if(e.code == "ArrowLeft" && velocityX != 1){
  velocityY = 0;
  velocityX= -1;
}
}

function drawScore(){
  context.fillStyle = 'white';
  context.font = '12px Verdana';
  context.fillText('Score: ' + score, board.width-70, 12);
}

function Arrowup(){

  if(velocityY != 1){
    velocityY = -1;
    velocityX= 0;
  } 
  /*velocityY = -1;
  velocityY != 1;
  velocityX = 0; */
}

function Arrowdown(){
  if(velocityY != -1){
    velocityY = 1;
    velocityX= 0;
  }
  /*velocityY = 1;
  velocityY != -1;
  velocityX = 0; */
}

function Arrowright(){
  if(velocityX !=-1){
  velocityY = 0;
  velocityX = 1;
}
}

function Arrowleft(){
  if(velocityX != 1){
  velocityY = 0;
  velocityX = -1;
}
}