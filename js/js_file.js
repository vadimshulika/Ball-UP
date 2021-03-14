let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let ball = new Image();
let bg = new Image();
let platform = new Image();

ball.src = "img/ball.png";
bg.src = "img/bg.png";
platform.src = "img/platform.png";

//setup
let play = true;
let score = 0;
let speedDroping = 5;
let earth = false;
let fly = true;
let jump = false;
let speedjump = 15;
let maxspeedjump = 15;
let pauseJump = 0;
let platforms = [];
let platformsCordinate = [];
let x = []; 
let y = [];

//позиция
let xpos = 75;
let ypos = 600;
//let fly = false;

// spawn platforms
function createmap() {
  //console.log('spawn');
  x[0] = 50;
  y[0] = 700;
  for (var i = 1; i < 15; i++){
    x[i] = getRandomInt(25, 325);
    y[i] = i * 100;
  }
}

function playGame() {
  if (play == false){
    play = true;
    draw();
    console.log("game active");
  }
}

//управление
function control() {
  
}

//function jump() {
//  ypos -= Math.log2(xposjump); //200px
//  earth = false;
//}

function getRandomInt(min, max) {
  rand = Math.random() * (max - min) + min;
  return rand;
}

function draw() {
  //Draw backgraund
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(ball, xpos, ypos);
  ctx.drawImage(platform, x[0], y[0]);
  for (var i = 0; i < 15; i++){
    ctx.drawImage(platform, x[i], y[i]);
  }


  //physics
  if(fly){
    ypos = ypos + speedDroping;
    for(var i = 0; i < 15; i++){
      if((xpos + 25 < x[i] + 100 && xpos + 25 > x[i]) && (y[i] <= ypos + 50 && y[i] + 20 >= ypos + 50)){
        earth = true;
        fly = false;
      }
    }
  }
  if(earth){
    pauseJump += 1;
  }
  if(earth && pauseJump == 10){
    jump = true;
    earth = false;
    pauseJump = 0;
  }
  if (jump){
    ypos -= speedjump;
    speedjump -= 1;
  }
  if (speedjump == 1){
    speedjump = maxspeedjump;
    fly = true;
    jump = false;
  }

  document.addEventListener("keydown", function (e) {
    if (e.code == 'KeyA') {
      console.log("active");
      xpos = xpos - 1;
    }
    if (e.code == 'KeyD') {
      console.log("active");
      xpos = xpos + 1;
    }
  });

  if (play) {
    requestAnimationFrame(draw);
  }
}

function main (){
  createmap();
  draw();
}

bg.onload = main;
