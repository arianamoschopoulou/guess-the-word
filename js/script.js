const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numberOfRemainingGuesses = document.getElementById("guesses-left");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuessesNumber = 3;

const getWord = async function () {
    const request = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    console.log(words);
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    symbols(word);
    
};

getWord();

const symbols = function(word) {
    const placeholderLetters = [];
    for (let letters of word) {
       console.log(letters);
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
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messages.innerText = "Guess a letter in the field below";
    } else if (input.length > 1) {
        messages.innerText = "Please only enter one value";
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Please only enter a letter from A to Z";
    } else {
    return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase(); 
    if (guessedLetters.includes(guess)) {
        messages.innerText = "You already guessed this.  Try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        remainingGuessesCount(guess);
        showGuessedLetters();
        correctLetters(guessedLetters);
    }
};

const showGuessedLetters = function() {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerHTML = letter;
        guessedLettersList.append(li);
    }
};

const correctLetters = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letters of wordArray) {
        if (guessedLetters.includes(letters)) {
            revealWord.push(letters.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
console.log(revealWord);
wordInProgress.innerText= revealWord.join("");
checkForCorrectWord();
};

const remainingGuessesCount = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        messages.innerText = "Try again";
        remainingGuessesNumber -= 1;
    } else {
        messages.innerText = "Well Done!";
    }

    if (remainingGuessesNumber === 0) {
        messages.innerText = `Sorry, game over, the word was ${word}`;
        startOver();
    } else if (remainingGuessesNumber === 1) {
        numberOfRemainingGuesses.innerText = `${remainingGuessesNumber} guess`;
    } else {
        numberOfRemainingGuesses.innerText = `${remainingGuessesNumber} guesses`;
    }

};

const checkForCorrectWord = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    } 

};

const startOver = function () {
        guessButton.classList.add("hide");
       // numberOfRemainingGuesses.classList.add("hide");
        remainingGuesses.classList.add("hide");
        playAgainButton.classList.remove("hide");
        guessedLettersList.classList.add("hide");

    };

playAgainButton.addEventListener("click", function() {
    messages.classList.remove("win");
    guessedLetters =[];
    remainingGuessesNumber = 3;
    numberOfRemainingGuesses.innerText = `${remainingGuessesNumber} guesses`;
    guessedLettersList.innerHTML= "";
    messages.innerText = "";
    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuesses.classList.remove("hide");
    guessedLettersList.classList.remove("hide");

});