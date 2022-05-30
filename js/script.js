const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numberOfRemainingGuesses = document.getElementById("guesses-left");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

const symbols = function(word) {
    const placeholderLetters = [];
    for (let letters of word) {
       // console.log(letters);
       placeholderLetters.push("●");
   }
   wordInProgress.innerText = placeholderLetters.join("");
};

symbols(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    messages.innerText = "";
    const guess = inputLetter.value;
    //console.log(guess);
    const goodGuess = guessesAccepted(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    inputLetter.value = "";
});

const guessesAccepted = function (input){
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        messages.innerText = "Guess a letter in the field below"
    } else if (input.length > 1) {
        messages.innerText = "Please only enter one value"
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Please only enter a letter from A to Z"
    } else {
    return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase(); 
    if (guessedLetters.includes(guess)) {
        messages.innerText = "You already guessed this.  Try again"
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};