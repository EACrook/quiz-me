var questionDisplay = document.querySelector("#question-display");

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

var trackScore = 0;
