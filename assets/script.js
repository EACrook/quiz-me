var questionDisplay = document.querySelector("#question-display");
var mainDisplayEl = document.querySelector(".main-page");
var startQuiz = document.querySelector("#start-quiz");
var highScoreBtn = document.querySelector("#score-page");
var highScores = document.querySelector("#high-scores");

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
// var trackScore = 0;
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
        // highScoreLog();
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
    highScores.innerHTML = '';

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

                // trackScore++
                quesIndex++
            } else {
                console.log('oops, that is wrong')

                quesIndex++
            }

            if (quesIndex >= questions.length) {
                questionDisplay.innerHTML = '';
                // endGame();
                console.log('time to run the endGame')
            } else {
                displayQuestions()
            }
        }
    }
}

welcomePage();