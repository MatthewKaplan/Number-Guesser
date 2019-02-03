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
var challenger1Name = document.querySelectorAll('.challenger1-name');
var challenger2Name = document.querySelectorAll('.challenger2-name');
var feedbackMessage1 = document.querySelector('#ch1-feedback-message');
var feedbackMessage2 = document.querySelector('#ch2-feedback-message');
var updateButton = document.querySelector('#update-button');
var guessSubmitButton = document.querySelector('#submit-button');
var clearGameButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
var generatedRandomNumber = randomNumber(1,100);

guessSubmitButton.addEventListener('click', playGame);
clearGameButton.addEventListener('click', clearGame);
updateButton.addEventListener('click', updateRange);
resetButton.addEventListener('click', newGame);

// Function that calls Feedback functions when submit button is hit 
function playGame () {
  emptyNameInputs(); 
  emptyGuessInputs();
  feedback1();
  feedback2();
  challengersGuesses();
  challengerNames();
}

// Testing Random number generater in the console
console.log(generatedRandomNumber);

// Update the current range that the user enters and randomly generates a number between that range
function updateRange() {

  minRangeSet = parseInt(minRangeSet.value);
  maxRangeSet = parseInt(maxRangeSet.value);

  if ( minRangeSet.length <= 0 || maxRangeSet.length <= 0 ) {
    alert('Please enter a minimum and maximum range');
  } else if (minRangeSet >= maxRangeSet) {
    alert('Please make max range number larger then min range number');
  } else {
    minNumber.innerText = minRangeSet;
    maxNumber.innerText = maxRangeSet;
  }

  var generatedRandomNumber = randomNumber(minRangeSet,maxRangeSet);
  console.log(generatedRandomNumber);
  clearGame();
};

function challengersGuesses() {
  if (challenger1guess.value === '') {
    guessPlaceholder1.innerText = '97'
  } else if (challenger1guess.value < minRangeSet || challenger1guess.value > maxRangeSet) {
    alert('Nope that is outside of the range')
  } else {
    guessPlaceholder1.innerText = challenger1guess.value;
  }

  if (challenger2guess.value === '') {
    guessPlaceholder2.innerText = '3'
    } else if (challenger2guess.value < minRangeSet || challenger2guess.value > maxRangeSet) {
      alert('Nope that is outside of the range')
    } else {
    guessPlaceholder2.innerText = challenger2guess.value;
  }
}

// Makes sure min and max are numerical values then creates a 
function randomNumber(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Feedback message for challenger 1
function feedback1() {
  var givenNumber = parseInt(challenger1guess.value);
  if (givenNumber < generatedRandomNumber) {
    feedbackMessage1.innerText = 'that\'s too low'
  } else if (givenNumber > generatedRandomNumber) {
    feedbackMessage1.innerText = 'that\'s too high'
  } else if (givenNumber === generatedRandomNumber) {
    feedbackMessage1.innerText = 'BOOM!'
  } else {
    feedbackMessage1.innerText = 'that\'s too high'
  }
}

// Feedback message for challenger 2
function feedback2() {
  var givenNumber = parseInt(challenger2guess.value);
  if (givenNumber < generatedRandomNumber) {
    feedbackMessage2.innerText = 'that\'s too low'
  } else if (givenNumber > generatedRandomNumber) {
    feedbackMessage2.innerText = 'that\'s too high'
  } else if (givenNumber === generatedRandomNumber) {
    feedbackMessage2.innerText = 'BOOM!'
  } else {
    feedbackMessage2.innerText = 'that\'s too low'
  }
}

// Changes name placeholders to user inputs 
function challengerNames() {
  for ( var i = 0; i < challenger1Name.length; i++) {
    if (challengerName1.value === '') {
      challenger1Name[i].innerText = 'Challenger 1 Name'
    } else {
      challenger1Name[i].innerText = challengerName1.value;
    }
};

  for ( var i = 0; i < challenger2Name.length; i++) { 
    if(challengerName2.value === '') {
      challenger2Name[i].innerText = 'Challenger 2 Name'
    } else {
      challenger2Name[i].innerText = challengerName2.value;
    }
};
}

function emptyGuessInputs() {
  if (challenger1guess.value === '' || challenger2guess.value === '') {
    alert('Please enter a guess')
  }
}

function emptyNameInputs() {
  if (challengerName1.value === '' || challengerName2.value === '') {
    alert('Please enter a name')
  }
}

function clearGame(){
  challenger1guess.value = '';
  challenger2guess.value = '';
  challengerName1.value = '';
  challengerName2.value = '';
  minRangeSet.value = '';
  maxRangeSet.value = '';
}

// Sets game to initial state
function newGame(){
  clearGame();
  challengerNames();
  challengersGuesses();
  feedback1();
  feedback2();
  var generatedRandomNumber = randomNumber(1,100);
  console.log(generatedRandomNumber);
  minNumber.innerText = '1';
  maxNumber.innerText = '100';
};