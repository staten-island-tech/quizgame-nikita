const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const score = document.getElementById("score-container");
const title = document.getElementById("mainTitle");

let randomQuestions, currentQuestionIndex;
let totalScore = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  randomQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  score.classList.add("hide");
  title.classList.add("hide");
}

function setNextQuestion() {
  resetState();
  showQuestion(randomQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      totalScore++;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (randomQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    score.classList.remove("hide");
    scoreCounter();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function scoreCounter() {
  let scorePerCent = totalScore;
  score.innerHTML = "You got " + scorePerCent + "/5!";
}

const questions = [
  {
    question: "What model holds the title of fastest car in the world?",
    answers: [
      { text: "Bugatti Chiron", correct: false },
      { text: "SSC Tuatara", correct: true },
      { text: "Lamborghini Aventador", correct: false },
      { text: "Koenigsegg Agera", correct: false },
    ],
  },
  {
    question: "What is the most popular (and best-selling) car in the world?",
    answers: [
      { text: "Toyota Corolla", correct: true },
      { text: "Ford Model T", correct: false },
      { text: "Honda Accord", correct: false },
      { text: "Volkswagen Beetle", correct: false },
    ],
  },
  {
    question: "How many cars are produced worldwide every year?",
    answers: [
      { text: "1 billion", correct: false },
      { text: "165,000", correct: false },
      { text: "100 million", correct: false },
      { text: "70 million", correct: true },
    ],
  },
  {
    question: "How many unique parts does an average car contain?",
    answers: [
      { text: "200", correct: false },
      { text: "30,000", correct: true },
      { text: "1,000", correct: false },
      { text: "15,000", correct: false },
    ],
  },
  {
    question: "What does BMW stand for?",
    answers: [
      { text: "It doesn't stand for anything", correct: false },
      { text: "Bayerische Motoren Werke", correct: true },
      { text: "BMW", correct: false },
      { text: "Blinkers Mean What", correct: false },
    ],
  },
];
