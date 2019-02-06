var challenger1guess = document.querySelector('#challenger-guess1');
var challenger2guess = document.querySelector('#challenger-guess2');
var guessPlaceholder1 = document.querySelector('#ch1-guess');
var guessPlaceholder2 = document.querySelector('#ch2-guess');

var minRangeSet = document.querySelector('#min-range-set');
var maxRangeSet = document.querySelector('#max-range-set');
var minNumber = document.querySelector('#min-number');
var maxNumber = document.querySelector('#max-number');

var challengerName1 = document.querySelector('#challenger-name1');
var challengerName2 = document.querySelector('#challenger-name2');

var challenger1Name = document.querySelector('.challenger1-name');
var challenger2Name = document.querySelector('.challenger2-name');

var feedbackMessage1 = document.querySelector('#ch1-feedback-message');
var feedbackMessage2 = document.querySelector('#ch2-feedback-message');
var updateButton = document.querySelector('#update-button');
var guessSubmitButton = document.querySelector('#submit-button');
var clearGameButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
var generatedRandomNumber = randomNumber(1,100);

var card = document.querySelector('.right-column');
var winnerName = document.querySelector('#winner-name');

guessSubmitButton.addEventListener('click', playGame);
clearGameButton.addEventListener('click', clearGame);
updateButton.addEventListener('click', update);
resetButton.addEventListener('click', newGame);

// Function that calls Feedback functions when submit button is hit 
function playGame () {
  emptyNameInputs(); 
  emptyGuessInputs();
  startTimer ();
  challengersGuesses(challenger1guess, guessPlaceholder1);
  challengersGuesses(challenger2guess, guessPlaceholder2);
  guessCounter();
  feedback(challenger1guess, feedbackMessage1);
  feedback(challenger2guess, feedbackMessage2);
  challengerNames(challenger1Name, challengerName1);
  challengerNames(challenger2Name, challengerName2);
}

function update () {
  customRange(minRangeSet, maxRangeSet);
}

function clearGame(){
  clearInputs(challenger1guess, challenger2guess);
  clearInputs(challengerName1, challengerName2);
  clearInputs(minRangeSet, maxRangeSet);
  nameError('challenger1','hidden');
  nameError('challenger2','hidden');
  guessError('challenger1','hidden');
  guessError('challenger2','hidden');
  minMaxError('min','hidden');
  minMaxError('max','hidden');
  defaultMinMaxRange();
}

// Sets game to initial state
function newGame(){
  event.preventDefault();
  clearGame();
};

// Makes sure min and max are numerical values then creates a random number 
function randomNumber(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Testing Random number generater in the console
console.log(generatedRandomNumber);

function minMaxError(minOrmax, visibleOrhidden) {
  const error = document.querySelector(`#${minOrmax}-range-error`);
  error.style.visibility = visibleOrhidden;
}

// Update the current range that the user enters and randomly generates a number between that range

function customRange(customMinRange, customMaxRange) {

  customMinRange = parseInt(customMinRange.value);
  customMaxRange = parseInt(customMaxRange.value);

  if (!customMinRange && !customMaxRange) {
    minMaxError('min','visible');
    minMaxError('max','visible');
    return;
  } else if (!customMinRange) {
    minMaxError('min','visible');
    minMaxError('max','hidden');
  } else if (!customMaxRange) {
    minMaxError('max','visible');
    minMaxError('min','hidden');
  } else if (customMinRange >= customMaxRange) {
    alert('Please make max range number larger then min range number');
  } else {
    minMaxError('min','hidden');
    minMaxError('max','hidden');
    minNumber.innerText = customMinRange;
    maxNumber.innerText = customMaxRange;
    generatedRandomNumber = randomNumber(customMinRange,customMaxRange);
  }
  console.log(generatedRandomNumber);
};


//Checks that challenger guesses are in the range and if they are then assigns them.
function challengersGuesses(challengerGuess, guessPlaceholder) {

  challengerGuess = parseInt(challengerGuess.value);
  minNumber = parseInt(minNumber.innerText);
  maxNumber = parseInt(maxNumber.innerText);

  if (!challengerGuess) {
    guessPlaceholder.innerText = '--'
  } else if (challengerGuess < minNumber || challengerGuess > maxNumber) {
    alert('Nope, that is outside of the range');
  } else {
    guessPlaceholder.innerText = challengerGuess;
  }
}

function feedback(challengerGuess, feedbackMessage) {
  challengerGuess = parseInt(challengerGuess.value);
  if (!challengerGuess){
    feedbackMessage.innerText = 'Stop messing around'
  } else if (challengerGuess < generatedRandomNumber) {
    feedbackMessage.innerText = 'that\'s too low'   
  } else if (challengerGuess > generatedRandomNumber) {
    feedbackMessage.innerText = 'that\'s too high'
  } else {
    feedbackMessage.innerText = 'BOOM!'
    updateWinnerName();
  } 
}

function challengerNames(challengerName, challengerNameInput) {
  if (!challengerNameInput.value) {
    challengerName.innerText = 'Challenger Name';
  } else {
    challengerName.innerText = challengerNameInput.value;
  }
};

function guessError(challenger1Orchallenger2, visibleOrhidden) {
  const error = document.querySelector(`#${challenger1Orchallenger2}-guess-error`);
  error.style.visibility = visibleOrhidden;
}

function emptyGuessInputs() {
  if (!challenger1guess.value && !challenger2guess.value) {
    guessError('challenger1','visible');
    guessError('challenger2','visible');
  } else if (!challenger1guess.value) {
    guessError('challenger1','visible');
    guessError('challenger2','hidden');
  } else if (!challenger2guess.value) {
    guessError('challenger2','visible');
    guessError('challenger1','hidden');
  } else {
    guessError('challenger1','hidden');
    guessError('challenger2','hidden');
  }
}

function nameError(challenger1Orchallenger2, visibleOrhidden) {
  const error = document.querySelector(`#${challenger1Orchallenger2}-name-error`);
  error.style.visibility = visibleOrhidden;
}

function emptyNameInputs() {
  if (!challengerName1.value && !challengerName2.value) {
    nameError('challenger1','visible');
    nameError('challenger2','visible');
  } else if (!challengerName1.value) {
    nameError('challenger1','visible');
    nameError('challenger2','hidden');
  } else if (!challengerName2.value) {
    nameError('challenger2','visible');
    nameError('challenger1','hidden');
  } else {
    nameError('challenger1','hidden');
    nameError('challenger2','hidden');
  }
}

function clearInputs(field1, field2) {
  field1.value = '';
  field2.value = '';
}

function defaultMinMaxRange() {
  minNumber.innerText = '1';
  maxNumber.innerText = '100';
  generatedRandomNumber = randomNumber(1,100);
  console.log(generatedRandomNumber);
}

//Sets the winner name in the right column if they guess the exact number
function updateWinnerName(){
  if (parseInt(challenger1guess.value) === generatedRandomNumber){
   displayCard(challengerName1);
   totalGuesses = 0;
  }else if (parseInt(challenger2guess.value) === generatedRandomNumber) {
    displayCard(challengerName2);
    totalGuesses = 0;
  }else {
    return;
  }
}

// Guess Counter 
var totalGuesses = 0;
function guessCounter () {
  totalGuesses += 2;
}
  

var rangeInputBoxes = document.querySelector('.input-boxes');

rangeInputBoxes.addEventListener('keydown', validateRange);

function validateRange(e) {
  console.log(typeof e.key);
  var regex = /[\b0-9]/;
  if (e.key === 'Backspace') {
    console.log('BACK');
  }

  if (e.key === 'Backspace' || regex.test(e.key)) {

  } else {
    e.preventDefault();
  }
}

// Start Timer
var startTime = 0;
function startTimer () {
  startTime = Date.now();
}

// End Timer
var endTime = 0;
function endTimer () {
  var endTime = Date.now();
  var totalTime = (endTime - startTime) / 1000;
  console.log('total ' + totalTime);
  minutes = totalTime.toFixed(2);
}

function displayCard(winner) {
  let winningCard = `
  <section class="card-results">
    <article class="card-header">
      <p class="challenger1-name">${challengerName1.value}</p>
      <p> vs </p>
      <p class="challenger2-name">${challengerName2.value}</p>
    </article>
    <hr>
    <article class="card-body">
      <p id="winner-name">${winner.value}</p>
      <p class="winner">WINNER</p>
    </article>
    <hr>
    <article class="card-footer">
      <div class="footer-flex">
        <p class="bold">${totalGuesses}</p>
        <p class="guesses">guesses</p>
      </div>
      <div class="footer-flex">
        <p class="bold">1.35 </p>
        <p>minutes</p>
      </div>
      <div>
        <button class="delete-button">X</button>
      </div>
    </article>  
  </section>`
  endTimer ();
  card.innerHTML += winningCard;
  card.addEventListener('click', deleteCard);
}
  
function deleteCard(e) {
  if (e.target.classList.contains('delete-button')) {
    console.log('test');
    e.target.parentElement.parentElement.parentElement.remove();
  }
};