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

  getAnswer(){
    return this.answer;
  }

  isCorrect(userAnswer){
    
    const correctAnswer = this.answer.toLowerCase();
    const providedAnswer = userAnswer.toLowerCase();

    return correctAnswer === providedAnswer;
  }
}

const historyFlashcards = [
  new Flashcard("What is Obama's lastname?", "Obama"),
  new Flashcard("What is Obama's birthday (M/D) formath", "10/4"),
  new Flashcard("Where was Obama born?", "Hawaii"),
];

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
    helpParagraph.innerHTML =
      "This program uses a special method to allow you to learn flashcards more quickly";
    console.log(helpParagraph);
    document.body.appendChild(helpParagraph);
  }
}

function goHome() {
  window.location.href = "home.html";
}

function checkTranslation(answer) {
  let translation;
  if (french) {
    translation = document.querySelector(".js-translation-input");
  } else if (history) {
    translation = document.querySelector(".js-translation-input-history");
  }

  console.log(translation.value);
  let text = translation.value.toLowerCase();

  let result = document.querySelector(".result");
  result.style.display = "flex";

  let resultText = document.querySelector(".result-text");
  if (text === answer.toLowerCase()) {
    console.log("Congrats");
    resultText.innerText = "Correct!";
  } else {
    resultText.innerText = "Wrong";
  }
}

function learnFrench() {
  if (history === false) {
    let frenchDiv = document.querySelector(".french");
    let computedStyles = window.getComputedStyle(frenchDiv);//Using this I can access the style of the div
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
    /*
    let title = document.querySelector(".french_title");
    let frenchDiv = document.querySelector(".french-div");
    if (title.style.display === "none" || frenchDiv.style.display === "none") {
      title.style.display = "block"; // Show the element
      frenchDiv.style.display = "block";
      french = true;
    } else {
      title.style.display = "none"; // Hide the element
      frenchDiv.style.display = "none";
      french = false;
    }
    */
  }
}

function learnHistory() {
  if (french === false) {
    let historyDiv = document.querySelector(".history");
    //console.log(historyDiv.style.display); //The historyDiv doesn't have the same style as the actual div
    let computedStyles = window.getComputedStyle(historyDiv);//Using this I can access the style of the div
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



function nextQuestion(){

}
