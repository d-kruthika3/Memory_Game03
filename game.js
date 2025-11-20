const imagePaths = [
  'images/1.jpg',
  'images/2.webp',
  'images/3.webp',
  'images/4.jfif',
  'images/5.webp',
  'images/6.webp',
  'images/7.webp',
  'images/8.jpg',
  'images/9.jfif',
  'images/10.jpg'
];

// Duplicate to make pairs
let cards = [...imagePaths, ...imagePaths];

// Shuffle cards
cards = cards.sort(() => 0.5 - Math.random());

const board = document.getElementById('game-board');
let firstCard = null;
let lockBoard = false;
let matchedPairs = 0;
let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };

// Create cards
cards.forEach((src, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = src;

    card.innerHTML = `<div class="front"></div>
        <div class="back"><img src="${src}" alt="Memory Card" /></div>`;

    card.addEventListener('click', () => handleFlip(card));
    board.appendChild(card);
});

function handleFlip(card) {
    if (lockBoard || card.classList.contains('flip') || card === firstCard) return;
    card.classList.add('flip');
    if (!firstCard) {
        firstCard = card;
        return;
    }
    const secondCard = card;
    lockBoard = true;
    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchedPairs++;
        scores[currentPlayer]++;
        updateScores();

        firstCard.removeEventListener('click', handleFlip);
        secondCard.removeEventListener('click', handleFlip);
        resetTurn();

        if (matchedPairs === 10) {
            setTimeout(() => {
                const winner = scores[1] === scores[2]
                ? 'It\'s a Tie!'
                : `Winner: Player ${scores[1] > scores[2] ? '1' : '2'}`;
                alert(`Game Over!\nPlayer 1: ${scores[1]} | Player 2: ${scores[2]}\n${winner}`);
            }, 500);
        }
    }
    else{
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            switchPlayer(); // Only switch player on wrong match
            resetTurn();
        }, 1000);
    }
}

function resetTurn(){
    [firstCard, lockBoard] = [null, false];
}

function switchPlayer(){
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('current-player').textContent = `Player ${currentPlayer}`;
}

function updateScores(){
    document.getElementById('player1-score').textContent = scores[1];
    document.getElementById('player2-score').textContent = scores[2];
}
