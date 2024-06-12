const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.5;
const player = {
  x: 50,
  y: 200,
  width: 40,
  height: 40,
  speed: 5,
  dx: 0,
  dy: 0,
  jumping: false
};

const keys = {
  right: false,
  left: false,
  up: false
};

const platforms = [
  { x: 0, y: 350, width: 800, height: 50 },
  { x: 200, y: 300, width: 100, height: 20 },
  { x: 400, y: 250, width: 100, height: 20 },
  { x: 600, y: 200, width: 100, height: 20 }
];

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowUp') keys.up = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight') keys.right = false;
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowUp') keys.up = false;
});

function drawPlayer() {
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  ctx.fillStyle = 'green';
  platforms.forEach(platform => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

function movePlayer() {
  if (keys.right) player.dx = player.speed;
  else if (keys.left) player.dx = -player.speed;
  else player.dx = 0;

  if (keys.up && !player.jumping) {
    player.dy = -10;
    player.jumping = true;
  }
  
  player.dy += gravity;
  
  player.x += player.dx;
  player.y += player.dy;

  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.jumping = false;
  }

  platforms.forEach(platform => {
    if (player.x < platform.x + platform.width &&
        player.x + player.width > platform.x &&
        player.y < platform.y + platform.height &&
        player.y + player.height > platform.y) {
      player.y = platform.y - player.height;
      player.dy = 0;
      player.jumping = false;
    }
  });
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  clear();
  drawPlatforms();
  drawPlayer();
  movePlayer();

  requestAnimationFrame(update);
}

update();
