//Flashcard class that is used by the project to store both a question and answer string
var Flashcard = /** @class */ (function () {
    function Flashcard(question, answer) {
        this.question = question;
        this.answer = answer;
    }
    return Flashcard;
}());
//The list of cards that we are going to study
var frenchFlashcards = [
    new Flashcard("What does bonjour mean in english?", "Hello"),
    new Flashcard('What is the English translation of "au revoir?', "Goodbye"),
    new Flashcard('Translate "merci" to English', "Thank you"),
    new Flashcard('What does "s\'il vous plaît" mean in English?', "Please"),
    new Flashcard("What does merci beaucoup mean in English?", "Thank you very much"),
    new Flashcard('Translate "excusez-moi" to English', "Excuse me"),
    new Flashcard('How do you say "yes" in French?', "Oui"),
    new Flashcard('What is the English translation of "non"?', "No"),
    new Flashcard('Translate "comment ça va?" to English', "How are you?"),
    new Flashcard('Translate "aujourd\'hui" to English', "Today"),
];
var historyFlashcards = [
    new Flashcard("Who was the first President of the United States?", "George Washington"),
    new Flashcard("When did World War II end?", "September 2, 1945"),
    new Flashcard("Name the ancient wonder of the world that still exists today.", "The Great Pyramid of Giza"),
    new Flashcard("Which empire was ruled by Julius Caesar?", "Roman Empire"),
    new Flashcard("When did the Industrial Revolution begin?", "18th century (around 1760)"),
    new Flashcard("Who was the leader of the Soviet Union during the Cuban Missile Crisis?", "Nikita Khrushchev"),
    new Flashcard("What was the significance of the Magna Carta?", "It limited the power of the monarchy and established the principle that the king is subject to the law."),
    new Flashcard("Who wrote the Declaration of Independence?", "Thomas Jefferson"),
    new Flashcard("What was the Renaissance?", "A period of cultural, artistic, and intellectual rebirth in Europe from the 14th to the 17th century."),
    new Flashcard("When did the American Civil War take place?", "1861-1865"),
];
var chemistryFlashcards = [
    new Flashcard("What is the chemical symbol for water?", "H2O"),
    new Flashcard("Define oxidation.", "The loss of electrons by a molecule, atom, or ion."),
    new Flashcard("What is Avogadro's number?", "6.022 x 10^23 (The number of atoms, ions, or molecules in one mole of a substance.)"),
    new Flashcard("Name the noble gases.", "Helium, Neon, Argon, Krypton, Xenon, Radon"),
    new Flashcard("What is the pH scale used to measure?", "Acidity or alkalinity of a solution."),
    new Flashcard("What is the periodic table?", "A tabular arrangement of the chemical elements, organized by their atomic number, electron configuration, and recurring chemical properties."),
    new Flashcard("Define exothermic reaction.", "A chemical reaction that releases energy to its surroundings."),
    new Flashcard("What is the most abundant gas in Earth's atmosphere?", "Nitrogen"),
    new Flashcard("Name the three states of matter.", "Solid, Liquid, Gas"),
    new Flashcard("What is the chemical symbol for gold?", "Au"),
];
var physicsFlashcards = [
    new Flashcard("What is Newton's First Law of Motion?", "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced external force."),
    new Flashcard("Define velocity.", "The rate of change of displacement with respect to time."),
    new Flashcard("What is the formula for calculating kinetic energy?", "KE = 0.5 * m * v^2"),
    new Flashcard("Explain the concept of inertia.", "The tendency of an object to resist changes in its state of motion."),
    new Flashcard("What is the unit of measurement for force?", "Newton (N)"),
    new Flashcard("State the law of conservation of energy.", "Energy cannot be created or destroyed, only transferred or converted from one form to another."),
    new Flashcard("What is the SI unit of electric current?", "Ampere (A)"),
    new Flashcard("Define frequency in the context of waves.", "The number of cycles of a periodic wave that occur in a unit of time."),
    new Flashcard("What is the formula for calculating work?", "Work = Force * Distance * cos(θ)"),
    new Flashcard("Explain the concept of gravity.", "The force of attraction between two masses."),
];
var geographyFlashcards = [
    new Flashcard("What is the capital of Japan?", "Tokyo"),
    new Flashcard("Name the five oceans.", "Pacific Ocean, Atlantic Ocean, Indian Ocean, Southern Ocean, Arctic Ocean"),
    new Flashcard("Which river is the longest in the world?", "Nile River"),
    new Flashcard("What is the capital of Australia?", "Canberra"),
    new Flashcard("Name the seven wonders of the ancient world.", "Great Pyramid of Giza, Hanging Gardens of Babylon, Statue of Zeus at Olympia, Temple of Artemis at Ephesus, Mausoleum at Halicarnassus, Colossus of Rhodes, Lighthouse of Alexandria"),
    new Flashcard("What is the largest desert in the world?", "Antarctica (Cold Desert)"),
    new Flashcard("Which mountain range is the longest in the world?", "Andes"),
    new Flashcard("Name the countries that make up the United Kingdom.", "England, Scotland, Wales, Northern Ireland"),
    new Flashcard("What is the capital of Brazil?", "Brasília"),
    new Flashcard("What is the Equator?", "An imaginary line that circles the Earth, dividing it into the Northern Hemisphere and the Southern Hemisphere."),
];
var errorFlashcards = [new Flashcard("Error", "Error")];
//This will be the main flashcard set which is initially set to error
var flashcardSet = errorFlashcards;
//Function that runs when the page is first loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("Setting page up");
    var flashcardString = localStorage.getItem("flashcardSet");
    //Setting flashcardSet to the correct set
    if (flashcardString === "frenchFlashcards") {
        flashcardSet = frenchFlashcards;
    }
    else if (flashcardString === "historyFlashcards") {
        flashcardSet = historyFlashcards;
    }
    else if (flashcardString === "chemistryFlashcards") {
        flashcardSet = chemistryFlashcards;
    }
    else if (flashcardString === "physicsFlashcards") {
        flashcardSet = physicsFlashcards;
    }
    else if (flashcardString === "geographyFlashcards") {
        flashcardSet = geographyFlashcards;
    }
    //Shuffling flashcardsSet
    shuffle(flashcardSet);
    //Setting the current card to the first card
    currentCard = flashcardSet[0];
});
//Creating descriptions for all of the stage transitions
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
//shuffle(flashcardSet);
var currentCard = flashcardSet[0];
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
        console.log(flashcardText.innerHTML);
        console.log(currentCard.question);
        //If the flashcard is currently showing the question then show the answer
        if (flashcardText.innerHTML === currentCard.question) {
            flashcardText.innerHTML = currentCard.answer;
        }
        else if (flashcardText.innerHTML === currentCard.answer) {
            //If the flashcard is currently showing the answer then show the question
            flashcardText.innerHTML = currentCard.question;
        }
    }
}
//Used to change the stage from 1 to 2
function changeStage12() {
    console.log("Starting change from stage 1 to stage 2");
    stage = 2;
    console.log("New stage: " + stage);
    //Hides the buttons used for learning
    hideLearningButtons();
    //Shows the answer button
    showAnswerButtons();
    //Shows the flashcard question
    showFlashcardQuestion();
}
//Changes the flashcard from the next page to the two page
function changeStageNext2() {
    console.log("Starting change from stage 1 to stage 2");
    stage = 2;
    //Hides the next page
    hideNextPage();
    //Shows the answer buttons
    showAnswerButtons();
    //Shows the question and updates the html so it shows the current question
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
    //Hide answer buttons
    hideAnswerButtons();
    //Show learning buttons
    showLearningButtons();
    //Update text
    var flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        flashcardText.innerHTML = currentCard.question;
    }
}
//Changing from stage 2 to 1 if the user got the answer correct (would be the first one)
function changeStage21Correct() {
    console.log("Starting change from stage 2 to stage 1");
    stage = 1;
    //Hide answer buttons
    hideAnswerButtons();
    //Show learning buttons
    showLearningButtons();
    //Updating the current question
    if (cardsLearned <= flashcardSet.length &&
        flashcardSet[cardsLearned] !== undefined) {
        currentCard = flashcardSet[cardsLearned];
    }
    else {
        console.log("Reached the last question");
        console.log("".concat(cardsLearned, ">").concat(flashcardSet.length));
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
    //Update the flashcard text
    var flashcardText = document.querySelector("#flash-question");
    if (flashcardText && currentCard) {
        flashcardText.innerHTML = currentCard.question;
    }
    //Show answer buttons
    showAnswerButtons();
}
//Checking if the current input is correct
function checkTranslation() {
    var translation = (document.getElementById("flashcard-input"));
    lastInput = translation.value.toLowerCase();
    if (translation && currentCard) {
        console.log(translation.value);
        var text = translation.value.toLowerCase();
        if (text === currentCard.answer.toLowerCase()) {
            console.log("Answer is correct");
            translation.value = "";
            answerRight();
        }
        else {
            console.log("Answer is wrong");
            translation.value = "";
            answerWrong();
        }
    }
}
//If the answer is right then change the text so that only correct shows up
function answerRight() {
    //Hide the answers
    hideAnswerButtons();
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "none";
    }
    //Hide flashcardquestion
    hideFlashcardQuestion();
    //Hide override
    var override = document.getElementById("override-button");
    if (override) {
        override.style.display = "none";
    }
    //Hide correct and wrong answer text
    var userAnswer = document.getElementById("userAnswer");
    if (userAnswer) {
        userAnswer.style.display = "none";
    }
    var rightAnswer = document.getElementById("correctAnswer");
    if (rightAnswer && currentCard) {
        rightAnswer.style.display = "none";
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
    var userAnswer = document.getElementById("userAnswer");
    if (userAnswer) {
        userAnswer.style.display = "flex";
        userAnswer.innerHTML = "User answer: " + lastInput;
    }
    var rightAnswer = document.getElementById("correctAnswer");
    if (rightAnswer && currentCard) {
        rightAnswer.style.display = "flex";
        rightAnswer.innerHTML = "Correct answer: " + currentCard.answer;
    }
    var override = document.getElementById("override-button");
    if (override) {
        override.style.display = "block";
    }
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
    var answerCorrect;
    if (currentCard) {
        answerCorrect = lastInput.toLowerCase() === currentCard.answer.toLowerCase();
    }
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
            if (cardsLearned === flashcardSet.length - 1) {
                //If we did then we finish and go to stage 5
                stage = 5;
                //TODO: Set up stage 5
                complete();
            }
            else {
                stage = 1;
                cardsLearned++;
                moveToDifferentList(remainingCards, correctList);
                currentCard = flashcardSet[cardsLearned];
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
        else if (cardsLearned === flashcardSet.length - 1) {
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
            currentCard = flashcardSet[cardsLearned];
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
    if (stage === 1 && (title === null || title === void 0 ? void 0 : title.innerText) === "Starting stage 1") {
        var nextPage = document.getElementById("transitionStage");
        if (nextPage) {
            nextPage.style.display = "none";
        }
        var flashcardText = document.getElementById("flash-question");
        if (flashcardText && flashcardSet[0]) {
            flashcardText.style.display = "flex";
            flashcardText.innerHTML = flashcardSet[0].question;
            console.log(flashcardSet[0].question);
        }
        var learningButtons = document.getElementById("learning");
        if (learningButtons) {
            learningButtons.style.display = "flex";
        }
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
        else if (stage === 4 && wrongList.length > 1) {
            //Checking if we are in the middle of stage 4
            nextButtonClicked();
        }
        else if (stage === 1) {
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
        else if (stage === 3 &&
            (wrongList.length > 0 || lastInput != (currentCard === null || currentCard === void 0 ? void 0 : currentCard.answer.toLowerCase()))) {
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
            if (cardsLearned + 1 === flashcardSet.length) {
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
            //Show the stage4selection screen
            nextToStage4Selection();
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
function reviewCards4to3() {
    stage = 3;
    var stage4 = document.getElementById("stage4complete");
    if (stage4) {
        stage4.style.display = "none";
    }
    moveToDifferentList(remainingCards, correctList);
    moveToDifferentList(remainingCards, wrongList);
    currentCard = remainingCards[0];
    showAnswerButtons();
    showFlashcardQuestion();
}
function finishStage4() {
    var stage4 = document.getElementById("stage4complete");
    if (stage4) {
        stage4.style.display = "none";
    }
    continueStage4();
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
            array[randomIndex],
            array[currentIndex],
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
function nextToStage4Selection() {
    hideNextPage();
    var stage4 = document.getElementById("stage4complete");
    if (stage4) {
        stage4.style.display = "flex";
    }
}
//Hide functions - functions that hide specific elements
function hideLearningButtons() {
    var learningButtons = document.getElementById("learning");
    if (learningButtons) {
        learningButtons.style.display = "none";
    }
}
function hideNextPage() {
    var nextPage = document.getElementById("transitionStage");
    if (nextPage) {
        nextPage.style.display = "none";
    }
}
function hideAnswerButtons() {
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "none";
    }
}
function hideFlashcardQuestion() {
    var flashcardText = document.getElementById("flash-question");
    if (flashcardText) {
        flashcardText.style.display = "none";
    }
}
//Show functions - functions that show specific elements
function showAnswerButtons() {
    var answerButtons = document.getElementById("answers");
    if (answerButtons) {
        answerButtons.style.display = "flex";
    }
}
function showFlashcardQuestion() {
    var flashcardText = document.getElementById("flash-question");
    if (flashcardText && currentCard) {
        flashcardText.style.display = "flex";
        flashcardText.innerHTML = currentCard.question;
    }
}
function showLearningButtons() {
    var learningButtons = document.getElementById("learning");
    if (learningButtons) {
        learningButtons.style.display = "flex";
    }
}
