let helpCounter = 0;
let helpParagraph = null;
let french = false;
let history = false;

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

const historyFlashcards = [
  new Flashcard("What is Obama's last name?", "Obama"),
  new Flashcard("What is Obama's birthday (M/D) formath", "10/4"),
  new Flashcard("Where was Obama born?", "Hawaii"),
];

const frenchFlashcards = [
  new Flashcard("What does bonjour mean in english?", "hello"),
  new Flashcard("What is the English translation of \"au revoir?", "goodbye"),
  new Flashcard("Translate \"merci\" to English","thank you"),
  new Flashcard("What does \"s\'il vous plaît\" mean in English?","please"),
]

function learn() {
  /*
    const buttonElement = document.querySelector('.Js-Start-Learning');

    buttonElement.innerHTML = 'Learning';*/

  window.location.href = "learn.html";
}

function help() {
  if (helpParagraph) {
    helpParagraph.remove();
    helpParagraph = null;
  } else {
    helpParagraph = document.createElement("p");
    helpParagraph.innerText =
      "This program uses a special method to allow you to learn flashcards more quickly by learning new cards while also reviewing what you have already learned";
    console.log(helpParagraph);
    document.body.appendChild(helpParagraph);
  }
}

function goHome() {
  window.location.href = "index.html";
}

function showFrench() {
  if (history === false) {
    let frenchDiv = document.querySelector(".french");
    let computedStyles = window.getComputedStyle(frenchDiv); //Using this I can access the style of the div
    console.log(computedStyles.display);
    let result = document.querySelector(".result");
    result.style.display = "none";
    if (computedStyles.display === "none") {
      frenchDiv.style.display = "block"; // Show the element
      french = true;
    } else {
      frenchDiv.style.display = "none"; // Hide the element
      french = false;
    }
  }
}

function showHistory() {
    if (french === false) {
      let historyDiv = document.querySelector(".history");
      //console.log(historyDiv.style.display); //The historyDiv doesn't have the same style as the actual div
      let computedStyles = window.getComputedStyle(historyDiv); //Using this I can access the style of the div
      console.log(computedStyles.display);

      let result = document.querySelector(".result");
      result.style.display = "none";
      if (computedStyles.display === "none") {
        historyDiv.style.display = "block"; // Show the element
        historyDiv.style.display = "block";
        history = true;
      } else {
        historyDiv.style.display = "none"; // Hide the element
        history = false;
      }
  }
}

let frenchCount = 0;
let historyCount = 0;

function nextQuestion(){
  if(french === true){
    frenchCount++;
    learnFrench();
  }else{
    historyCount++;
    learnHistory();
  }

  hideCorrectness();
}

function learnHistory(){
  let questionText = document.querySelector("#history-question");
  if(historyCount < historyFlashcards.length){
    var question = historyFlashcards[historyCount].getQuestion();
    questionText.innerText = question;
  }else{
    questionText.innerHTML = "No more questions";
  }
  
}

function learnFrench(){
  let questionText = document.querySelector("#french-question");
  if(frenchCount < frenchFlashcards.length){
    var question = frenchFlashcards[frenchCount].getQuestion();
    questionText.innerText = question;
  }else{
    questionText.innerHTML = "No more questions";
  }
  
}

function checkTranslation() {
  let translation;
  let answer;
  if (french) {
    translation = document.querySelector(".js-translation-input");
    answer = frenchFlashcards[frenchCount].getAnswer();
  } else if (history) {
    translation = document.querySelector(".js-translation-input-history");
    answer = historyFlashcards[historyCount].getAnswer();
  }

  console.log(translation.value);
  let text = translation.value.toLowerCase();

  let result = document.querySelector(".result");
  result.style.display = "flex";

  
  
  if (text === answer.toLowerCase()) {
    showCorrectnes(true);
  } else {
    showCorrectnes(false);
  }
}


function showCorrectnes(correct){
  let resultText = document.querySelector(".result-text");

  if(correct === true){
    console.log("Congrats");
    resultText.innerText = "Correct!";
  }else{
    resultText.innerText = "Wrong";
  }
}

function hideCorrectness(){
  let resultText = document.querySelector(".result-text");
  resultText.innerText = "";

  let result = document.querySelector(".result");
  result.style.display = "none";

  let translation;

  if (french) {
    translation = document.querySelector(".js-translation-input");
  } else if (history) {
    translation = document.querySelector(".js-translation-input-history");
  }

  translation.value = "";

}