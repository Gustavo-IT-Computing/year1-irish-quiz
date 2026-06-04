// Creating a var called question for the array of the questions that will be displayed 
var questions = [
    {
      question:  "Was the Halloween originated in Ireland?",
      type: "radio",
      choices: ["True", "False"],
      correctAnswer: 0
    },
    {
      question: "Which was the original colour of Saint Patrick?",
      type: "radio",
      choices: ["Green", "Yellow", "Blue", "Red"],
      correctAnswer: 2
    },
    {
      question: "What is the oldest pub in Dublin?",
      type: "radio",
      choices: ["The Temple Bar", "Pygmalion", "The Brazen Head", "Murrays Pub"],
      correctAnswer: 2
    },
    {
      question: "What is the name of the largest enclosed park in Europe?",
      type: "text",
      correctAnswer: "Phoenix Park",
    },
    {
      question: "Which is the most popular beer in Ireland?",
      type: "image",
      choices: ["carlsberg", "coors" , "guiness", "heineken"],
      correctAnswer: 2
    },
    {
      question: "What is the most popular sport in Ireland?",
      type: "radio",
      choices: ["Football", "Volleyball", "Curling", "Rugby"],
      correctAnswer: 3
    },
    {
      question: "There are snakes in Ireland!",
      type: "radio",
      choices: ["True","False"],
      correctAnswer: 1
    },
    {
      question: "What is the national symbol of Ireland?",
      type: "text",
      correctAnswer: "Harp"
    },
    {
      question: "Who is the current President of Ireland?",
      type: "image",
      choices: ["martin", "mary", "michael", "vasileos"],
      correctAnswer: 2
    },
    {
      question: "Which is the longest river in Ireland?",
      type: "radio",
      choices: ["Liffey River", "Shannon River", "Nilo River", "Grand Canal Dock River"],
      correctAnswer: 1
    }
  ];
// Shuffle the questions, so it does not give the same question when the quiz restarts 
  shuffle(questions);
  
  var currentQuestion = 0;// Define a variable to keep track of the current question number
  var score = 0; // Define a variable to keep track of the score
  var playerName = ""; // Define a variable to store the name of the player 
  
// Get elements from HTML
  var introScreen = document.getElementById("intro"); // getting the intro id 
  var nameInput = document.getElementById("name"); // getting the name id 
  var startBtn = document.getElementById("startBtn"); // getting the startBtn id 
  var quizScreen = document.getElementById("quiz"); // getting the quiz id 
  var questionNum = document.getElementById("questionNum"); // getting the questionNum id 
  var questionTitle = document.getElementById("questionTitle"); // getting the questionTitle id 
  var choices = document.getElementById("choices"); // getting the choices id 
  var prevBtn = document.getElementById("prevBtn"); // getting the prevBtn id 
  var nextBtn = document.getElementById("nextBtn"); // getting the nextBtn id 
  var feedbackScreen = document.getElementById("feedback"); // getting the feedback id 
  var scoreText = document.getElementById("score"); // getting the score id 
  var messageText = document.getElementById("message"); // getting the message id 
  var alertMessage = document.getElementById ("alertMessage"); // getting the alertMessage id 
  var restartBtn = document.getElementById("restartBtn"); // getting the restartBtn id 
  var submitBtn = document.getElementById("submitBtn"); // getting the submitBtn id 
  var testRestartBtn = document.getElementById("restart-button");

// Hide quiz and feedback screens
quizScreen.style.display = "none"; // hiding the quiz 
feedbackScreen.style.display = "none"; // hiding the feedback 

// Start quiz when start button is clicked
startBtn.addEventListener("click", function() {
playerName = nameInput.value; // getting the name of the user
if (playerName === "") { // if statement if nothing is input
    alertMessage.textContent = "Please enter an username"; // enter a message in case nothing is input
} else {
introScreen.style.display = "none"; // hiding the welcome page 
quizScreen.style.display = "block"; // displaying the quiz 
alertMessage.style.display = "none"; // hiding the alert message 
showQuestion(); // initializing the quiz 
}
});

// Show current question
function showQuestion() {
var q = questions[currentQuestion]; // getting the current question 
questionNum.innerHTML = "Question " + (currentQuestion + 1); // inputting the number of the question 
questionTitle.innerHTML = q.question;

// Clear choices
choices.innerHTML = ""; // clearing the choices 

// Add choices
if (q.type === "radio") { // when is a radio question 
for (var i = 0; i < q.choices.length; i++) { // creating a for loop for the questions 
var choice = q.choices[i]; // getting the choice by the index that keep track of the answer
var radioBtn = document.createElement("input"); // input element 
radioBtn.type = "radio"; // type equals to radio 
radioBtn.name = "choice"; // name equal to choice 
radioBtn.value = i; // value equals the index 
choices.appendChild(radioBtn); // choices will appear as a radio
choices.appendChild(document.createTextNode(choice)); // choices will display to be clicked in only one 
choices.appendChild(document.createElement("br")); // separating by lines 
}
} else if (q.type === "text") { // when is a text question 
var textInput = document.createElement("input");  // input element 
textInput.type = "text"; // type equals text
textInput.id = "textInput"; // id equals textinput 
choices.appendChild(textInput); // the choice will appear to insert a text 
}
else if (q.type === "image") { // when in an image question
for (var i = 0; i < q.choices.length; i++) { // creating a for loop for the questions
var img = document.createElement("img"); // img element 
img.src = "images/" + q.choices[i] + ".jpg"; // set the image URL
img.width = 200; // 200 as width 
img.height = 200; // 200 as height 
img.style.marginRight = "10px"; //10px of margin 
var radioBtn = document.createElement("input"); // rinput element created 
radioBtn.type = "radio"; // type quals radio 
radioBtn.name = "choice"; // name equals choice 
radioBtn.value = i; // value equals index 
choices.appendChild(img); // the choices will appear as images 
choices.appendChild(radioBtn); // choices will appear in radio side by side 
}}

// Show prev/next buttons
if (currentQuestion === 0) { // when in the first  question 
prevBtn.style.display = "none"; // previous button hidden 
restartBtn.style.display = "none"; // restart button hidden 
submitBtn.style.display = "none"; // submit button hidden 
} else { // when not the first question 
prevBtn.style.display = "inline"; // previous button displayed as inline 
restartBtn.style.display = "none"; // restart button keeps hidden 
submitBtn.style.display = "none"; // submit button keeps hidden 
}
if (currentQuestion === questions.length - 1) { // when in the last question 
nextBtn.style.display = "none"; // next button hiddden 
submitBtn.style.display = "inline-block"; // submit button displayed as inline 
} else { // if not in the last question 
//restartBtn.style.display = "inline-block";
nextBtn.style.display = "inline-block";// next button as inline block 
submitBtn.style.display = "none"; // submit button hidden 
}
}

// Check answer when next button is clicked
nextBtn.addEventListener("click", function() { // function for the next button 
var q = questions[currentQuestion]; // gets the current question 
var choice; // gets the choice 
if (q.type === "radio") { // if statement for the radio question
var radios = document.getElementsByName("choice"); // get the choice element 
for (var i = 0; i < radios.length; i++) { // for loop to check the questions 
if (radios[i].checked) { // if statement to check the answers 
choice = parseInt(radios[i].value); // gets the choice and parses the index into the value 
break;}}
if (typeof choice === "undefined") { // if statement when the choice is not made 
alert("Please select an answer."); // alert the user to select an answer 
return; }
} else if (q.type === "text") { // when the question type is text 
var textInput = document.getElementById("textInput"); // create texInput element 
if (textInput.value === "") { // if statement if nothing is input
alert("Please enter an answer."); // alert the user to enter an answer
return;}
choice = textInput.value.toLowerCase();} // gets the choice in lowercase, ignoring if there is any uppercase 
if (choice === q.correctAnswer) { //if statement when the choice made is correct 
score++;} // add to the score 
currentQuestion++; // go for the next question 
if (currentQuestion === questions.length) { // if statement when the current question is the last one 
submitBtn.style.display = "inline"; // display the submit button as inline 
} else { // otherwise, initialise the quiz 
showQuestion();}
});

// Show previous question when prev button is clicked
prevBtn.addEventListener("click", function() { // function for the previous button 
currentQuestion--; // goes back a question 
showQuestion(); // whenever the quiz starts 
});

// Add event listener to Submit button
submitBtn.addEventListener("click", function() { // function for the submit button 
showQuestion(); // when the quiz starts 
// Show feedback screen
quizScreen.style.display = "none"; // quiz screen hidden 
feedbackScreen.style.display = "block"; // feedback screen displayed as block 
restartBtn.style.display= "block"; // restart button displayed as inline 
var playername2 = playerName.toUpperCase(); // get the name of the user and returns in the feedback all uppercase 
// Display score and message
var percentage = Math.round(score / questions.length * 100); // getting the percentage calculation 
scoreText.innerHTML = "You scored " + score + " out of " + questions.length + " (" + percentage + "%)"; // getting the result
if (percentage === 100) {  // if statement in case of all the answers correct
messageText.innerHTML = "Congratulations, " + playername2 + ", you got a perfect score!"; // getting the congratulations message 
} else if (percentage >= 70) { // else if for the results equals or greater than 70%
messageText.innerHTML = "Well done, " + playername2 + ", you passed the quiz!"; // getting the message that did well
} else { // less than 70%
messageText.innerHTML = "Sorry, " + playername2 + ", you didn't pass the quiz. Keep trying!"; // try again because it did not go well
}
});
  
//Restart quiz when restart button is clicked
restartBtn.addEventListener("click", function() { // function for the restart button 
showQuestion(); // when the quiz starts 
score = 0; // scores equals to 0
currentQuestion = 0; // the question is 0
});
  
// Validate name input
nameInput.addEventListener("input", function() { // function to validate the name input 
if (nameInput.value === "") { // if the name is empty or nothing is added
nameInput.classList.add("invalid"); // makes it invalid 
startBtn.disabled = true; // and disable the start functionality 
} else { // otherwise 
nameInput.classList.remove("invalid"); // remove the invalid attribute 
startBtn.disabled = false; // and makes the disabled attribute invalid
}});
    
// Validate text input
quizScreen.addEventListener("input", function() { // validating the quiz game 
var q = questions[currentQuestion]; // get the current questions 
if (q.type === "text") { // when equals to text 
var textInput = document.getElementById("textInput"); // get the textInput 
if (textInput.value === "") { // when it is empty 
nextBtn.disabled = true; // makes the next button disabled 
} else { // otherwise 
nextBtn.disabled = false; // makes the disables attribute false 
}} });
    
// Shuffle questions
function shuffle(array) { // function to make the question randomly when the quiz starts 
for (var i = array.length - 1; i > 0; i--) { // for loop that will discrement 
var j = Math.floor(Math.random() * (i + 1)); // getting the maths by getting the second index and adding to the first one 
var temp = array[i]; // array for the first index 
array[i] = array[j]; // making the first array becoming a second one 
array[j] = temp;} // making the second array becoming the first again 
return array;} // returning the function 
    
// Shuffle questions and choose 5
questions = shuffle(questions).slice(0, 5); // getting 5 ramdom questions 
    
// Start quiz
showQuestion();// initializing the quiz 


testRestartBtn.addEventListener('click', () => {
  location.reload()
})