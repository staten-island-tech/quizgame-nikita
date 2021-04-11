const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const score = document.getElementById("score-container");

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
  score.innerHTML = "score: " + scorePerCent + "/5";
}

const questions = [
  {
    question: "A question",
    answers: [
      { text: "rgrbb", correct: false },
      { text: "rgrbb", correct: true },
      { text: "rgrbb", correct: false },
      { text: "rgrbb", correct: false },
    ],
  },
  {
    question: "B Question",
    answers: [
      { text: "rgrbb", correct: false },
      { text: "rgrbb", correct: true },
      { text: "rgrbb", correct: false },
      { text: "rgrbb", correct: false },
    ],
  },
  {
    question: "C Question",
    answers: [
      { text: "rgrbb", correct: false },
      { text: "rgrbb", correct: true },
      { text: "rgrbb", correct: false },
      { text: "rgrbb", correct: false },
    ],
  },
  {
    question: "D Question",
    answers: [
      { text: "rgrbb", correct: false },
      { text: "rgrbb", correct: true },
      { text: "rgrbb", correct: false },
      { text: "rgrbb", correct: false },
    ],
  },
  {
    question: "E question",
    answers: [
      { text: "rgrbb", correct: false },
      { text: "rgrbb", correct: true },
      { text: "rgrbb", correct: false },
      { text: "rgrbb", correct: false },
    ],
  },
];
