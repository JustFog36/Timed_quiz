const startButton = document.getElementById("start-button");
const quizScreen = document.getElementById("quiz-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");

let timer;
let timerValue = 60; 
let score = 0;
let currentQuestion = 0; 

const questions = [
    {
        question: "What is HTML?",
        choices: ["A programming language", "A markup language", "A scripting language", "An operating system"],
        correctAnswer: 1 
    },
    {
      question: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "Highly Typed Multilayer Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
      correctAnswer: 0
  },
  {
      question: "What is the main purpose of CSS?",
      choices: ["To create interactive web pages", "To structure content on the web page", "To provide interactivity to web pages", "To style and layout web pages"],
      correctAnswer: 3
  },
  {
      question: "Which programming language is often used for web development?",
      choices: ["Python", "Java", "JavaScript", "C++"],
      correctAnswer: 2
  },
  {
      question: "What does the 'href' attribute in an anchor (<a>) tag specify?",
      choices: ["The font size of the text", "The destination URL", "The text color", "The width of the link"],
      correctAnswer: 1
  },
  {
      question: "What is the purpose of the JavaScript 'querySelector()' method?",
      choices: ["To retrieve the first element in the document that matches a specified CSS selector", "To create a new HTML element", "To add a new event listener to an element", "To change the document's title"],
      correctAnswer: 0
  },
  {
      question: "Which of the following is a JavaScript data type?",
      choices: ["String", "Margin", "Align", "Position"],
      correctAnswer: 0
  },
  {
      question: "What does the 'git' command 'commit' do?",
      choices: ["Deletes a file from the repository", "Saves changes to the local repository", "Checks out a new branch", "Pushes changes to a remote repository"],
      correctAnswer: 1
  },
  {
      question: "What does HTTP stand for in the context of web development?",
      choices: ["Hypertext Transfer Protocol", "Hyperlink Text Transport Protocol", "Highly Typed Text Protocol", "Home Tool Transfer Protocol"],
      correctAnswer: 0
  },
  {
      question: "Which HTML element is used to define the structure of an HTML document?",
      choices: ["<head>", "<body>", "<footer>", "<html>"],
      correctAnswer: 3
  }
  ];


startButton.addEventListener("click", startQuiz);


function startQuiz() {
    startButton.style.display = "none";
    quizScreen.style.display = "block";
    startTimer();
    showQuestion(currentQuestion);
}


function startTimer() {
    timer = setInterval(function() {
        timerValue--;
        timerElement.textContent = timerValue;
        if (timerValue <= 0) {
            gameOver();
        }
    }, 1000);
}


function showQuestion(questionIndex) {
  const questionData = questions[questionIndex];
  
  const questionNumberElement = document.getElementById("question-number");
    questionNumberElement.textContent = `Question ${questionIndex + 1}`;


  document.getElementById("question-text").textContent = questionData.question;

  const answerChoices = document.getElementById("answer-choices");
  answerChoices.innerHTML = "";

  questionData.choices.forEach(function(choice, index) {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.classList.add("choice");
      choiceButton.addEventListener("click", function() {
        checkAnswer(questionIndex, index);
      });
      answerChoices.appendChild(choiceButton);
     
    });
}



function checkAnswer(questionIndex, selectedChoiceIndex) {
    const questionData = questions[questionIndex];
    if (selectedChoiceIndex === questionData.correctAnswer) {
        score++;
    } else {
        timerValue -= 10; // Subtract 10 seconds for incorrect answers
        if (timerValue < 0) {
            timerValue = 0;
        }
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        gameOver();
    }
}

function gameOver() {
    clearInterval(timer);
    quizScreen.style.display = "none";
    gameOverScreen.style.display = "block";
    scoreElement.textContent = score;
    document.getElementById("timerText").style.display="none"

  displayHighScores()   
}


initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        
        console.log(`${initials} with a score of ${scoreElement.textContent} saved!`);
    }

    saveScore()
    displayHighScores()
});

function saveScore() {
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = {initials, score}
    highScores.push(newScore)
    highScores.sort((a,b) => b.score - a.score)


    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}


function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  let highScoresHTML = "<h2>High Scores</h2><ul>";
  highScores.forEach(function(scoreData, index) {
      highScoresHTML += `<li>${scoreData.initials}: ${scoreData.score}</li>`;
  });
  highScoresHTML += "</ul>";

  const highScoresContainer = document.getElementById("high-scores");
  highScoresContainer.innerHTML = highScoresHTML;
}

