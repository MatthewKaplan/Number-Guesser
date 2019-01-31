var challenger1guess = document.querySelector('.challenger-guess1');
var challenger2guess = document.querySelector('.challenger-guess2');

var guessPlaceholder1 = document.querySelector('.guess-placeholder1');
var guessPlaceholder2 = document.querySelector('.guess-placeholder2');

var minRange = document.querySelector('.min-range');
var maxRange = document.querySelector('.max-range');
var minNumber = document.querySelector('#min-number');
var maxNumber = document.querySelector('#max-number');

var challengerName1 = document.querySelector('.challenger-name1');
var challengerName2 = document.querySelector('.challenger-name2');
var challenger1Name = document.querySelectorAll('.challenger1-name');
var challenger2Name = document.querySelectorAll('.challenger2-name');
var feedbackMessage1 = document.querySelector('.feedback-message1');
var feedbackMessage2 = document.querySelector('.feedback-message2');

var updateButton = document.querySelector('.update-button');
var guessSubmitButton = document.querySelector('.submit-button');

var generatedRandomNumber = randomNumber(1,100);

guessSubmitButton.addEventListener('click', playGame);

function playGame () {
  feedback1();
  feedback2();
}

console.log(generatedRandomNumber);

// Update the current range that the user enters
updateButton.addEventListener('click', function() {
  minNumber.innerText = minRange.value;
  maxNumber.innerText = maxRange.value;
});

// Display the users guesses
guessSubmitButton.addEventListener('click', function() {
  guessPlaceholder1.innerText = challenger1guess.value;
  guessPlaceholder2.innerText = challenger2guess.value;
});

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
  } else {
    feedbackMessage1.innerText = 'BOOM!'
  };
}

// Feedback message for challenger 2
function feedback2() {
  var givenNumber = parseInt(challenger2guess.value);
  if (givenNumber < generatedRandomNumber) {
    feedbackMessage2.innerText = 'That\'s too low'
  } else if (givenNumber > generatedRandomNumber) {
    feedbackMessage2.innerText = 'That\'s too high'
  } else {
    feedbackMessage2.innerText = 'BOOM!'
  };
}


// for ( var i = 0; i < challenger1Name.length; i++) {
//   challenger1Name[i].innerText = challengerName1.value;
// }

// for ( var i = 0; i < challenger2Name.length; i++) {
//   challenger2Name[i].innerText = challengerName2.value;
// }