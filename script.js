// Step 1: render quiz main page. A Title + description about the Code Quiz (high score button should also be there)
// Step 2: Begin quiz upon CLICKING BUTTON to begin quiz. Start timer. Render first quiz question.
// Upon CLICKING an anser move on to the next question, regardless of accuracy.
// Renders next question with the same layout as previous. Somewhere on screen render the result of the last question (correct or incorrect) and then let it fade away. Deduct time from the timer if incorrect.
// Upon quiz completion render a FORM to input user initials
// Save the initials and score into the scoreboard. Sort scoreboard by score.

// Scores will be organized as an object within local storage. Each key will be the user inserted intials, and its value will be the user's score. Multiple scores under the same user will transform the score value into an quizArray of score values.
// Example Entry: {AB: 100, CD:[90, 80]}

// Grab all of sections on the HTML page.
var body = document.querySelector("body");
var timer = document.querySelector("#timer");
var score = document.querySelector("#score");
var app = document.querySelector("#app");

// define global variable for the timer
secondsLeft = 0;

// establish quiz questions
var questions = [
  {
    question: "Inside what kind of HTML element tag do we put the JavaScript?",
    answer: "script",
    wrong: ["javascript", "js", "scripting"]
  },
  {
     question: `Which of the following will write the message “Hello World!” in an alert box?`,
     answer: `alert(“Hello World!”);`,
     wrong: [`alertBox(“Hello World!”);`, `alert(Hello World!);`, `msgAlert(“Hello World!”);`]
  },
  {
    question: "Which of these shows the correct way to write a for loop in Javascript?",
    answer: "for(var i = 0; i < 10; i++)",
    wrong: ["for(var i < 10; i++)", "for(i = 0; i < 10; i++)", "for(i && i < 10)"]
  },
  {
    question: "Which one of these is the division operator in Javascript?",
    answer: "/",
    wrong: ["%", "|", "÷"]
  },
  {
    question: "Which one of these is the multiplication operator in Javascript?",
    answer: "*",
    wrong: ["x", "^", "X"]
  },
  {
    question: "Which one of these is the addition operator in Javascript?",
    answer: "+",
    wrong: ["-", "&", "plus"]
  },
  {
    question: "Which one of these is the subtraction operator in Javascript?",
    answer: "-",
    wrong: ["!", "/", "~"]
  },
  {
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
    wrong: ["Card Style Submissions", "Computer Sourced Styling", "Comprehensive Styling System"]
  },
  {
    question: "What does HTML stand for?",
    answer: "Hypertext Markup Language",
    wrong: ["Hyperspace Touchstone Main Language", "Hieroglyphics To Machines Legible", "Handle Text Machine Language"]
  },
  {
    question: "Where in an HTML document is the correct place to refer to an external style sheet?",
    answer: "In the head section",
    wrong: ["Anywhere in the body section", "At the top of the body section", "Directly after the !DOCTYPE html tag"]
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    answer: "style",
    wrong: ["css", "styles", "style.css"]
  },
  {
    question: "Which property is used to change the background color?",
    answer: "background-color",
    wrong: ["color", "picture-color", "backdrop"]
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    answer: "h1",
    wrong: ["h2", "header", "title"]
  },
  {
    question: "What is the correct name of the HTML element tag to define bolded text?",
    answer: "strong",
    wrong: ["weak", "important", "emphasis"]
  },
  {
    question: "Which of the following HTML element tags is used for creating an unordered list?",
    answer: "ul",
    wrong: ["ol", "li", "un"]
  },
  {
    question: "Which of the following attributes is used to open an hyperlink in new tab?",
    answer: "target",
    wrong: ["tab", "href", "ref"]
  },
  {
    question: "Which of the following property is used to control the position of an image in the background?",
    answer: "background-position",
    wrong: ["background-repeat", "background-image", "background-color"]
  },
  {
    question: "Which of the following property is used to set the width of an image border?",
    answer: "border",
    wrong: ["height", "width", "margin"]
  },
  {
    question: "Which of the following property is used to increase or decrease the size of a font?",
    answer: "font-size",
    wrong: ["font", "font-family", "font-weight"]
  }
];

var init = () => {
  // Render main screen header: title, description about the Code Quiz, high scores button, and begin quiz button
  // Title
  var h1 = document.createElement("h1");
  h1.innerHTML = "Coding Quiz Game"
  // Description
  var description = document.createElement("p");
  description.innerHTML = "Answer the following questions before time runs out! Wrong answers will penalize you with a 10 second time reduction."

  // Start Button
  var startbtn = document.createElement("button");
  startbtn.setAttribute("id", "start");
  startbtn.innerHTML = "Start Game";
  // Add add event listener to the start button
  startbtn.addEventListener("click", () => {
    startQuiz();
    startTime();
  });

  //append all parts to the app
  app.append(h1);
  app.append(description);
  app.append(startbtn);

  // set time to 0, will reset when the game begins
  timer.innerHTML = "Time: " + secondsLeft;

  // create button for high scores
  var scorebtn = document.createElement("button");
  scorebtn.setAttribute("class", "scores");
  scorebtn.innerHTML = "View High Scores";
  // add event listener to high scores button
  scorebtn.addEventListener("click", () => {
    viewScores();
  });
  // apend button to the score div
  score.append(scorebtn);
}

// start the Quiz function
var startQuiz = () => {
  var quiz =  questions.sort(() => Math.random() - 0.5);
  renderQuestion(quiz, 0);
}

// Render a question function
var renderQuestion = (quizArray, index) => {
  // Clear all data within app
  app.innerHTML = "";

  // populate the div with our question and answers
  var question = document.createElement("h2");
  question.innerHTML = quizArray[index].question;

  // create the answers display
  var selection = document.createElement("ul");

  // create array that will store answer nodes
  var choices = [];

  // define the correct answer
  var answerNode = document.createElement("li");
  var correct = quizArray[index].answer.toString();
  answerNode.innerHTML = correct;
  answerNode.setAttribute("class", "correct");
  // add event listener to the list item
  answerNode.addEventListener("click", () => {
    if(quizArray[index+1]) {
      renderQuestion(quizArray, index + 1);
    }
  });
  // push the node onto the choices array
  choices.push(answerNode);

  // define the other choices
  for (var i = 0; i < quizArray[index].wrong.length; i++) {
    var node = document.createElement("li");
    var incorrect = quizArray[index].wrong[i].toString();
    node.innerHTML = incorrect;
    // Add event listener to the node
    node.addEventListener("click", () => {
      penalty();
      if(quizArray[index+1]) {
        renderQuestion(quizArray, index + 1);
      }
    });
    choices.push(node);
  }

  // shuffle choices and append them to the unordered list
  choices = choices.sort(() => Math.random() - 0.5);
  for (var i = 0; i < choices.length; i++) {
    selection.append(choices[i]);
  }


  // Append all of the items to the app div
  app.append(question);
  app.append(selection);
}

var startTime = () => {
  // Set initial time to 60 seconds
  secondsLeft = 60;
  timer.innerHTML = "Time: 60";
  // Set countdown function
  var timerInterval = setInterval(() => {
    secondsLeft--;
    timer.innerHTML = "Time: " + secondsLeft;

    // Conclusion when timer hits 0, launches concludeQuiz
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      concludeQuiz();
    }
  }, 1000);
}

var viewScores = () => {
  console.log("placeholder for score viewing");
}

var concludeQuiz = () => {
  console.log("placeholder for quiz concluding");
}

var penalty = () => {
  secondsLeft = secondsLeft - 10;
}

// start init
init();