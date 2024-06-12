const suits = ['♥', '♦', '♣', '♠'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];
let playerHand = [];
let dealerHand = [];

const dealButton = document.getElementById('dealButton');
const hitButton = document.getElementById('hitButton');
const standButton = document.getElementById('standButton');
const resetButton = document.getElementById('resetButton');
const resultDiv = document.getElementById('result');
const playerCardsDiv = document.getElementById('player-cards');
const dealerCardsDiv = document.getElementById('dealer-cards');

function createDeck() {
  deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function dealCard(hand) {
  hand.push(deck.pop());
}

function getHandValue(hand) {
  let value = 0;
  let numAces = 0;
  for (const card of hand) {
    if (card.value === 'A') {
      numAces += 1;
      value += 11;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  }
  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces -= 1;
  }
  return value;
}

function displayHand(hand, element) {
  element.innerHTML = '';
  for (const card of hand) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerHTML = `${card.value}${card.suit}`;
    element.appendChild(cardDiv);
  }
}

function dealInitialCards() {
  for (let i = 0; i < 2; i++) {
    dealCard(playerHand);
    dealCard(dealerHand);
  }
}

function checkForBlackjack() {
  const playerValue = getHandValue(playerHand);
  const dealerValue = getHandValue(dealerHand);
  if (playerValue === 21) {
    if (dealerValue === 21) {
      resultDiv.innerHTML = 'Push! Both have Blackjack!';
    } else {
      resultDiv.innerHTML = 'Blackjack! You win!';
    }
    resultDiv.style.display = 'block';
    endGame();
    return true;
  }
  if (dealerValue === 21) {
    resultDiv.innerHTML = 'Dealer has Blackjack! You lose!';
    resultDiv.style.display = 'block';
    endGame();
    return true;
  }
  return false;
}

function endGame() {
  dealButton.style.display = 'none';
  hitButton.style.display = 'none';
  standButton.style.display = 'none';
  resetButton.style.display = 'inline-block';
}

function playerTurn() {
  hitButton.style.display = 'inline-block';
  standButton.style.display = 'inline-block';
}

function dealerTurn() {
  hitButton.style.display = 'none';
  standButton.style.display = 'none';

  while (getHandValue(dealerHand) < 17) {
    dealCard(dealerHand);
    displayHand(dealerHand, dealerCardsDiv);
  }

  const playerValue = getHandValue(playerHand);
  const dealerValue = getHandValue(dealerHand);

  if (dealerValue > 21 || playerValue > dealerValue) {
    resultDiv.innerHTML = 'You win!';
  } else if (playerValue < dealerValue) {
    resultDiv.innerHTML = 'You lose!';
  } else {
    resultDiv.innerHTML = 'Push!';
  }
  resultDiv.style.display = 'block';
  endGame();
}

function deal() {
  createDeck();
  shuffleDeck();
  playerHand = [];
  dealerHand = [];
  dealInitialCards();
  displayHand(playerHand, playerCardsDiv);
  displayHand(dealerHand, dealerCardsDiv);

  resultDiv.style.display = 'none';
  dealButton.style.display = 'none';
  if (!checkForBlackjack()) {
    playerTurn();
  }
}

function hit() {
  dealCard(playerHand);
  displayHand(playerHand, playerCardsDiv);

  const playerValue = getHandValue(playerHand);
  if (playerValue > 21) {
    resultDiv.innerHTML = 'Bust! You lose!';
    resultDiv.style.display = 'block';
    endGame();
  }
}

function stand() {
  dealerTurn();
}

function reset() {
  dealButton.style.display = 'inline-block';
  hitButton.style.display = 'none';
  standButton.style.display = 'none';
  resetButton.style.display = 'none';
  resultDiv.style.display = 'none';
  playerCardsDiv.innerHTML = '';
  dealerCardsDiv.innerHTML = '';
}

dealButton.addEventListener('click', deal);
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);
resetButton.addEventListener('click', reset);
