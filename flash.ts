class Flashcard {
  question: string;
  answer: string;
  constructor(question:string, answer:string) {
    this.question = question;
    this.answer = answer;
  }

  getQuestion() {
    return this.question;
  }

  getAnswer() {
    return this.answer;
  }

  isCorrect(userAnswer:string) {
    const correctAnswer = this.answer.toLowerCase();
    const providedAnswer = userAnswer.toLowerCase();

    return correctAnswer === providedAnswer;
  }
}

//The list of cards that we are going to study
const frenchFlashcards = [
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
var remainingCards = [];

//This array will have all of the cards that the user got correct in a certain level
var correctList = [];

//This array will have all of the cards that the user got wrong in a certain level
var wrongList = [];

var cardsLearned = 0;
var currentCard = frenchFlashcards[0];