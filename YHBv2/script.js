// Get DOM elements
const gameContainer = document.getElementById("game");
const bird = document.getElementById("bird");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startButton = document.getElementById("startButton");
const retryButton = document.getElementById("retryButton");
const scoreDisplay = document.getElementById("score");
const pipeTop = document.getElementById("pipe-top");
const pipeBottom = document.getElementById("pipe-bottom");

// Game variables
let birdY = 360;
let birdDY = 0;
let pipeX = 1080;
let gap = 250;
let topPipeHeight = 0;
let bottomPipeHeight = 0;
let score = 0;
let playing = false;

// Flap bird
function flap() {
    if (!playing) return;
    birdDY = -12;
}

// Generate random pipe heights
function generatePipeHeights() {
    topPipeHeight = Math.floor(Math.random() * (400 - 150 + 1)) + 150;
    bottomPipeHeight = 720 - topPipeHeight - gap;
}

// Create pipe elements
function createPipes() {
    const topPipe = document.createElement("div");
    topPipe.classList.add("pipe");
    topPipe.style.top = "0";
    gameContainer.appendChild(topPipe);

    const bottomPipe = document.createElement("div");
    bottomPipe.classList.add("pipe");
    bottomPipe.style.bottom = "0";
    gameContainer.appendChild(bottomPipe);

    return [topPipe, bottomPipe];
}

// Update score
function updateScore() {
    score++;
    scoreDisplay.textContent = score;
}

// Reset game
function resetGame() {
    birdY = 360;
    birdDY = 0;
    pipeX = 1080;
    generatePipeHeights();
    score = 0;
    scoreDisplay.textContent = score;
    gameOverScreen.style.display = "none";
    playing = true;
    update();
}

// Start game
function startGame() {
    startScreen.style.display = "none";
    generatePipeHeights();
    playing = true;
    update();
}

// Game over
function gameOver() {
    playing = false;
    gameOverScreen.style.display = "flex";
}

// Main game loop
function update() {
    if (!playing) return;

    birdY += birdDY;
    birdDY += 0.8;
    bird.style.top = birdY + "px";

    pipeX -= 4;
    if (pipeX <= -52) {
        pipeX = 1080;
        generatePipeHeights();
        updateScore();
    }

    const pipes = createPipes();
    pipeTop.style.left = pipeX + "px";
    pipeBottom.style.left = pipeX + "px";
    pipeTop.style.height = topPipeHeight + "px";
    pipeBottom.style.height = bottomPipeHeight + "px";
    pipeBottom.style.top = (topPipeHeight + gap) + "px";

    const birdRect = bird.getBoundingClientRect();
    const ceilingRect = document.querySelector(".ceiling").getBoundingClientRect();
    const groundRect = document.querySelector(".ground").getBoundingClientRect();
    const topPipeRect = pipes[0].getBoundingClientRect();
    const bottomPipeRect = pipes[1].getBoundingClientRect();

    if (
        birdRect.right > topPipeRect.left &&
        birdRect.left < topPipeRect.right &&
        birdRect.bottom > topPipeRect.top &&
        birdRect.top < topPipeRect.bottom ||
        birdRect.right > bottomPipeRect.left &&
        birdRect.left < bottomPipeRect.right &&
        birdRect.bottom > bottomPipeRect.top &&
        birdRect.top < bottomPipeRect.bottom ||
        birdRect.top < ceilingRect.bottom ||
        birdRect.bottom > groundRect.top
        ) {
        gameOver();
        } else {
        setTimeout(update, 20);
        }
        }
        
        // Event listeners
        gameContainer.onclick = flap;
        startButton.onclick = startGame;
        retryButton.onclick = resetGame;
        generatePipeHeights();
