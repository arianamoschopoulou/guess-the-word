const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numberOfRemainingGuesses = document.getElementById("guesses-left");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

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
    let guess = inputLetter.value;
    console.log(guess);
    inputLetter.value = "";
});

