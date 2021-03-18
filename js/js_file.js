let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let ball = new Image();
let bg = new Image();
let platform = new Image();

// Load Textures
ball.src = "img/ball.png";
bg.src = "img/bg.png";
platform.src = "img/platform.png";

// Setup
let play = true;
let score = 0;
let speedDroping = 7;
let earth = false;
let fly = true;
let jump = false;
let speedjump = 18;
let maxspeedjump = speedjump;
let pauseJump = 0;
let pausecontrol = 0;
let flyMovepause = 0;
let moveA = false;
let moveD = false;
let countMove = 0;
let x = [];
let y = [];

// Position ball
let xpos = 75;
let ypos = 600;

// Spawn platforms
function createmap() {
  x[0] = 50;
  y[0] = 700;
  for (var i = 1; i < 7; i++) {
    x[i] = getRandomInt(25, 325);
    y[i] = i * 100;
  }
}

// Contol button
function buttonA(){
  moveA = true;
}
function buttonD(){
  moveD = true;
}
// Control keyboard
function controlA() {
  xpos = xpos - 5;
}
function controlD() {
  xpos = xpos + 5;
}

// Randomizer
function getRandomInt(min, max) {
  rand = Math.random() * (max - min) + min;
  return rand;
}

function draw() { // Draw frame
  // Draw backgraund and object
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(ball, xpos, ypos);
  ctx.drawImage(platform, x[0], y[0]);
  for (var i = 0; i < 7; i++) {
    ctx.drawImage(platform, x[i], y[i]);
  }

  // Physics
  if (fly) { // Dropping
    if (moveA && flyMovepause < 10 && moveD == false){ // Fly control
      controlA();
      ypos = ypos + speedDroping;
      flyMovepause += 1;
    }
    if (moveD && flyMovepause < 10 && moveA == false){ // Fly control
      controlD();
      ypos = ypos + speedDroping;
      flyMovepause += 1;
    }
    if(flyMovepause == 10){ // Pause fly control
      flyMovepause = 0;
      moveD = false;
      moveA = false;
    }
    if((moveD == false && moveA == false) || (moveD == true && moveA == true)){ // No control
      ypos = ypos + speedDroping; // Fall
      moveD = false;
      moveA = false;
    }
    for (var i = 0; i < 7; i++) {
      if ((xpos + 25 < x[i] + 100 && xpos + 25 > x[i]) && (y[i] <= ypos + 50 && y[i] + 20 >= ypos + 50)) { // Platform touch
        earth = true;
        fly = false;
      }
    }
  }
  if (earth) { // Pause before jumping
    pauseJump += 1;
  }
  if (earth && pauseJump == 10) { // Jump
    jump = true;
    earth = false;
    pauseJump = 0;
  }
  if (jump) { // Jump and control
    if(moveA && countMove < 10 && moveD == false){ 
      ypos -= speedjump; // Jump
      controlA();
      countMove += 1;
    }
    if(moveD && countMove < 10 && moveA == false){
      ypos -= speedjump; // Jump
      controlD();
      countMove += 1;
    }
    if(countMove == 10){ // Jump vector 
      countMove = 0;
      moveD = false;
      moveA = false;
    }
    if((moveD == false && moveA == false) || (moveD == true && moveA == true)){ // No control
      ypos -= speedjump; // Jump
      moveD = false;
      moveA = false;
    }
    speedjump -= 1; // Decline force jump
  }
  if (speedjump == 1) { // End jump
    speedjump = maxspeedjump;
    fly = true;
    jump = false;
  }
  if (xpos < 0){ // Side change
    xpos = 400;
  }
  if (xpos + 25 >= 450){ // Side change
    xpos = 50;
  }
  if (ypos > 750){ // End game
    alert("Вы проиграли! Ваш результат: " + score);
    play = false;
    location.reload();
  }

  // Camera
  if (ypos < 420){
    for (var i = 0; i < 7; i++){
      y[i] += 100;
      if (y[i] > 750){
        x[i] = getRandomInt(25, 325);
        y[i] = 100;
      }
    }
    ypos += 100;
    score += 1; // Append score
  }

  // Score output
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "48px Verdana";
  ctx.fillText("Счет: " + score, 50, 50);

  // Control keyboard
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

  if (play) { // Next frame
    requestAnimationFrame(draw);
  }
}

function main() { // Activaite game
  createmap();
  draw();
}

if (play){  // Call main
  bg.onload = main; 
}