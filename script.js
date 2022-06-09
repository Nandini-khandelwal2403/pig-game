'use strict';

//selecting elements
const player0El = document.querySelector('.player--1');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentscore, activePlayer, playing;
//starting conditions

const init = function () {
    currentscore = 0;
    activePlayer = 0;
    playing = true;
    scores = [0, 0];
    diceEl.classList.add('hidden');

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init(); //initializing

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentscore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
//rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1. generating a dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //3. check for rolled 1:
        if (dice !== 1) {
            //add dice to the current score
            currentscore += dice;
            console.log(currentscore);
            document.querySelector(`#current--${activePlayer}`).textContent = currentscore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        //1. add current score to the active player score
        scores[activePlayer] += currentscore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. chech score>=100? 

        if (scores[activePlayer] >= 30) {
            //player wins game finish
            diceEl.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            // switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
