var Flashcard = /** @class */ (function () {
    function Flashcard(question, answer) {
        this.question = question;
        this.answer = answer;
    }
    Flashcard.prototype.getQuestion = function () {
        return this.question;
    };
    Flashcard.prototype.getAnswer = function () {
        return this.answer;
    };
    Flashcard.prototype.isCorrect = function (userAnswer) {
        var correctAnswer = this.answer.toLowerCase();
        var providedAnswer = userAnswer.toLowerCase();
        return correctAnswer === providedAnswer;
    };
    return Flashcard;
}());
/*
// Add an event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  // Call your setup function when the DOM is ready
  console.log("Setting page up");
  setup();
  console.log("Called setup");
});

*/
//Function to setup the inital learning page
function setup() {
    var flashcardText = document.querySelector("#flash-question");
    if (flashcardText !== null && frenchFlashcards[0] != null) {
        flashcardText.innerHTML = frenchFlashcards[0].question;
        console.log(frenchFlashcards[0].question);
    }
    else {
        console.error("Element with id 'flash-question' not found");
    }
}
//The list of cards that we are going to study
var frenchFlashcards = [
    new Flashcard("What does bonjour mean in english?", "Hello"),
    new Flashcard('What is the English translation of "au revoir?', "Goodbye"),
    /*
    new Flashcard('Translate "merci" to English', "Thank you"),
    new Flashcard('What does "s\'il vous plaît" mean in English?', "Please"),
    new Flashcard(
      "What does merci beaucoup mean in English?",
      "Thank you very much"
    ),
    new Flashcard('Translate "excusez-moi" to English', "Excuse me"),
    new Flashcard('How do you say "yes" in French?', "Oui"),
    new Flashcard('What is the English translation of "non"?', "No"),
    new Flashcard('Translate "comment ça va?" to English', "How are you?"),
    new Flashcard('Translate "aujourd\'hui" to English', "Today"),
    */
];
var stage1Description = "Stage 1: Introducing New Cards – Familiarize yourself with a new flashcard pair.";
var stage2Description = "Stage 2: Initial Recall – Test your memory by typing in the answer to the presented question.";
var stage3Description = "Stage 3: Comprehensive Review – Review all flashcards, aiming for perfect recall.";
var stage4Description = "Stage 4: Correcting Mistakes – Address and correct any mistakes made during the review.";
//This array will have all of the cards that the user has seen and will need to study
var remainingCards = [];
//This array will have all of the cards that the user got correct in a certain level
var correctList = [];
//This array will have all of the cards that the user got wrong in a certain level
var wrongList = [];
var cardsLearned = 0;
shuffle(frenchFlashcards);
var currentCard = frenchFlashcards[0];
var stage = 1;
var lastInput = "";
//Different stages:
//Stage 1: Learning a new card
//  Show both the answer and the definition
//  Wait until they are ready to move on
//Stage 2: Typing answer to new card
//  If they get it correct then move to stage three
//  If they get it wrong then move to stage 1 again with the same card
//Stage 3: Flashcard is added to the "correct list" cards & have to get all cards correct
//  The user has to correctly type the answer to each card in the "correct list"
//  Any of the questions that the user gets wrong gets added into a new list and they move to stage 4
//  If the user gets all of the cards correct then they go to stage 1 with a new card
//Stage 4: Getting all of the wrong answers right
//  The user goes through all of the answers that they got wrong last time
//  If they get the question correct then it is removed from the list
//  If they get the question wrong then it stays on the list and they stay at stage 4 until all questions are removed
//  Once the user has all of the questions removed from the wrong pile they can choose if they want to attempt stage three again
//  by pressing r (redo) or s (skip) for going and learning a new word
//Stage 5:Finished learning all of the cards
//  Give them a congratulations message and set studying to false to finish the method
//Used to change the text shown from question to anser or answer to question
function flip() {
    var flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        if (flashcardText.innerHTML === currentCard.question) {
            flashcardText.innerHTML = currentCard.answer;
        }
        else if ((flashcardText === null || flashcardText === void 0 ? void 0 : flashcardText.innerHTML) === (currentCard === null || currentCard === void 0 ? void 0 : currentCard.answer)) {
            flashcardText.innerHTML = currentCard.question;
        }
    }
}
//Used to change the stage from 1 to 2
function changeStage12() {
    console.log("Starting change from stage 1 to stage 2");
    stage = 2;
    console.log("New stage: " + stage);
    var learningButtons = document.getElementById("learning");
    if (learningButtons) {
        learningButtons.style.display = "none";
    }
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "flex";
    }
    var flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        flashcardText.innerHTML = currentCard.question;
    }
}
function changeStageNext2() {
    console.log("Starting change from stage 1 to stage 2");
    stage = 2;
    var nextPage = document.getElementById("transitionStage");
    if (nextPage) {
        nextPage.style.display = "none";
    }
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "flex";
    }
    var flashcardText = document.getElementById("flash-question");
    if (flashcardText && currentCard) {
        flashcardText.style.display = "flex";
        flashcardText.innerHTML = currentCard.question;
    }
}
//Changing from stage 2 to 1 if the user got the answer wrong
function changeStage21Wrong() {
    console.log("Starting change from stage 2 to stage 1");
    stage = 1;
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "none";
    }
    var learningButtons = document.getElementById("learning");
    if (learningButtons) {
        learningButtons.style.display = "flex";
    }
    var flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        flashcardText.innerHTML = currentCard.question;
    }
}
//Changing from stage 2 to 1 if the user got the answer correct (would be the first one)
function changeStage21Correct() {
    console.log("Starting change from stage 2 to stage 1");
    stage = 1;
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "none";
    }
    var learningButtons = document.getElementById("learning");
    if (learningButtons) {
        learningButtons.style.display = "flex";
    }
    //Updating the cards learned count
    //cardsLearned++;
    //Updating the current question
    if (cardsLearned <= frenchFlashcards.length &&
        frenchFlashcards[cardsLearned] !== undefined) {
        currentCard = frenchFlashcards[cardsLearned];
    }
    else {
        console.log("Reached the last question");
        console.log("".concat(cardsLearned, ">").concat(frenchFlashcards.length));
    }
    var flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        flashcardText.innerHTML = currentCard.question;
    }
}
function changeStage23() {
    stage = 3;
    shuffle(remainingCards);
    currentCard = remainingCards[0];
    var flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        flashcardText.innerHTML = currentCard.question;
    }
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "flex";
    }
}
//Checking if the current input is correct
function checkTranslationInitial() {
    var translation = (document.getElementById("flashcard-input"));
    lastInput = translation.value.toLowerCase();
    if (translation && currentCard) {
        console.log(translation.value);
        var text = translation.value.toLowerCase();
        if (text === currentCard.answer.toLowerCase()) {
            console.log("Answer is correct");
            translation.value = "";
            answerRight();
            /*
                if(cardsLearned === 0){
                  //If the user just finised learning the first card
                  changeStage21Correct();
                }else if(cardsLearned === frenchFlashcards.length - 1){
                  //Learned the last card
                    window.location.href = "index.html";
                }else{
                  //Finished learning one of the middle cards
                  remainingCards.push(currentCard);
                  changeStage23();
                }
      
                */
        }
        else {
            console.log("Answer is wrong");
            translation.value = "";
            answerWrong();
            //changeStage21Wrong();
        }
    }
}
//If the answer is right then change the text so that only correct shows up
function answerRight() {
    //Hide the answers
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "none";
    }
    var flashcardText = document.getElementById("flash-question");
    if (flashcardText) {
        flashcardText.style.display = "none";
    }
    //Hide override
    var override = document.getElementById("override-button");
    if (override) {
        override.style.display = "none";
    }
    var correctness = document.getElementById("correctness");
    if (correctness) {
        correctness.style.display = "flex";
    }
    var correctText = document.getElementById("rightWrong");
    if (correctText) {
        correctText.innerHTML = "Correct";
        correctText.style.color = "#013220";
    }
    console.log(stage);
}
function answerWrong() {
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "none";
    }
    var flashcardText = document.getElementById("flash-question");
    if (flashcardText) {
        flashcardText.style.display = "none";
    }
    var correctness = document.getElementById("correctness");
    if (correctness) {
        correctness.style.display = "flex";
    }
    var correctText = document.getElementById("rightWrong");
    if (correctText) {
        correctText.innerHTML = "Wrong";
        correctText.style.color = "#8B0000";
    }
    var override = document.getElementById("override-button");
    if (override) {
        override.style.display = "block";
    }
}
function checkTranslation() {
    //if (stage === 2) {
    checkTranslationInitial();
    //} else {
    //lastInput = translation.value.toLowerCase();
    //}
}
//Remove the text (that says if the button is correct or not)
//Removes the button that continues
//Put back the correct elements
//Do this by calling changeStage21Correct()
function continued() {
    transitionToNextPage();
    /*
    if (stage === 2) {
      continueStage2();
    } else if (stage === 3) {
      continueStage3();
    } else if (stage === 4) {
      continueStage4();
    }
    */
}
function continueStage2() {
    var nextPage = document.getElementById("transitionStage");
    if (nextPage) {
        nextPage.style.display = "none";
    }
    var flashcardText = document.getElementById("flash-question");
    if (flashcardText) {
        flashcardText.style.display = "block";
    }
    //Not sure if this is okay or not
    var answerCorrect = lastInput === (currentCard === null || currentCard === void 0 ? void 0 : currentCard.answer.toLocaleLowerCase());
    console.log("Answer is " + answerCorrect);
    if (stage === 2 && answerCorrect === true && currentCard != undefined) {
        //Add the card to the remaining card list
        remainingCards.push(currentCard);
        //Go to stage three with the correct cards
        changeStage23();
    }
    else if (stage === 2 && answerCorrect === false) {
        changeStage21Wrong();
    }
}
function continueStage3() {
    //This is when the user is in the middle of answering all of the remaining flashcards and they get one either right or wrong
    var nextPage = document.getElementById("transitionStage");
    if (nextPage) {
        nextPage.style.display = "none";
    }
    var flashcardText = document.getElementById("flash-question");
    if (flashcardText) {
        flashcardText.style.display = "block";
    }
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "flex";
    }
    //Not sure if this is okay or not
    var answerCorrect = lastInput === (currentCard === null || currentCard === void 0 ? void 0 : currentCard.answer.toLocaleLowerCase());
    console.log("Answer is " + answerCorrect);
    if (answerCorrect && currentCard != undefined) {
        //Push the card to the correct list
        correctList.push(currentCard);
        //Remove current card from the remaining list
        var index = remainingCards.indexOf(currentCard);
        if (index !== -1) {
            remainingCards.splice(index, 1);
        }
        console.log("Moved card to correctList");
    }
    else if (currentCard != undefined) {
        //Push the card to the wrong list
        wrongList.push(currentCard);
        //Remove the card from the remianing list
        var index = remainingCards.indexOf(currentCard);
        if (index !== -1) {
            remainingCards.splice(index, 1);
        }
        console.log("Moved card to wrongList");
    }
    //Check if there are any remianing cards left to be learned
    if (remainingCards.length != 0) {
        currentCard = remainingCards[0];
        //Update the text
        var flashcardText_1 = document.querySelector("#flash-question");
        if (flashcardText_1 && currentCard) {
            flashcardText_1.innerHTML = currentCard.question;
        }
    }
    else {
        //There are no more cards left in remaining cards
        //If there are wrong answers then the user has to get all of them right
        if (wrongList.length != 0) {
            stage = 4;
            //Set up stage 4
            changeStage34();
        }
        else {
            //If there are no wrong answers then the user can move onto a new card
            //Check if we learned all of the cards
            if (cardsLearned === frenchFlashcards.length - 1) {
                //If we did then we finish and go to stage 5
                stage = 5;
                //TODO: Set up stage 5
                complete();
            }
            else {
                stage = 1;
                cardsLearned++;
                moveToDifferentList(remainingCards, correctList);
                currentCard = frenchFlashcards[cardsLearned];
                changeStage31();
            }
        }
    }
}
function continueStage4() {
    var nextPage = document.getElementById("transitionStage");
    if (nextPage) {
        nextPage.style.display = "none";
    }
    var flashcardText = document.getElementById("flash-question");
    if (flashcardText) {
        flashcardText.style.display = "block";
    }
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "flex";
    }
    var answerCorrect = lastInput === (currentCard === null || currentCard === void 0 ? void 0 : currentCard.answer.toLocaleLowerCase());
    console.log("Answer is " + answerCorrect);
    if (answerCorrect && currentCard != undefined) {
        //Push the card to the correct list
        correctList.push(currentCard);
        //Remove the card from the wrong list
        var index = wrongList.indexOf(currentCard);
        if (index !== -1) {
            wrongList.splice(index, 1);
        }
        //Check if wrongList is empty
        if (wrongList.length != 0) {
            currentCard = wrongList[0];
            var flashcardText_2 = document.querySelector("#flash-question");
            if (flashcardText_2 && currentCard) {
                flashcardText_2.innerHTML = currentCard.question;
            }
        }
        else if (cardsLearned === frenchFlashcards.length - 1) {
            stage = 5;
            complete();
            //window.location.href = "index.html";
        }
        else {
            //TODO
            //Have the user choose if they want to review the cards again or if they want to go straight to a new card
            //Right now I have it so they can move straight to a new card
            stage = 1;
            moveToDifferentList(remainingCards, correctList);
            cardsLearned++;
            currentCard = frenchFlashcards[cardsLearned];
            changeStage31();
        }
    }
    else if (currentCard != undefined) {
        //Move the card to the end of the list
        var index = wrongList.indexOf(currentCard);
        if (index !== -1) {
            wrongList.splice(index, 1);
        }
        wrongList.push(currentCard);
        //Update current card and the text
        currentCard = wrongList[0];
        var flashcardText_3 = document.querySelector("#flash-question");
        if (flashcardText_3 && currentCard) {
            flashcardText_3.innerHTML = currentCard.question;
        }
    }
}
function changeStage34() {
    currentCard = wrongList[0];
    var flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        flashcardText.innerHTML = currentCard.question;
    }
}
function changeStage31() {
    console.log("Starting change from stage 3 to stage 1");
    stage = 1;
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "none";
    }
    var learningButtons = document.getElementById("learning");
    if (learningButtons) {
        learningButtons.style.display = "flex";
    }
    var flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        flashcardText.innerHTML = currentCard.question;
    }
}
var transition1Counter = 1;
var transition2Counter = 0;
var transition3Counter = 0;
var transition4Counter = 0;
//When the button in the transition is clicked
function nextButtonClicked() {
    var title = document.getElementById("transitionTitle");
    if ((stage === 1 && (title === null || title === void 0 ? void 0 : title.innerText) === "Starting stage 1")) {
        var nextPage = document.getElementById("transitionStage");
        if (nextPage) {
            nextPage.style.display = "none";
        }
        var flashcardText = document.getElementById("flash-question");
        if (flashcardText) {
            flashcardText.style.display = "flex";
        }
        var learningButtons = document.getElementById("learning");
        if (learningButtons) {
            learningButtons.style.display = "flex";
        }
        setup();
    }
    else if (stage === 1) {
        changeStageNext2();
    }
    else if (stage === 2) {
        continueStage2();
    }
    else if (stage === 3) {
        continueStage3();
    }
    else if (stage === 4) {
        continueStage4();
    }
}
function transitionToNextPage() {
    var correctness = document.getElementById("correctness");
    if (correctness) {
        correctness.style.display = "none";
    }
    var override = document.getElementById("override-button");
    if (override) {
        override.style.display = "none";
    }
    //In case we are coming from stage 1
    var learning = document.getElementById("learning");
    if (learning) {
        learning.style.display = "none";
    }
    var question = document.getElementById("flash-question");
    if (question) {
        question.style.display = "none";
    }
    var nextPage = document.getElementById("transitionStage");
    if (nextPage) {
        nextPage.style.display = "flex";
    }
    var title = document.getElementById("transitionTitle");
    var description = document.getElementById("stage-description");
    if (title && description && currentCard) {
        console.log("Does " + lastInput + " === " + currentCard.answer.toLowerCase());
        //Checking if we are in the middle of stage 3
        if (stage === 3 && remainingCards.length > 1) {
            nextButtonClicked();
        }
        //Checking if we are in the middle of stage 4
        if (stage === 4 && wrongList.length > 1) {
            nextButtonClicked();
        }
        if (stage === 1) {
            title.innerText = "Starting stage 2";
            description.innerText = stage2Description;
            transition2Counter++;
            if (transition2Counter > 2) {
                nextButtonClicked();
            }
        }
        else if (stage === 2 && lastInput === currentCard.answer.toLowerCase()) {
            title.innerText = "Starting stage 3";
            description.innerText = stage3Description;
            transition3Counter++;
            if (transition3Counter > 2) {
                nextButtonClicked();
            }
        }
        else if (stage === 2) {
            title.innerText = "Starting stage 1";
            description.innerText = stage1Description;
            transition1Counter++;
            if (transition1Counter > 2) {
                //title.innerText = "Learning a new card";
                nextButtonClicked();
            }
        }
        else if (stage === 3 && (wrongList.length > 0 || lastInput != (currentCard === null || currentCard === void 0 ? void 0 : currentCard.answer.toLowerCase()))) {
            title.innerText = "Starting stage 4";
            description.innerText = stage4Description;
            transition4Counter++;
            if (transition4Counter > 2) {
                title.innerText = "Reviewing missed flashcards";
                description.innerText = "";
                //nextButtonClicked();
            }
        }
        else if (stage === 3 && wrongList.length === 0) {
            title.innerText = "Starting stage 1";
            description.innerText = stage1Description;
            transition1Counter++;
            if (transition1Counter > 2) {
                title.innerText = "Learning a new card";
                description.innerText = "";
                //nextButtonClicked();
            }
            //Check if the game is finished
            if (cardsLearned + 1 === frenchFlashcards.length) {
                complete();
            }
        }
        else if (stage === 4 && lastInput != (currentCard === null || currentCard === void 0 ? void 0 : currentCard.answer.toLowerCase())) {
            title.innerText = "Staying on stage 4";
            description.innerText = stage4Description;
            transition4Counter++;
            if (transition4Counter > 2) {
                description.innerText = "";
                //nextButtonClicked();
            }
        }
        else if (stage === 4 && wrongList.length === 1) {
            title.innerText = "Starting stage 1";
            description.innerText = stage1Description;
            transition1Counter++;
            if (transition1Counter > 2) {
                title.innerText = "Learning a new card";
                description.innerText = "";
                //nextButtonClicked();
            }
        }
        else {
            title.innerText = "Error";
            description.innerText = "Error";
        }
    }
}
function moveToDifferentList(newList, oldList) {
    while (oldList.length !== 0) {
        newList.push(oldList[0]);
        oldList.shift();
    }
}
function shuffle(array) {
    var _a;
    var currentIndex = array.length;
    var randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
function override() {
    if (currentCard) {
        lastInput = currentCard.answer.toLowerCase();
        answerRight();
    }
    else {
        console.log("Error: currentCard is undefined");
    }
}
function complete() {
    var flashcard = document.getElementById("flashcard");
    if (flashcard) {
        flashcard.style.display = "none";
    }
    var completeDiv = document.getElementById("complete");
    if (completeDiv) {
        completeDiv.style.display = "flex";
    }
}
function goHome() {
    window.location.href = "index.html";
}
