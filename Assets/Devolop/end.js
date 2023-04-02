const username = document.getElementById("name");
const saveScoreBtn = document.getElementById("saveBtn")
const finalScored = document.getElementById("finalScored")
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse (localStorage.getItem("highScores")) || [];
console.log(highScores);

finalScored.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
})


saveScore = e => {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);

    localStorage.setItem("highScores",JSON.stringify(highScores));

};

