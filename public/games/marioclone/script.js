const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player = {
  x: 50,
  y: 350,
  width: 50,
  height: 50,
  speed: 5,
  dx: 0,
  dy: 0,
  gravity: 0.5,
  jumpPower: -10,
  onGround: false
};

let keys = {
  right: false,
  left: false,
  up: false
};

const platforms = [
  { x: 0, y: 380, width: 800, height: 20 },
  { x: 150, y: 300, width: 100, height: 20 },
  { x: 300, y: 250, width: 100, height: 20 },
  { x: 450, y: 200, width: 100, height: 20 }
];

// Event listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') keys.right = true;
  if (e.key === 'ArrowLeft' || e.key === 'Left') keys.left = true;
  if (e.key === 'ArrowUp' || e.key === 'Up') keys.up = true;
}

function keyUp(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') keys.right = false;
  if (e.key === 'ArrowLeft' || e.key === 'Left') keys.left = false;
  if (e.key === 'ArrowUp' || e.key === 'Up') keys.up = false;
}

// Game loop
function update() {
  // Move player
  if (keys.right) player.dx = player.speed;
  else if (keys.left) player.dx = -player.speed;
  else player.dx = 0;

  if (keys.up && player.onGround) {
    player.dy = player.jumpPower;
    player.onGround = false;
  }

  player.dy += player.gravity;

  player.x += player.dx;
  player.y += player.dy;

  // Collision detection
  player.onGround = false;
  platforms.forEach(platform => {
    if (player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y < platform.y + platform.height &&
      player.y + player.height > platform.y) {
        player.dy = 0;
        player.y = platform.y - player.height;
        player.onGround = true;
    }
  });

  // Boundary detection
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.onGround = true;
  }
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

function drawPlayer() {
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  ctx.fillStyle = '#654321';
  platforms.forEach(platform => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clear();
  drawPlayer();
  drawPlatforms();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
