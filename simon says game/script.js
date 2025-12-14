let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start game
document.addEventListener("keydown", function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        let userColor = this.id;
        userClickedPattern.push(userColor);
        animatePress(userColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;

    let randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    flashButton(randomColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        document.body.classList.add("game-over");
        document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

function flashButton(color) {
    let btn = document.getElementById(color);
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 200);
}

function animatePress(color) {
    let btn = document.getElementById(color);
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
