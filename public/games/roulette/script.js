const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const betAmountInput = document.getElementById('betAmount');
const betTypeSelect = document.getElementById('betType');
const resultDiv = document.getElementById('result');

const colors = ['red', 'black'];
const sectors = Array.from({ length: 36 }, (_, i) => ({
  number: i + 1,
  color: colors[i % 2]
}));
sectors.push({ number: 0, color: 'green' });

let startAngle = 0;
const arc = (2 * Math.PI) / sectors.length;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sectors.forEach((sector, i) => {
    const angle = startAngle + i * arc;
    ctx.fillStyle = sector.color;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angle, angle + arc);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.translate(
      canvas.width / 2 + Math.cos(angle + arc / 2) * (canvas.width / 2.5),
      canvas.height / 2 + Math.sin(angle + arc / 2) * (canvas.height / 2.5)
    );
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    ctx.fillText(sector.number, -ctx.measureText(sector.number).width / 2, 0);
    ctx.restore();
  });

  // Arrow
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 4, canvas.height / 2 - (canvas.width / 2 + 5));
  ctx.lineTo(canvas.width / 2 + 4, canvas.height / 2 - (canvas.width / 2 + 5));
  ctx.lineTo(canvas.width / 2 + 4, canvas.height / 2 - (canvas.width / 2 - 5));
  ctx.lineTo(canvas.width / 2 + 9, canvas.height / 2 - (canvas.width / 2 - 5));
  ctx.lineTo(canvas.width / 2, canvas.height / 2 - (canvas.width / 2 - 13));
  ctx.lineTo(canvas.width / 2 - 9, canvas.height / 2 - (canvas.width / 2 - 5));
  ctx.lineTo(canvas.width / 2 - 4, canvas.height / 2 - (canvas.width / 2 - 5));
  ctx.lineTo(canvas.width / 2 - 4, canvas.height / 2 - (canvas.width / 2 + 5));
  ctx.fill();
}

function rotateWheel() {
  const spinTimeTotal = Math.random() * 3 + 4 * 1000;
  let spinTime = 0;

  function animate() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      clearTimeout(spinTimeout);
      const degrees = (startAngle * 180) / Math.PI + 90;
      const arcd = (arc * 180) / Math.PI;
      const index = Math.floor((360 - (degrees % 360)) / arcd);
      const winningSector = sectors[index];
      checkResult(winningSector);
      return;
    }
    const spinAngle = (spinTimeTotal - spinTime) * 0.01;
    startAngle += (spinAngle * Math.PI) / 180;
    drawWheel();
    spinTimeout = setTimeout(animate, 30);
  }
  animate();
}

function checkResult(winningSector) {
  const betAmount = parseInt(betAmountInput.value, 10);
  const betType = betTypeSelect.value;
  let won = false;

  if (betType === 'red' && winningSector.color === 'red') won = true;
  if (betType === 'black' && winningSector.color === 'black') won = true;
  if (betType === 'odd' && winningSector.number % 2 !== 0) won = true;
  if (betType === 'even' && winningSector.number % 2 === 0) won = true;

  if (won) {
    resultDiv.innerHTML = `You won! The number was ${winningSector.number} ${winningSector.color}.`;
  } else {
    resultDiv.innerHTML = `You lost. The number was ${winningSector.number} ${winningSector.color}.`;
  }
  resultDiv.style.display = 'block';
}

spinButton.addEventListener('click', () => {
  resultDiv.style.display = 'none';
  rotateWheel();
});

drawWheel();
