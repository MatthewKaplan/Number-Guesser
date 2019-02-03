var challenger1guess = document.querySelector('#challenger-guess1');
var challenger2guess = document.querySelector('#challenger-guess2');
var guessPlaceholder1 = document.querySelector('#ch1-guess');
var guessPlaceholder2 = document.querySelector('#ch2-guess');

// var ch1Guess = parseInt(challenger1guess.value);

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

var winnerName = document.querySelector('#winner-name');

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
  updateWinnerName();
}

// Testing Random number generater in the console
console.log(generatedRandomNumber);

// Update the current range that the user enters and randomly generates a number between that range
function updateRange() {
  var minRange = parseInt(minRangeSet.value);
  var maxRange = parseInt(maxRangeSet.value);
  console.log('50',minRange,maxRange)
  if (minRange >= maxRange) {
    alert('Please make max range number larger then min range number');
  } else{ 
  minNumber.innerText = minRange;
  maxNumber.innerText = maxRange;
  }
  generatedRandomNumber = randomNumber(minRange,maxRange);
  console.log('58',generatedRandomNumber, minRange, maxRange);
};

function challengersGuesses() {
  if (challenger1guess.value === '') {
    guessPlaceholder1.innerText = '97'
  } else {
    guessPlaceholder1.innerText = challenger1guess.value;
  }

  if (challenger2guess.value === '') {
    guessPlaceholder2.innerText = '3'
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
    feedbackMessage1.innerText = 'That\'s too low'
  } else if (givenNumber > generatedRandomNumber) {
    feedbackMessage1.innerText = 'That\'s too high'
  } else if (givenNumber === generatedRandomNumber) {
    feedbackMessage1.innerText = 'BOOM!'
  } else {
    feedbackMessage1.innerText = 'That\'s too high'
  }
}

// Feedback message for challenger 2
function feedback2() {
  var givenNumber = parseInt(challenger2guess.value);
  if (givenNumber < generatedRandomNumber) {
    feedbackMessage2.innerText = 'That\'s too low'
  } else if (givenNumber > generatedRandomNumber) {
    feedbackMessage2.innerText = 'That\'s too high'
  } else if (givenNumber === generatedRandomNumber) {
    feedbackMessage2.innerText = 'BOOM!'
  } else {
    feedbackMessage2.innerText = 'That\'s too low'
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
    alert('please enter a name')
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

//Sets the input field to only take numbers
// function numericalValueOnly(minRangeSet, maxRangeSet challenger1guess, challenger2guess){
//   var numerical = 0-9;
//   if ( minRangeSet())
//     {
// alert('Your registration number have accepted : you can try another');
// document.form1.text1.focus();
// return true;
// }
// else
// {
// alert('Please input alphanumeric characters only');
// return false;
// }
// } 
//Sets the winner name in the right column if they guess the exact number
function updateWinnerName(){
  console.log ('guesses',typeof(challenger1guess.value),parseInt(challenger1guess.value),parseInt(challenger2guess.value),generatedRandomNumber);
  if (parseInt(challenger1guess.value) === generatedRandomNumber){
   return winnerName.innerText = challengerName1.value;
  }else if (parseInt(challenger2guess.value) === generatedRandomNumber) {
    return winnerName.innerText = challengerName2.value;
  }else {
    return winnerName.innerText = 'Challenger Name';
  }
}
