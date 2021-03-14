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
let speedjump = 17;
let maxspeedjump = 17;
let pauseJump = 0;
let pausecontrol = 0;
let flyMovepause = 0;
let moveA = false;
let moveD = false;
let countMove = 0;
let platforms = [];
let platformsCordinate = [];
let x = [];
let y = [];

// position
let xpos = 75;
let ypos = 600;

// spawn platforms
function createmap() {
  x[0] = 50;
  y[0] = 700;
  for (var i = 1; i < 7; i++) {
    x[i] = getRandomInt(25, 325);
    y[i] = i * 100;
  }
}

function playGame() {
  if (play == false) {
    play = true;
    draw();
    console.log("game active");
  }
}

//управление
function buttonA(){
  moveA = true;
}
function buttonD(){
  moveD = true;
}
function controlA() {
  xpos = xpos - 5;
}

function controlD() {
  xpos = xpos + 5;
}

function getRandomInt(min, max) {
  rand = Math.random() * (max - min) + min;
  return rand;
}

function draw() {
  //Draw backgraund and object
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(ball, xpos, ypos);
  ctx.drawImage(platform, x[0], y[0]);
  for (var i = 0; i < 7; i++) {
    ctx.drawImage(platform, x[i], y[i]);
  }

  //physics
  if (fly) { // dropping
    if (moveA && flyMovepause < 10 && moveD == false){
      controlA();
      ypos = ypos + speedDroping;
      flyMovepause += 1;
    }
    if (moveD && flyMovepause < 10 && moveA == false){
      controlD();
      ypos = ypos + speedDroping;
      flyMovepause += 1;
    }
    if(flyMovepause == 10){
      flyMovepause = 0;
      moveD = false;
      moveA = false;
    }
    if((moveD == false && moveA == false) || (moveD == true && moveA == true)){
      ypos = ypos + speedDroping;
      moveD = false;
      moveA = false;
    }
    for (var i = 0; i < 7; i++) {
      if ((xpos + 25 < x[i] + 100 && xpos + 25 > x[i]) && (y[i] <= ypos + 50 && y[i] + 20 >= ypos + 50)) {
        earth = true;
        fly = false;
      }
    }
  }
  if (earth) {
    pauseJump += 1;
  }
  if (earth && pauseJump == 10) {
    jump = true;
    earth = false;
    pauseJump = 0;
  }
  if (jump) { // jump and control
    if(moveA && countMove < 10 && moveD == false){
      ypos -= speedjump;
      controlA();
      countMove += 1;
    }
    if(moveD && countMove < 10 && moveA == false){
      ypos -= speedjump;
      controlD();
      countMove += 1;
    }
    if(countMove == 10){
      countMove = 0;
      moveD = false;
      moveA = false;
    }
    if((moveD == false && moveA == false) || (moveD == true && moveA == true)){
      ypos -= speedjump;
      moveD = false;
      moveA = false;
    }
    speedjump -= 1;
  }
  if (speedjump == 1) {
    speedjump = maxspeedjump;
    fly = true;
    jump = false;
  }
  if (xpos < 0){
    xpos = 400;
  }
  if (xpos + 25 >= 450){
    xpos = 50;
  }
  if (ypos > 750){
    alert("Вы проиграли! Ваш результат: " + score);
    play = false;
    location.reload();
  }

  // camera
  if (ypos < 420){
    for (var i = 0; i < 7; i++){
      y[i] += 100;
      if (y[i] > 750){
        x[i] = getRandomInt(25, 325);
        y[i] = 100;
      }
    }
    ypos += 100;
    score += 1;
  }

  // score
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "48px Verdana";
  ctx.fillText("Счет: " + score, 50, 50);

  // control
  pausecontrol += 1;
  if (pausecontrol == 3) {
    document.addEventListener("keydown", function (e) {
      if (e.code == 'KeyA') {
        moveA = true;
      }
      if (e.code == 'KeyD') {
        moveD = true;
      }
    });
  }

  if (play) {
    requestAnimationFrame(draw);
  }
}

function main() {
  createmap();
  draw();
}

if (play){
  bg.onload = main;
}