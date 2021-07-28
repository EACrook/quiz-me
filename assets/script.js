var questionDisplay = document.querySelector("#question-display");
var mainDisplayEl = document.querySelector(".main-page");
var startQuiz = document.querySelector("#start-quiz");
var highScoreBtn = document.querySelector("#score-page");
var highScores = document.querySelector("#high-scores");
var endGame = document.querySelector("#end-game");
var leaderBoard = document.querySelector("#leader-board");

// list of scores
var questions = [{
        question: "What is the capital of Wisconsin?",
        answer: "Madison",
        choices: ["Milwaukee", "Green Bay", "Sheboygan", "Madison"]

    },
    {
        question: "What is the Wisconsin state motto?",
        answer: "Forward",
        choices: ["Forward", "Tomorrow", "Onward", "Toward"]
    },
    {
        question: "What is Wisconsin's largest city?",
        answer: "Milwaukee",
        choices: ["Madison", "Ashland", "Green Bay", "Milwaukee"]
    },
    {
        question: "What is Wisconsin's state bird?",
        answer: "Robin",
        choices: ["Turkey", "Robin", "Eagle", "Cardinal"]
    },
    {
        question: "What is the state flower?",
        answer: "Wood Violet",
        choices: ["Wild Blue Phlox", "Dwarf Lake Iris", "Wood Violet", "Chicory"]
    }
]

// to keep track of score
var trackScore = 0;
var quesIndex = 0;

function takeToQuiz() {
    startQuiz.addEventListener("click", function(s) {
        console.log('start quiz clicked', s.target.innerHTML)
        displayQuestions();
    })
}

function takeToScores() {
    highScoreBtn.addEventListener("click", function(v) {
        console.log('high score btn clicked', v.target.innerHTML)
        displayLeaderBoard();
    })
}

function welcomePage(e) {
    questionDisplay.innerHTML = '';
    highScores.innerHTML = '';

    takeToQuiz()
    takeToScores()
}

// display questions functionality
function displayQuestions() {
    mainDisplayEl.innerHTML = '';
    questionDisplay.innerHTML= '';
    leaderBoard.innerHTML = '';

    var askQuestion = document.createElement("p");
    askQuestion.textContent = questions[quesIndex].question;
    questionDisplay.appendChild(askQuestion);

    for (let i = 0; i < questions[quesIndex].choices.length; i++) {
        // Get choice buttons on page
        var choiceButtonEl = document.createElement("button");
        choiceButtonEl.textContent = questions[quesIndex].choices[i];
        choiceButtonEl.className = "btn choice-btn";
        choiceButtonEl.id = i.toString();
        questionDisplay.appendChild(choiceButtonEl);
        // can click buttons and prints out which one was clicked
        document.querySelector("choiceButtonEl");
        choiceButtonEl.addEventListener("click", typeEvent);
        // choice matches the answer, then the score goes up, else it remains the same
        function typeEvent(e) {
            console.log('button was clicked!!', e.target.innerHTML)

            if(questions[quesIndex].answer === e.target.innerHTML) {
                console.log('answered correctly')

                trackScore++
                quesIndex++
            } else {
                console.log('oops, that is wrong')

                quesIndex++
            }

            if (quesIndex >= questions.length) {
                questionDisplay.innerHTML = '';
                displayEndGame();
                console.log('time to run the endGame')
            } else {
                displayQuestions()
            }
        }
    }
}

function displayEndGame() {
    questionDisplay.innerHTML = "";
    mainDisplayEl.innerHTML = "";

    var congratsScore = document.createElement("h3");
    congratsScore.textContent = 'Congratulations, you have finished the quiz! Your final score is: ' + trackScore + '!';
    endGame.appendChild(congratsScore);

    var enterInitials = document.createElement("p");
    enterInitials.textContent = 'Enter your initials and see where you are on the leader board.';
    endGame.appendChild(enterInitials);

    var inputInitials = document.createElement("input")
    inputInitials.setAttribute("type", "text");
    inputInitials.setAttribute("minlength", "2");
    inputInitials.setAttribute("maxlength", "3");
    endGame.appendChild(inputInitials);

    var submitButtonEl = document.createElement("button");
    submitButtonEl.setAttribute("type", "submit");
    submitButtonEl.setAttribute("value", "Submit");
    submitButtonEl.textContent = "Submit";
    endGame.appendChild(submitButtonEl);

    submitButtonEl.addEventListener("click", function() {
        var nameArray = []
        var scoreArray = []


        if(localStorage.getItem('name')){
            nameArray = JSON.parse(localStorage.getItem('name'))
        }

        if(localStorage.getItem('score')){
            scoreArray = JSON.parse(localStorage.getItem('score'))
        }

        
       nameArray.push(inputInitials.value)
       scoreArray.push(trackScore)

        localStorage.setItem("name", JSON.stringify(nameArray));
        localStorage.setItem("score", JSON.stringify(scoreArray));
        endGame.innerHTML = "";

        displayLeaderBoard();
    })

}

function displayLeaderBoard() {
    var leaderIntroEl = document.createElement("h2");
    leaderIntroEl.textContent = "Here are the top three leaders!"
    leaderBoard.appendChild(leaderIntroEl);

    var nameArray = JSON.parse(localStorage.getItem('name'))
    var scoreArray = JSON.parse(localStorage.getItem('score'))

    scoreArray.forEach(function(score, i) {
        console.log('I in the for each!!!', i)
        var listScoreEl = document.createElement("li");
        listScoreEl.textContent = nameArray[i] + " has a score of " + score;

        leaderBoard.appendChild(listScoreEl)
    })
}

welcomePage();

// <p>Enter your initials and see where you are on the leader board.</p>