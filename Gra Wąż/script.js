const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = randomPosition();
let score = 0;

function randomPosition() {
  return {
    x: Math.floor(Math.random() * columns),
    y: Math.floor(Math.random() * rows)
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  ctx.fillStyle = "red";
  ctx.fillRect(food.x * scale, food.y * scale, scale, scale);


  ctx.fillStyle = "#0f0";
  for (let part of snake) {
    ctx.fillRect(part.x * scale, part.y * scale, scale - 1, scale - 1);
  }


  document.getElementById("score").innerText = `Wynik: ${score}`;
}

function update() {
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  
  if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
    return gameOver();
  }

 
  for (let part of snake) {
    if (head.x === part.x && head.y === part.y) {
      return gameOver();
    }
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomPosition();
  } else {
    snake.pop();
  }
}

function gameOver() {
  alert(`Koniec gry! Twój wynik: ${score}`);
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  food = randomPosition();
  score = 0;
}

window.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

setInterval(() => {
  update();
  draw();
}, 120);