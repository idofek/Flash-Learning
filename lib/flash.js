"use strict";
class Flashcard {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
    getQuestion() {
        return this.question;
    }
    getAnswer() {
        return this.answer;
    }
    isCorrect(userAnswer) {
        const correctAnswer = this.answer.toLowerCase();
        const providedAnswer = userAnswer.toLowerCase();
        return correctAnswer === providedAnswer;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("Setting page up");
    setup();
    console.log("Called setup");
});
function setup() {
    let flashcardText = document.querySelector("#flash-question");
    if (flashcardText !== null && frenchFlashcards[0] != null) {
        flashcardText.innerHTML = frenchFlashcards[0].question;
        console.log(frenchFlashcards[0].question);
    }
    else {
        console.error("Element with id 'flash-question' not found");
    }
}
const frenchFlashcards = [
    new Flashcard("What does bonjour mean in english?", "hello"),
    new Flashcard('What is the English translation of "au revoir?', "goodbye"),
    new Flashcard('Translate "merci" to English', "thank you"),
    new Flashcard('What does "s\'il vous plaît" mean in English?', "please"),
    new Flashcard("What does merci beaucoup mean in English?", "thank you very much"),
    new Flashcard('Translate "excusez-moi" to English', "excuse me"),
    new Flashcard('How do you say "yes" in French?', "oui"),
    new Flashcard('What is the English translation of "non"?', "no"),
    new Flashcard('Translate "comment ça va?" to English', "how are you?"),
    new Flashcard('Translate "aujourd\'hui" to English', "today"),
];
var remainingCards = [];
var correctLis = [];
var wrongList = [];
var cardsLearned = 0;
var currentCard = frenchFlashcards[0];
function flip() {
    let flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        if (flashcardText.innerHTML === currentCard.question) {
            flashcardText.innerHTML = currentCard.answer;
        }
        else if ((flashcardText === null || flashcardText === void 0 ? void 0 : flashcardText.innerHTML) === (currentCard === null || currentCard === void 0 ? void 0 : currentCard.answer)) {
            flashcardText.innerHTML = currentCard.question;
        }
    }
}
function changeStage12() {
    console.log("Starting change from stage 1 to stage 2");
    let learningButtons = document.getElementById("learning");
    if (learningButtons) {
        learningButtons.style.display = "none";
    }
    let answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "flex";
    }
    let flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        flashcardText.innerHTML = currentCard.question;
    }
}
function changeStage21() {
}
function checkTranslation() {
    let translation = document.getElementById("flashcard-input");
    if (translation && currentCard) {
        console.log(translation.value);
        let text = translation.value.toLowerCase();
        if (text === currentCard.answer) {
            console.log("Answer is correct");
        }
        else {
            console.log("Answer is wrong");
        }
    }
}
//# sourceMappingURL=flash.js.map