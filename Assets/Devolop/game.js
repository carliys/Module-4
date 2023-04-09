const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
//console.log(choices)

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What does DB stand for?",
        choice1: "Devin Booker",
        choice2: "Data Base",
        choice3: "Both A and B",
        choice4: "None of The Above",
        answer: 1

    },
    {
        question: "What does GOAT stand for?",
        choice1: "Goat",
        choice2: "Micheal Jordan",
        choice3: "Devin Booker",
        choice4: "Greatest Of All Time",
        answer: 3
    },
    {
        question: "Who is the biggest Phoenix Suns fan?",
        choice1: "Devin Booker",
        choice2: "Me",
        choice3: "None of the above",
        choice4: "Brandon aka Brawdis",
        answer: 4
    },
    {
        question: "Who wears the number '1' in the Phoenix Suns",
        choice1: "IDK",
        choice2: "Chris Paul",
        choice3: "HTML",
        choice4: "Devin Booker",
        answer: 4
    },
    {
        question: "Who is Devin Booker",
        choice1: "A basket player",
        choice2: "Devin Booker",
        choice3: "A football player",
        choice4: "None of the above",
        answer: 2
    },
    {
        question: "Who is a famous person that resides in phoenix",
        choice1: "Kurt Warner",
        choice2: "Devin Booker",
        choice3: "Frankie Muniz",
        choice4: "Larry Fitzgerald",
        answer: 2 
    },
    {
        question: "How do you spell Devin Booker",
        choice1: "Devin Booker",
        choice2: "Devon Booker",
        choice3: "Diven Booker",
        choice4: "Devin B00ker",
        answer: 1
    },
    {
        question: "Who scored a game-winning three-pointer against the Los Angeles Clippers in Game 2 of the 2021 Western Conference Finals?",
        choice1: "Steph Curry",
        choice2: "Micheal Jordan",
        choice3: "Devin Booker",
        choice4: "Micheal B Jordan",
        answer: 3 
    },
    {
        question: "What does CSS stand for?",
        choice1: "Cascading Style Sheets",
        choice2: "Devin Booker",
        choice3: "Cascading Sheets Style",
        choice4: "cool style sheets",
        answer: 2 
    },
    {
        question: "What is the abbreviation for Java Script",
        choice1: "DB",
        choice2: "JSC",
        choice3: "JS",
        choice4: "None of the above",
        answer: 1 
    }
];

//const
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = ()  => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //goes to the end of the page
        return window.location.assign("/Assets/Devolop/end.html");

    }
    questionCounter++;
    // makes the question go from 1/10 - 10/10 "top left"
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        //console.log(e.target);

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        //console.log(classToApply);


        // everytime you get than answer right you get a point
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        

        /* const classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer){
            classToApply = 'correct'; 
            console.log(classToApply);
        } */
        //console.log(selectedAnswer == currentQuestion.answer);
    });
});

incrementScore = num => {
    score += num;
    //updates score text
    scoreText.innerText = score;
}


startGame();