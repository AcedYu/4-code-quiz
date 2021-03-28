// Step 1: render quiz main page. A Title + description about the Code Quiz (high score button should also be there)
// Step 2: Begin quiz upon CLICKING BUTTON to begin quiz. Start timer. Render first quiz question.
// Upon CLICKING an anser move on to the next question, regardless of accuracy.
// Renders next question with the same layout as previous. Somewhere on screen render the result of the last question (correct or incorrect) and then let it fade away. Deduct time from the timer if incorrect.
// Upon quiz completion render a FORM to input user initials
// Save the initials and score into the scoreboard. Sort scoreboard by score.

// Scores will be organized as an object within local storage. Each key will be the user inserted intials, and its value will be the user's score. Multiple scores under the same user will transform the score value into an array of score values.
// Example Entry: {AB: 100, CD:[90, 80]}

// Grab all of sections on the HTML page.
var timer = document.querySelector("#timer");
var score = document.querySelector("#score");
var app = document.querySelector("#app");

var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answer: "<script>",
    wrong: ["<javascript>", "<js>", "<scripting>"]
  },
  {
    question: `What is the correct syntax for referring to an external script called "example.js"?`,
    answer: `<script src = "example.js">`,
    wrong: [`<script href = "example.js">`, `<script name = "example.js">`, `<script link = "example.js">`]
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
    question: "Where in an HTML document is the correct place to refer to an externam style sheet?",
    answer: "In the <head> section",
    wrong: ["Anywhere in the <body> section", "At the top of the <body> section", "Directly after <!DOCTYPE html>"]
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    answer: "<style>",
    wrong: ["<css>", "<styles>", "<style.css>"]
  },
  {
    question: "Which property is used to change the background color?",
    answer: "background-color",
    wrong: ["color", "picture-color", "backdrop"]
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    answer: "<h1>",
    wrong: ["<h2>", "<header>", "<title>"]
  },
  {
    question: "What is the correct HTML element to define bolded text?",
    answer: "<strong>",
    wrong: ["<bold>", "<bolder>", "<emphasis>"]
  },
  {
    question: "Which of the following HTML elements is used for creating an unordered list?",
    answer: "<ul>",
    wrong: ["<ol>", "<li>", "<un>"]
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
  var quiz =  questions.sort(() => Math.random() - 0.5);
  // Render main screen header: title, description about the Code Quiz, high scores button, and begin quiz button
  // Title
  var h1 = document.createElement("h1");
  h1.innerHTML = "Coding Quiz Game"
  // Description
  var description = document.createElement("p");
  description.innerHTML = "Answer the following questions before time runs out! Wrong answers will penalize you with a 10 second time reduction."
  // Button
  var startbtn = document.createElement("button");
  startbtn.setAttribute("class", "start");
  startbtn.innerHTML = "Start Game";

  //append all parts to the header
  app.append(h1);
  app.append(description);
  app.append(startbtn);

  // set time to 0, will reset when the game begins
  timer.innerHTML = "Time: 0";

  //create button for high scores
  var scorebtn = document.createElement("button");
  scorebtn.setAttribute("class", "scores");
  scorebtn.innerHTML = "View High Scores";
  //apend button to the score div
  score.append(scorebtn);
}

init();
console.log(questions.length)