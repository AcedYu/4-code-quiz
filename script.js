// Step 1: render quiz main page. A Title + description about the Code Quiz (high score button should also be there)
// Step 2: Begin quiz upon CLICKING BUTTON to begin quiz. Start timer. Render first quiz question.
// Upon CLICKING an anser move on to the next question, regardless of accuracy.
// Renders next question with the same layout as previous. Somewhere on screen render the result of the last question (correct or incorrect) and then let it fade away. Deduct time from the timer if incorrect.
// Upon quiz completion render a FORM to input user initials
// Save the initials and score into the scoreboard. Sort scoreboard by score.

// Scores will be organized as an object within local storage. Each key will be the user inserted intials, and its value will be the user's score. Multiple scores under the same user will transform the score value into an quizArray of score values.
// Example Entry: {AB: 100, CD:[90, 80]}

// Grab all of sections on the HTML page.
var timer = document.querySelector("#timer");
var score = document.querySelector("#score");
var app = document.querySelector("#app");
var note = document.querySelector("#notification");

// global variables for the timer
var secondsLeft = 0;
var stopTime = false;

// global variable for score points
var points = 0;

// global variable for the high score list
// if there is data in the local storage, use it for the highScores object
var highScores = JSON.parse(localStorage.getItem("scores"));
if (!highScores) {
  highScores = {};
}

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
  },
  {
    question: `Which of the following data types holds the values for values such as "true" and "false"?`,
    answer: "boolean",
    wrong: ["number", "string", "object"]
  }
];

var init = () => {
  // Render main screen header: title, description about the Code Quiz, high scores button, and begin quiz button
  // Clear out any html before we begin
  app.innerHTML = "";
  timer.innerHTML = "";
  score.innerHTML = "";
  note.innerHTML = "";
  // Title
  var h1 = document.createElement("h1");
  h1.innerHTML = "Coding Quiz Game"
  // Description
  var description = document.createElement("p");
  description.innerHTML = "Answer the following questions before time runs out! The timer will be set to 60 seconds. Wrong answers will penalize you with a 10 second time reduction."

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
  timer.innerHTML = "Time: 0"

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
    points++;
    if(quizArray[index+1]) {
      renderQuestion(quizArray, index + 1);
    } else {
      concludeQuiz(true);
    }
    renderNote(true);
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
      // Add the time deduction penalty
      secondsLeft -= 10;
      if(quizArray[index+1]) {
        renderQuestion(quizArray, index + 1);
      } else {
        concludeQuiz(true);
      }
      renderNote(false);
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

// Render a fading notification on accuracy
var renderNote = (flag) => {
  note.innerHTML = "";
  // Generate stylized line break
  var line = document.createElement("hr");
  // Generate Message based on flag true or false
  var message = document.createElement("p");
  if (flag) {
    message.innerHTML = "Correct!";
  } else {
    message.innerHTML = "Wrong!";
  }
  note.append(line);
  note.append(message);
  fade(note);
}

// fade function to delete note from the screen after a short delay (500ms)
var fade = (element) => {
  var seconds = 1;
  var timer = setInterval(function () {
      seconds--;
      if (seconds === 0) {
        element.innerHTML = "";
      }
  }, 500);
}

// Timer function
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
      concludeQuiz(false);
    }
    // Stop the timer if stopTime flag is true. Stops the timer when the quiz concludes by finishing all of the questions
    if (stopTime) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

// Conclude quiz function, accepts a boolean
var concludeQuiz = (flag) => {
  // Clear App div
  app.innerHTML = "";
  // Create Quiz Complete announcement
  var h1 = document.createElement("h1");
  h1.innerHTML = "Quiz Complete";

  // True flag means all question completion, false flag means time ran out before completion change innertext of P element based off of flag
  var message = document.createElement("p");
  if (flag) {
    stopTime = true;
    message.innerHTML = "Congratulations! You've completed all of the questions."
  } else {
    message.innerHTML = "Time's up!"
  }

  // Create the points result
  var result = document.createElement("h2");
  result.innerHTML = "Your Score: " + points;

  // Create initials form
  var form = document.createElement("form");
  var label =  document.createElement("label");
  label.setAttribute("for", "initials");
  label.innerHTML = "Enter your initials here: "
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "initials");
  input.setAttribute("name", "initials");
  input.setAttribute("maxlength", "2");
  // a cool attribute to prevent the input from accepting anything other than a lowercase alphabetical value
  input.setAttribute("onkeyup", "this.value = this.value.replace(/[^a-z]/, '')");
  var submitbtn = document.createElement("input");
  submitbtn.setAttribute("type", "submit");
  submitbtn.setAttribute("value", "Submit");
  // Add event listener on form submit
  form.addEventListener("submit", (event) => {
    // prevent default submission event
    event.preventDefault();
    // capitalize our initials input
    var capitalize = input.value.toUpperCase();
    // add our initials to the addScore function
    addScore(capitalize);
  });

  // Append parts to the form
  form.append(label);
  form.append(input);
  form.append(submitbtn);

  // Append Elements onto screen
  app.append(h1);
  app.append(message);
  app.append(result);
  app.append(form);
}

// Add Score function
var addScore = (player) => {
  // if the player has multiple scores under a set of initaials already then send the score to the array
  if (Array.isArray(highScores[player])) {
    highScores[player].push(points);
  }
  // if the player has only one other score, turn the value into an array storing the past and present score
  else if (highScores[player]) {
    var scoresArray = [];
    scoresArray.push(highScores[player]);
    scoresArray.push(points);
    highScores[player] = scoresArray;
  }
  // or else assign the score to the key of the player intials
  else {
    highScores[player] = points;
  }
  // update local storage with new updated highScores object
  localStorage.setItem("scores", JSON.stringify(highScores));
  // render high score view screen
  viewScores();
}

// View Scores function
var viewScores = () => {
  // Clear the screen
  app.innerHTML = "";
  timer.innerHTML = "";
  score.innerHTML = "";
  // Define our high scores display array
  var rankings = [];
  // transform our object into an array of arrays with each array holding 2 values, index 0 being the key, and index 1 being the score value
  // iterate through the object
  for (var key in highScores) {
    // if highScores[key] is an array iterate through the array and add all of values to the rankings array
    if (Array.isArray(highScores[key])) {
      for (var i = 0 ; i < highScores[key].length; i++) {
        var entry = [];
        entry.push(key);
        entry.push(highScores[key][i]);
        rankings.push(entry);
      }
    }
    // otherwise add the entry found at the object key
    else {
      var entry = [];
      entry.push(key);
      entry.push(highScores[key]);
      rankings.push(entry);
    }
  }
  // sort the rankings value in descending order
  rankings = rankings.sort((a, b) => b[1]-a[1]);

  // create the html to display the scores
  var scoreTitle = document.createElement("h1");
  scoreTitle.innerHTML = "High Scores";
  var scoreList =  document.createElement("ol");

  // get each score into the ordered list
  for (var i = 0; i < rankings.length; i++) {
    var scoreEntry = document.createElement("li");
    scoreEntry.innerHTML = rankings[i][0] + " - " + rankings[i][1];
    scoreList.append(scoreEntry);
  }

  // add return to beginning button
  var returnbtn = document.createElement("button");
  returnbtn.innerHTML = "Go Back";
  returnbtn.addEventListener("click", () => {
    init();
  });

  // add delete all scores button
  var deletebtn = document.createElement("button");
  deletebtn.innerHTML = "Clear High Scores";
  deletebtn.addEventListener("click", () => {
    // clear the highScores Object
    highScores = {};
    // record our clear into local storage
    localStorage.setItem("scores", JSON.stringify(highScores));
    viewScores();
  });
  // append all parts to app
  app.append(scoreTitle);
  app.append(scoreList);
  app.append(returnbtn);
  app.append(deletebtn);
}

// start init
init();