const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓'];

const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReel(reel) {
  return new Promise((resolve) => {
    let spins = 20;
    const spinInterval = setInterval(() => {
      reel.innerText = getRandomSymbol();
      spins -= 1;
      if (spins === 0) {
        clearInterval(spinInterval);
        resolve(reel.innerText);
      }
    }, 100);
  });
}

async function spin() {
  resultDiv.style.display = 'none';
  const symbol1 = await spinReel(reel1);
  const symbol2 = await spinReel(reel2);
  const symbol3 = await spinReel(reel3);

  if (symbol1 === symbol2 && symbol2 === symbol3) {
    resultDiv.innerText = `JACKPOT! You won with ${symbol1} ${symbol2} ${symbol3}`;
  } else if (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3) {
    resultDiv.innerText = `You won with ${symbol1} ${symbol2} ${symbol3}`;
  } else {
    resultDiv.innerText = `You lost with ${symbol1} ${symbol2} ${symbol3}`;
  }

  resultDiv.style.display = 'block';
}

spinButton.addEventListener('click', spin);
