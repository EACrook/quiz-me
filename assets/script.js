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
var timeLeftSeconds = 20
var intervalHandle;

function timer() {
    renderTime();

    intervalHandle = setInterval(tick, 1000);

    function tick() {
        timeLeftSeconds--;
        renderTime();

        if (timeLeftSeconds < 1) {
            clearInterval(intervalHandle);
            displayEndGame();
        }
    }
}

function removeTimeHandler() {
    timeLeftSeconds -= 2
    renderTime()
}

function renderTime() {
    if (timeLeftSeconds < 1) {
        document.getElementById("quiz-timer").innerHTML = 'Time is up!'

    } else {
        document.getElementById("quiz-timer").innerHTML = `${timeLeftSeconds} seconds left`
    }
}

function takeToQuiz() {
    startQuiz.addEventListener("click", function (s) {
        console.log('start quiz clicked', s.target.innerHTML)
        timeLeftSeconds = 20
        timer();
        displayQuestions();
    })
}

function takeToScores() {
    highScoreBtn.addEventListener("click", function (v) {
        console.log('high score btn clicked', v.target.innerHTML)
        displayLeaderBoard();
    })
}

function welcomePage() {
    questionDisplay.innerHTML = '';
    endGame.innerHTML = '';

    takeToQuiz()
    takeToScores()
}

// display questions functionality
function displayQuestions() {
    mainDisplayEl.innerHTML = '';
    questionDisplay.innerHTML = '';
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

            if (questions[quesIndex].answer === e.target.innerHTML) {
                console.log('answered correctly')
                trackScore++;
            } else {
                console.log('oops, that is wrong')
                removeTimeHandler();
            }
            quesIndex++;

            if (quesIndex >= questions.length) {
                questionDisplay.innerHTML = '';
                clearInterval(intervalHandle);
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
    trackScore = trackScore + timeLeftSeconds

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

    submitButtonEl.addEventListener("click", function () {
        var scores = []


        if (localStorage.getItem('scores')) {
            scores = JSON.parse(localStorage.getItem('scores'))
        }


        scores.push({
            name: inputInitials.value,
            score: trackScore
        })

        scores.sort((a, b) => b.score - a.score)

        scores = scores.slice(0, 3)

        localStorage.setItem("scores", JSON.stringify(scores));
        endGame.innerHTML = "";

        displayLeaderBoard();
    })

}

function displayLeaderBoard() {
    mainDisplayEl.innerHTML = '';

    var leaderIntroEl = document.createElement("h2");
    leaderIntroEl.textContent = "Here are the top three leaders!"
    leaderBoard.appendChild(leaderIntroEl);

    var scores = JSON.parse(localStorage.getItem('scores'))

    scores.forEach(function (score) {
        var listScoreEl = document.createElement("li");
        listScoreEl.textContent = score.name + " has a score of " + score.score;

        leaderBoard.appendChild(listScoreEl)
    })

    var goHomeBtn = document.createElement("button");
    goHomeBtn.setAttribute("type", "submit");
    goHomeBtn.setAttribute("value", "Go Home");
    goHomeBtn.textContent = "Go Home";
    leaderBoard.appendChild(goHomeBtn);

    goHomeBtn.addEventListener("click", function () {
        location.reload()
    });

    var clearScores = document.createElement("button")
    clearScores.textContent = "Clear High Scores"
    clearScores.addEventListener('click', () => {
        localStorage.setItem("scores", JSON.stringify([]))
        location.reload()
    })
    leaderBoard.appendChild(clearScores)
}

welcomePage();