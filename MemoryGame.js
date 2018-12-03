
let suits = ['0001', '0002', '0003', '0004', '0005', '0006',
  '0007', '0008', '0001', '0002', '0003', '0004', '0005', '0006',
  '0007', '0008',]
let newSuits = mixSuits(suits);
let memory = document.getElementById('memory');
let winText = document.getElementById('winText');
let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let lockBoard = false;
let countTries = 0;
let countPairs = 0;


function mixSuits(suits) {
  return suits.sort(() => { return .5 - Math.random() });
}
function createCards() {
  // const newSuits = mixSuits(suits);
  newSuits.map((newSuits, i) => {
    let card = document.createElement('div');
    let img_front = document.createElement('img');
    let img_back = document.createElement('img');
    card.className = 'card';
    card.addEventListener('click', flipCard)
    card.id = (`${i}`);
    card.name = `${newSuits}`;
    memory.prepend(card);
    img_back.className = 'back';
    img_back.src = `https://raw.githubusercontent.com/Boardonly/project1/master/images/${newSuits}.jpg`;
    img_front.className = 'front';
    img_front.src = `https://raw.githubusercontent.com/Boardonly/project1/master/images/back.jpg`;
    card.prepend(img_back, img_front);
  })
}

function flipCard() {

  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (hasFlippedCard == false) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  matchCard();
}

function unflipCard() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    reset();
  }, 750);
}

function matchCard() {
  countTries += 1;
  if (firstCard.name === secondCard.name) {
    disableCards()
  } else {
    unflipCard();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  countPairs += 1;
  win()
  reset();
}

function reset() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function win() {
  if (countPairs === 8) {
    winText.innerHTML = `Ура. Это Победа за ${countTries} ${ends(countTries)}!!!`;
  }
}
function ends(countTries) {
  let count = countTries % 100;
  if (count >= 5 && count <= 20) {
    txt = 'ходов';
  } else {
    count = count % 10;
    if (count == 1) {
      txt = 'ход';
    } else if (count >= 2 && count <= 4) {
      txt = 'хода';
    }
  }
  return txt;
}

createCards();
