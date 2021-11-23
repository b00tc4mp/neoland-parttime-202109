var signin = document.querySelector(".signin");
var game = document.querySelector(".game");

/* TEMPORAL (salta el control de acceso) */
game.classList.remove("off");
signin.classList.add("off");

/*---------------------------------------*/

/*=== SCREEN, LEVEL AND POINTS DIVS ===*/
var gameScreen = document.querySelector(".game-screen");

var counter = document.createElement("div");
game.append(counter);
counter.classList.add("game_counter");
var points = 0;
counter.innerText = `${points} pts`;

var gameLevel = document.createElement("div");
game.append(gameLevel);
gameLevel.classList.add("gameLevel");
var level = 1;
gameLevel.innerText = `Level ${level}`;

var screenBlockContainer = document.createElement("div");
  gameScreen.append(screenBlockContainer);
  screenBlockContainer.classList.add("block-container");
   // console.log(screenBlockContainer.getClientRects())
var body = document.querySelector("body");

/*---------------------------------------*/

/*=== GENERATE UPPER BLOCKS ===*/
var blocks = [];
var blocksProps = [];
var colors = ["var(--color1)", "var(--color2)"];
var lineItemsQtty = 15;

function pickRandomColor() {
    var index = Math.floor(Math.random() * 2);
    return colors[index];
}

for (i = 0; i < lineItemsQtty; i++) {
    var background = pickRandomColor();

    var screenBlockElement = document.createElement("div");
    screenBlockContainer.append(screenBlockElement);
    screenBlockElement.classList.add("block-element");
    screenBlockElement.dataset.color = background;
    screenBlockElement.style.backgroundColor = background;

    blockProps = screenBlockElement.getClientRects()[0];
    var block = {
      x: blockProps.x,
      y: blockProps.y,
      width: blockProps.width,
      background: background
    };
    
    blocksProps.push(blockProps)
    blocks.push(block);
  }

/*---------------------------------------*/

/*=== GENERATE SHOOTER ===*/

var screen_shooter = document.createElement("div");
gameScreen.append(screen_shooter);
screen_shooter.classList.add("shooter");

var shooter = {
  width: 46,
  x: 300,
  background: "grey",
};

screen_shooter.style.transform = `translate(${shooter.x}px)`;

shooter.background = screen_shooter.style.backgroundColor;
var step = 20;

/*=== shooter moves ===*/
document.onkeydown = function (e) {
  if (e.key === "ArrowRight") {
    if (shooter.x <= 600) {
      shooter.x += step;
      screen_shooter.style.transform = `translate(${shooter.x}px)`;
      shot.x = shooter.x + shooter.width / 2;
    }
  }
  if (e.key === "ArrowLeft") {
    if (shooter.x > 0) {
      shooter.x -= step;
      screen_shooter.style.transform = `translate(${shooter.x}px)`;
      shot.x = shooter.x + shooter.width / 2;
    }
  }
};
/* == SET SHOOTER RANDOM COLOR with shot event == */

var screen_shot;
var shot = {
  x: shooter.x + shooter.width / 2,
  y: 0,
  maxXpos: 600,
  background: shooter.background,
};

function createShot() {
  screen_shot = document.createElement("div");
  gameScreen.append(screen_shot);
  screen_shot.classList.add("shot");
  screen_shot.style.transform = `translate(${shot.x}px)`;
  shotShot();
}

function shotShot() {
  var shotInterval = setInterval(function () {
    if (shot.y >= -400) {
      shot.y -= step;
      screen_shot.style.transform = `translate(${fixedShotXPosition}px, ${shot.y}px )`;

      if (shot.y < -400) {
        checkPosition();
      }
    } else clearInterval(shotInterval);
  }, 70);

  shot.y = -8;
}


function deleteShot() {
  screen_shot.remove();
}
var newShooterBg;

var blocksElements = document.querySelectorAll(".block-element");
var margin;
var fixedShotXPosition;


function checkPosition() { 
var currentShooterX = screen_shooter.getClientRects()[0].x + 46/2

console.log(currentShooterX)


  margin = (body.getClientRects()[0].width - 713) / 2;

  for (var i = 0; i < blocks.length; i++) {
  //  console.log(blocks[i])
    var maxX =
    blocks[i].x + blocks[i].width
    /*   i === 10
        ? blocks[i].x + blocks[i].width
        : blocks[i + 1].x; */
    var minX = blocks[i].x;

    if (fixedShotXPosition + margin >= minX && fixedShotXPosition + margin <= maxX) {
      console.log('Entró en el bloque ' + (i +1));
    }
    console.log(minX, fixedShotXPosition, maxX)
   
  }

}


function getShot(event) {
  if (event.key === " ") {
    createShot();
    fixedShotXPosition = shot.x;
    screen_shot.style.backgroundColor = newShooterBg;
    newShooterBg = pickRandomColor();

    screen_shooter.style.backgroundColor = newShooterBg;
    shot.background = shooter.background;
  }

  //CHECK and REMOVE before a new shot
}

document.addEventListener("keydown", getShot);


