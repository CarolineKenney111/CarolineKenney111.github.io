const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -this.velX;
    }

    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(balls) {
    for (let i = 0; i < balls.length; i++) {
      if (this !== balls[i]) {
        const dx = this.x - balls[i].x;
        const dy = this.y - balls[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[i].size) {
          // Swap velocities
          [this.velX, balls[i].velX] = [balls[i].velX, this.velX];
          [this.velY, balls[i].velY] = [balls[i].velY, this.velY];
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10,20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7,7),
    random(-7,7),
    randomColor(),
    size
  );
  balls.push(ball);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(balls);
  }

  requestAnimationFrame(loop);
}

loop();
