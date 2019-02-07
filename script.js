/*----- Query Selectors -----*/
var card = document.querySelector('.right-column');
var minNumber = document.querySelector('#min-number');
var maxNumber = document.querySelector('#max-number');
var winnerName = document.querySelector('#winner-name');
var resetButton = document.querySelector('#reset-button');
var minRangeSet = document.querySelector('#min-range-set');
var maxRangeSet = document.querySelector('#max-range-set');
var updateButton = document.querySelector('#update-button');
var rangeInputBoxes = document.querySelector('.input-boxes');
var guessPlaceholder1 = document.querySelector('#ch1-guess');
var guessPlaceholder2 = document.querySelector('#ch2-guess');
var clearGameButton = document.querySelector('#clear-button');
var challengerInputBoxes = document.querySelector('.no-letters');
var guessSubmitButton = document.querySelector('#submit-button');
var challengerName1 = document.querySelector('#challenger-name1');
var challengerName2 = document.querySelector('#challenger-name2');
var challenger1Name = document.querySelector('.challenger1-name');
var challenger2Name = document.querySelector('.challenger2-name');
var challenger1guess = document.querySelector('#challenger-guess1');
var challenger2guess = document.querySelector('#challenger-guess2');
var challenger1guess = document.querySelector('#challenger-guess1');
var challenger2guess = document.querySelector('#challenger-guess2');
var feedbackMessage1 = document.querySelector('#ch1-feedback-message');
var feedbackMessage2 = document.querySelector('#ch2-feedback-message');

/*------- Globals ------*/
var minRange = parseInt(minNumber.innerText);
var maxRange = parseInt(maxNumber.innerText);
var totalGuesses = 0;
var generatedRandomNumber = randomNumber(1,100);
var random;

/*------- Event Listeners ------*/
resetButton.addEventListener('click', newGame);
updateButton.addEventListener('click', updateBtn);
clearGameButton.addEventListener('click', clearGame);
guessSubmitButton.addEventListener('click', playGame);
rangeInputBoxes.addEventListener('keydown', validateRange);
challengerInputBoxes.addEventListener('keydown', validateRange);

disableButton();

function playGame() {
  emptyNameInputs(); 
  emptyGuessInputs();
  challengersGuesses(challenger1guess, guessPlaceholder1);
  challengersGuesses(challenger2guess, guessPlaceholder2);
  guessCounter();
  feedback(challenger1guess, feedbackMessage1);
  feedback(challenger2guess, feedbackMessage2);
  challengerNames(challenger1Name, challengerName1);
  challengerNames(challenger2Name, challengerName2);
}

function clearGame() {
  clearInputs(challenger1guess, challenger2guess);
  disableButton();
}

function updateBtn() {
  customRange(minRangeSet, maxRangeSet);
}

function newGame(){
  event.preventDefault();
  clearGame();
  clearInputs(challengerName1, challengerName2);
  clearInputs(minRangeSet, maxRangeSet);
  nameError('challenger1','hidden');
  nameError('challenger2','hidden');
  guessError('challenger1','hidden');
  guessError('challenger2','hidden');
  minMaxError('min','hidden');
  minMaxError('max','hidden');
  defaultMinMaxRange();
  defaultLatestScore(challenger1Name, guessPlaceholder1, feedbackMessage1);
  defaultLatestScore(challenger2Name, guessPlaceholder2, feedbackMessage2);
  disableButton();
}

function randomNumber(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return = Math.floor(Math.random() * (max - min + 1)) + min;
}

function minMaxError(minMax, visibleHidden) {
  const error = document.querySelector(`#${minMax}-range-error`);
  error.style.visibility = visibleHidden;
}

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
    console.log(generatedRandomNumber);
  }
}

function updateRandomNumber() {
  if (!minRangeSet.value && !maxRangeSet.value) {
    maxRange += 10;
    minRange -= 10;
    document.getElementById('min-number').innerText = minRange;
    document.getElementById('max-number').innerText = maxRange;
    generatedRandomNumber = randomNumber(1,100);
    console.log(generatedRandomNumber);
    // random = randomNumber(minRange, maxRange);
    // console.log(random);
  } else {
    updateBtn();
  }
}

function challengerNames(challengerName, challengerNameInput) {
  if (!challengerNameInput.value) {
    challengerName.innerText = 'Challenger Name';
  } else {
    challengerName.innerText = challengerNameInput.value;
  }
  disableButton();
}

function nameError(challenger, visibleHidden) {
  const error = document.querySelector(`#${challenger}-name-error`);
  error.style.visibility = visibleHidden;
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

function guessCounter() {
  totalGuesses += 2;
}

function challengersGuesses(challengerGuess, guessPlaceholder) {
  minNumber = parseInt(minNumber.innerText);
  maxNumber = parseInt(maxNumber.innerText);
  challengerGuess = parseInt(challengerGuess.value);
  if (!challengerGuess) {
    guessPlaceholder.innerText = '--';
  } else if (challengerGuess < minNumber || challengerGuess > maxNumber) {
    alert('You\'r guess is out of range');
  } else {
    guessPlaceholder.innerText = challengerGuess;
  }
  disableButton();
}

function guessError(challenger, visibleHidden) {
  const error = document.querySelector(`#${challenger}-guess-error`);
  error.style.visibility = visibleHidden;
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

function updateWinnerName() {
  if (parseInt(challenger1guess.value) === generatedRandomNumber) {
    displayCard(challengerName1);
    totalGuesses = 0;
    updateRandomNumber();
  } else if (parseInt(challenger2guess.value) === generatedRandomNumber) {
    displayCard(challengerName2);
    totalGuesses = 0;
    updateRandomNumber();
  } else {
    return;
  }
}

function disableButton() {
  if (document.querySelector('#challenger-name1').value === '') {
    document.getElementById("reset-button").disabled = true;
    document.getElementById("reset-button").classList.add('disabled');
  } else {
    document.getElementById("reset-button").disabled = false;
    document.getElementById("reset-button").classList.remove('disabled');
  }

  if (document.querySelector('#challenger-guess1').value !== '' || document.querySelector('#challenger-guess2').value !== '') {
    document.getElementById("clear-button").disabled = false;
    document.getElementById("clear-button").classList.remove('disabled');
  } else {
    document.getElementById("clear-button").disabled = true;
    document.getElementById("clear-button").classList.add('disabled');
  }
}

function validateRange(e) {
  var regex = /[\t\n\b0-9]/;
  if (e.key === 'Backspace' || regex.test(e.key)) {
  } else {
    e.preventDefault();
  }
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
        <p class="bold minutes">0.00 </p>
        <p>minutes</p>
      </div>
      <div>
        <button class="delete-button">x</button>
      </div>
    </article>  
  </section>`
  card.innerHTML += winningCard;
  card.addEventListener('click', deleteCard);
}
  
function deleteCard(e) {
  if (e.target.classList.contains('delete-button')) {
    e.target.parentElement.parentElement.parentElement.remove();
  }
}

function clearInputs(input1, input2) {
  input1.value = '';
  input2.value = '';
}

function defaultMinMaxRange() {
  minNumber.innerText = '1';
  maxNumber.innerText = '100';
  generatedRandomNumber = randomNumber(1,100);
  console.log(generatedRandomNumber);
}

function defaultLatestScore (challengerName, challengerGuess, feedbackMessage) {
  challengerName.innerText = 'Challenger Name';
  challengerGuess.innerText = '--';
  feedbackMessage.innerText = 'Play Again!'
}

console.log(generatedRandomNumber);