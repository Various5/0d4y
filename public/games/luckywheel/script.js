const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const resultDiv = document.getElementById('result');

const prizes = [
  '10% Coupon',
  '5% Coupon',
  'Main Prize',
  'Small Prize',
  'Choose Prize',
  'Chocolate'
];

let startAngle = 0;
let arc = Math.PI / (prizes.length / 2);
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;
let currentAngle = 0;

function drawWheel() {
  const outsideRadius = 200;
  const textRadius = 160;
  const insideRadius = 125;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;

  for (let i = 0; i < prizes.length; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = i % 2 === 0 ? '#FFDD44' : '#FFAA22';

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, outsideRadius, angle, angle + arc, false);
    ctx.arc(canvas.width / 2, canvas.height / 2, insideRadius, angle + arc, angle, true);
    ctx.stroke();
    ctx.fill();

    ctx.save();
    ctx.fillStyle = 'black';
    ctx.translate(
      canvas.width / 2 + Math.cos(angle + arc / 2) * textRadius,
      canvas.height / 2 + Math.sin(angle + arc / 2) * textRadius
    );
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    const text = prizes[i];
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }

  // Arrow
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 4, canvas.height / 2 - (outsideRadius + 5));
  ctx.lineTo(canvas.width / 2 + 4, canvas.height / 2 - (outsideRadius + 5));
  ctx.lineTo(canvas.width / 2 + 4, canvas.height / 2 - (outsideRadius - 5));
  ctx.lineTo(canvas.width / 2 + 9, canvas.height / 2 - (outsideRadius - 5));
  ctx.lineTo(canvas.width / 2 + 0, canvas.height / 2 - (outsideRadius - 13));
  ctx.lineTo(canvas.width / 2 - 9, canvas.height / 2 - (outsideRadius - 5));
  ctx.lineTo(canvas.width / 2 - 4, canvas.height / 2 - (outsideRadius - 5));
  ctx.lineTo(canvas.width / 2 - 4, canvas.height / 2 - (outsideRadius + 5));
  ctx.fill();
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI) / 180;
  drawWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  const degrees = (startAngle * 180) / Math.PI + 90;
  const arcd = (arc * 180) / Math.PI;
  const index = Math.floor((360 - (degrees % 360)) / arcd);
  ctx.save();
  ctx.font = 'bold 30px Arial';
  const text = prizes[index];
  resultDiv.innerHTML = `You won: ${text}`;
  resultDiv.style.display = 'block';
  spinButton.style.display = 'none';
  resetButton.style.display = 'inline-block';
  ctx.restore();
}

function easeOut(t, b, c, d) {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function reset() {
  spinButton.style.display = 'inline-block';
  resetButton.style.display = 'none';
  resultDiv.style.display = 'none';
  startAngle = 0;
  drawWheel();
}

spinButton.addEventListener('click', spin);
resetButton.addEventListener('click', reset);

drawWheel();
