
let suits = ['0001', '0002', '0003', '0004', '0005', '0006',
  '0007', '0008', '0001', '0002', '0003', '0004', '0005', '0006',
  '0007', '0008',]
let newSuits = mixSuits(suits);
let memory = document.getElementById('memory');
let winText = document.getElementById('winText');
let divScore = document.getElementById('score');
let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let lockBoard = false;
let countTries = 0;
let countPairs = 0;
let highScore = [{
  barley_break: { gamerName: "highScore" },         //<==================== добавил
  hangman: { gamerName: "highScore" },
  memory: { Anakoliy: 52, Vaniliy: 45, Nitolay: 48 },
}];
let newHighScore = {
  barley_break: { gamerName: "highScore" },         //<==================== добавил
  hangman: { gamerName: "highScore" },
  memory: {},
}
let keysSorted = [];  //<==================== добавил
const SECRET_KEY = '$2a$10$5xA6OFP4qnNwimKo5/eK0eLoN60N/mcBIpajju/F4nxswjlvxe1Ti';
const BIN_ID = '5c08228f1deea01014bdeca1';

  function pushToHighscore (name, score){
    highScore[0].memory[name] = (score);
    return highScore[0].memory
  }

function toHighscoreDiv(arr) {                     //<==================== добавил
  let newarr = arr;
  for (let i=3; i < newarr.length; i -= 1) {
    let span = document.createElement('span');
    let br = document.createElement('br');
    winText.append(span, br);
    span.innerText =`${newarr[i]}: ${highScore[0].memory[newarr[i]]}`;
    newHighScore.memory[newarr[i]] = (highScore[0].memory[newarr[i]]);
  }
}
function sort() {          //<==================== добавил
  let memory = highScore[0].memory
  keysSorted = Object.keys(memory).sort((a, b) => memory[b] - memory[a]);
}

function putData(data) {            //<==================== добавил
  return fetch(`https://api.jsonbin.io/b/${BIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'secret-key': SECRET_KEY,
      private: 'true',
      name: 'OneAMinion',
    },
    body: JSON.stringify(data)
  })
};

function getData() {  //<==================== добавил
  return fetch(`https://api.jsonbin.io/b/${BIN_ID}/latest`, {
    method: 'GET',
    headers: {
      'secret-key': SECRET_KEY,
      private: 'true',
    },
  }).then(res => res.json())
    .then(res => highScore.push(res))
}

function getScore() {  
  let newHighScore = [...highScore];
  for (let key of newHighScore) {
   }
divScore.innerText = `you did ${countTries} klick's`;
}
// window.postData = postData;
// window.getData = getData;
// window.putData = putData;

function mixSuits(suits) {
  return suits.sort(() => { return .5 - Math.random() });
}
function createCards() {
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
    img_back.src = `https://raw.githubusercontent.com/Boardonly/images/master/images/${newSuits}.jpg`;
    img_front.className = 'front';
    img_front.src = `https://raw.githubusercontent.com/Boardonly/images/master/images/back.jpg`;
    card.prepend(img_back, img_front);
  })
}
winText.innerText
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
  getScore();
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
    return true;
  }
  return false;
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
