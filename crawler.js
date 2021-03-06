ctx = cnv.getContext('2d')

function rect(x, y, w, h, fs) {
ctx.fillStyle = fs
ctx.fillRect(x * 20, y * 20, w * 20 - 1, h * 20 - 1)
}

//Time Controls
setInterval(tick, 45)

//Initial State
let game_over = 3

//Velocities
let snake_velocity = 1
let missile_velocity = [-1]

//Update Function
function update() {
snake_x = snake_x + snake_velocity
for (i = 0; i < missile_y.length; i++) {
  missile_y[i] = missile_y[i] + missile_velocity[i]
}
}

//Constraint Function
function constraint() {
  //Makes snake go down a level and move left at right wall
  if (snake_x === 50) {
    snake_y = snake_y + 1
    snake_x = 49
    snake_velocity = -1
  }
  //Makes snake go down and move right at left wall
  if (snake_x === 1 && snake_y !== 2) {
    snake_y = snake_y + 1
    snake_x = 2
    snake_velocity = 1
  }
  //Make snake stop moving at the bottom
  if (snake_y === 29) {
    snake_velocity = 0
    game_over = 2
    console.log("game over")
  }
  //Makes missiles disappear
  for (i = 0; i < missile_y.length; i++) {
    if (missile_y[i] === 1) {
      missile_velocity[i] = 0
      missile_shot[i] = 0
    }
  }
  //Keeps player in the field
  if (player_x === 50) {
    player_x = 49
  } else if (player_x === 1) {
    player_x = 2
  }
  //Makes snake disappear on collision
  for (i = 0; i < missile_x.length; i++) {
    if (snake_x === missile_x[i]) {
      if (snake_y === missile_y[i]) {
        snake_y = -1
        snake_velocity = 0
      }
    }
  }

  if (snake_x === 49) {
    for (i = 0; i < missile_y.length; i++) {
      if (snake_y === missile_y[i] + 1) {
        if (snake_x === missile_x[i]) {
          snake_y = -1
          snake_velocity = 0
        }
      }
    }
  }

  if (snake_x === 2) {
    for (i = 0; i < missile_y.length; i++) {
      if (snake_y === missile_y[i] + 1) {
        if (snake_x === missile_x[i]) {
          snake_y = -1
          snake_velocity = 0
        }
      }
    }
  }

  //Makes missile stop on collision
  for (i = 0; i < missile_velocity.length; i++) {
    if (snake_y === -1) {
      missile_velocity[i] = 0
      game_over = 1
      console.log("you win!")
      break
    }
  }
}

//Draw Function
function draw() {
//clear canvas
this.ctx.clearRect(0, 0, 1040, 640)
//Background
rect(1, 1, 50, 30, 'grey')
//Left wall
rect(1, 1, 1, 30, 'black')
//Right wall
rect(50, 1, 1, 30, 'black')
//Floor
rect(1, 30, 50, 1, 'black')
//Ceiling
rect(1, 1, 50, 1, 'black')
//Fired missile 1
for (i = 0; i < missile_x.length; i++) {
  if (missile_shot[i] === 1) {
    rect(missile_x[i], missile_y[i], 1, 1, 'red')
  }
}
//You Win Screen
if (game_over === 1) {
  rect(17, 11, 19, 8, 'grey')
  ctx.font = "40px Arial";
  ctx.fillStyle = "purple"
  ctx.fillText("You Win!", 435, 260);
  ctx.fillText("＼(★^∀^★)／", 390, 310);
  ctx.fillText("Press R to Try Again", 345, 370);
}
//You Lose Screen
if (game_over === 2) {
  rect(17, 11, 19, 8, 'grey')
  ctx.font = "40px Arial";
  ctx.fillStyle = "coral"
  ctx.fillText("You Lose!", 435, 260);
  ctx.fillText("(╯ಠ_ಠ）╯︵┴┴", 360, 310);
  ctx.fillText("Press R to Try Again", 345, 370);
}
//Player
rect(player_x, 29, 1, 1, 'orange')
//Snake(1)
rect(snake_x, snake_y, 1, 1, 'green')
}

//Tick Function
function tick() {
  if (game_over === 0) {
    update()
    constraint()
    draw()
  }
}

//Keydown Function
function keydown(event) {
key = event.key

  if (key === 'r' && ((game_over === 1) || (game_over === 2))) {
    console.log("r")
    player_x = 25
    snake_x = 1
    snake_y = 1
    missile_shot = [0]
    missile_x = [player_x]
    missile_y = [29]
    snake_velocity = 1
    missile_velocity = [-1]
    game_over = 0
    constraint()
    draw()
  }

  if (game_over === 0) {
    if (key === 'ArrowDown') {
      console.log("arrow down")
    } else if (key === 'ArrowUp') {
      console.log("arrow up")
    } else if (key === 'ArrowLeft') {
      console.log("arrow left")
      player_x = player_x - 1
    } else if (key === 'ArrowRight') {
      console.log("arrow right")
      player_x = player_x + 1
    } else if (key === ' ') {
      console.log("space bar")
      missile_x.push(player_x)
      missile_y.push(29)
      missile_velocity.push(-1)
      missile_shot.push(1)
    }
    constraint()
    draw()
  }

  if (key === ' ' && game_over === 3) {
    console.log("start")
    player_x = 25
    snake_x = 1
    snake_y = 1
    missile_shot = [0]
    missile_x = [player_x]
    missile_y = [29]
    snake_velocity = 1
    missile_velocity = [-1]
    game_over = 0
    constraint()
    draw()
  }
}

//Start Page
if (game_over === 3) {
//Background
rect(1, 1, 50, 30, 'grey')
//Left wall
rect(1, 1, 1, 30, 'black')
//Right wall
rect(50, 1, 1, 30, 'black')
//Floor
rect(1, 30, 50, 1, 'black')
//Ceiling
rect(1, 1, 50, 1, 'black')
//Welcome Message
rect(17, 11, 19, 8, 'grey')
ctx.font = "40px Arial";
ctx.fillStyle = "gold"
ctx.fillText("Welcome to Crawler!", 310, 220);
ctx.fillText("Use the Left and Right Arrows to move", 160, 270);
ctx.fillText("Use the Spacebar to Shoot", 260, 320);
ctx.fillText("Ready to play?", 360, 410);
ctx.fillText("Just Hit Space Bar to Begin", 240, 460);
};

document.addEventListener('keydown', keydown);