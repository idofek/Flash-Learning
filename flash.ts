class Flashcard {
  question: string;
  answer: string;
  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer;
  }

  getQuestion() {
    return this.question;
  }

  getAnswer() {
    return this.answer;
  }

  isCorrect(userAnswer: string) {
    const correctAnswer = this.answer.toLowerCase();
    const providedAnswer = userAnswer.toLowerCase();

    return correctAnswer === providedAnswer;
  }
}

// Add an event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  // Call your setup function when the DOM is ready
  console.log("Setting page up");
  setup();
  console.log("Called setup");
});

//Function to setup the inital learning page
function setup() {
  let flashcardText = document.querySelector("#flash-question");

  if (flashcardText !== null && frenchFlashcards[0] != null) {
    flashcardText.innerHTML = frenchFlashcards[0].question;
    console.log(frenchFlashcards[0].question);
  } else {
    console.error("Element with id 'flash-question' not found");
  }
}

//The list of cards that we are going to study
const frenchFlashcards: Flashcard[] = [
  new Flashcard("What does bonjour mean in english?", "hello"),
  new Flashcard('What is the English translation of "au revoir?', "goodbye"),
  new Flashcard('Translate "merci" to English', "thank you"),
  new Flashcard('What does "s\'il vous plaît" mean in English?', "please"),
  new Flashcard(
    "What does merci beaucoup mean in English?",
    "thank you very much"
  ),
  new Flashcard('Translate "excusez-moi" to English', "excuse me"),
  new Flashcard('How do you say "yes" in French?', "oui"),
  new Flashcard('What is the English translation of "non"?', "no"),
  new Flashcard('Translate "comment ça va?" to English', "how are you?"),
  new Flashcard('Translate "aujourd\'hui" to English', "today"),
];

//This array will have all of the cards that the user has seen and will need to study
var remainingCards: Flashcard[] = [];

//This array will have all of the cards that the user got correct in a certain level
var correctLis: Flashcard[] = [];

//This array will have all of the cards that the user got wrong in a certain level
var wrongList: Flashcard[] = [];

var cardsLearned: number = 0;
var currentCard = frenchFlashcards[0];
var stage: number = 1;
var lastInput:string = "";

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
  let flashcardText = document.querySelector("#flash-question");
  if (flashcardText && currentCard) {
    if (flashcardText.innerHTML === currentCard.question) {
      flashcardText.innerHTML = currentCard.answer;
    } else if (flashcardText?.innerHTML === currentCard?.answer) {
      flashcardText.innerHTML = currentCard.question;
    }
  }
}

//Used to change the stage from 1 to 2
function changeStage12() {
  console.log("Starting change from stage 1 to stage 2");
  stage = 2;
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

//Changing from stage 2 to 1 if the user got the answer wrong
function changeStage21Wrong() {
  console.log("Starting change from stage 2 to stage 1");
  stage = 1;

  let answerButtons = document.getElementById("answers");

  if (answerButtons) {
    answerButtons.style.display = "none";
  }

  let learningButtons = document.getElementById("learning");

  if (learningButtons) {
    learningButtons.style.display = "flex";
  }

  let flashcardText = document.querySelector("#flash-question");

  if (flashcardText && currentCard) {
    flashcardText.innerHTML = currentCard.question;
  }
}

//Changing from stage 2 to 1 if the user got the answer correct (would be the first one)
function changeStage21Correct() {
  console.log("Starting change from stage 2 to stage 1");
  stage = 1;
  let answerButtons = document.getElementById("answers");

  if (answerButtons) {
    answerButtons.style.display = "none";
  }

  let learningButtons = document.getElementById("learning");

  if (learningButtons) {
    learningButtons.style.display = "flex";
  }
  //Updating the cards learned count
  cardsLearned++;

  //Updating the current question
  if (cardsLearned <= frenchFlashcards.length) {
    currentCard = frenchFlashcards[cardsLearned];
  } else {
    console.log("Reached the last question");
    console.log(`${cardsLearned}>${frenchFlashcards.length}`)
  }

  let flashcardText = document.querySelector("#flash-question");

  if (flashcardText && currentCard) {
    flashcardText.innerHTML = currentCard.question;
  }
}

function changeStage23() {}

//Checking if the current input is correct
function checkTranslationInitial() {
  let translation = <HTMLInputElement>(
    document.getElementById("flashcard-input")
  );

  lastInput = translation.value.toLowerCase();

  if (translation && currentCard) {
    console.log(translation.value);
    let text = translation.value.toLowerCase();

    if (text === currentCard.answer) {
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
    } else {
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
  let answerButtons = document.getElementById("answers");

  if (answerButtons) {
    answerButtons.style.display = "none";
  }

  let flashcardText = document.getElementById("flash-question");
  if (flashcardText) {
    flashcardText.style.display = "none";
  }



  let correctness = document.getElementById("correctness");

  if (correctness) {
    correctness.style.display = "flex";
  }

  let correctText = document.getElementById("rightWrong");
  if (correctText) {
    correctText.innerHTML = "Correct";
    correctText.style.color = "#013220";
  }
  console.log(stage);
}

function answerWrong() {
  let answerButtons = document.getElementById("answers");

  if (answerButtons) {
    answerButtons.style.display = "none";
  }

  let flashcardText = document.getElementById("flash-question");
  if (flashcardText) {
    flashcardText.style.display = "none";
  }

  let correctness = document.getElementById("correctness");

  if (correctness) {
    correctness.style.display = "flex";
  }

  let correctText = document.getElementById("rightWrong");
  if (correctText) {
    correctText.innerHTML = "Wrong";
    correctText.style.color = "#8B0000";
  }
}

function checkTranslation() {
  if (stage === 2) {
    checkTranslationInitial();
  } else {



    //lastInput = translation.value.toLowerCase();


  }
}

//Remove the text (that says if the button is correct or not)
//Removes the button that continues
//Put back the correct elements
//Do this by calling changeStage21Correct()
function continued() {
  let correctness = document.getElementById("correctness");

  if (correctness) {
    correctness.style.display = "none";
  }

  let flashcardText = document.getElementById("flash-question");
  if (flashcardText) {
    flashcardText.style.display = "block";
  }

  //Not sure if this is okay or not
  var answerCorrect:boolean = lastInput === currentCard?.answer;;

  

  if (stage === 2 && answerCorrect === true) {
    changeStage21Correct();
  }else if (stage === 2 && answerCorrect === false){
    
    changeStage21Wrong();
  } else if (stage === 3) {
    //TODO
    //This is when the user is in the middle of answering all of the remaining flashcards and they get one either right or wrong
  }
}
