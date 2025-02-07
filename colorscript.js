const colorBox = document.getElementById("colorBox");
const gameInstructions = document.getElementById("gameInstructions");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let score = 0;
let targetColor = "";
let colorOptions = [];

// Function to generate a random color in hex format
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


// Function to generate 6 color options
function generateColorOptions() {
  while (colorOptions.length < 6) {
    const color = generateRandomColor();
    if (!colorOptions.includes(color) && color !== targetColor) {
      colorOptions.push(color);
    }
  }

  // Randomly place the correct answer among the options
  const randomIndex = Math.floor(Math.random() * 6);
  colorOptions[randomIndex] = targetColor;

  colorOptionsContainer.innerHTML = "";
  colorOptions.forEach((color) => {
    const colorButton = document.createElement("div");
    colorButton.classList.add("color-option");
    colorButton.style.backgroundColor = color;
    colorButton.addEventListener("click", () => handleGuess(color));
    colorOptionsContainer.appendChild(colorButton);
  });
}

// Function to handle the guess
function handleGuess(selectedColor) {
  if (selectedColor === targetColor) {
    score++; // Increment the score if the guess is correct
    gameStatus.textContent = "Correct!";
    gameStatus.style.color = "green";
  } else {
    gameStatus.textContent = "Wrong! Try Again!";
    gameStatus.style.color = "red";
  }

  scoreDisplay.textContent = `Score: ${score}`; // Update the score display
  setTimeout(startNewGame, 1000); // Restart the game after 1 second
}
// Function to start a new game
function startNewGame() {
  score = 0;  // Reset the score to 0
  scoreDisplay.textContent = `Score: ${score}`; // Display the score
  gameStatus.textContent = ""; // Reset the game status message
  gameInstructions.textContent = "Guess the correct color!"; // Game instructions
  colorOptions = [];
  targetColor = generateRandomColor();
  colorBox.style.backgroundColor = targetColor; // Set the target color
  generateColorOptions();
}


// Initialize the game
startNewGame();

// Set up the "New Game" button
newGameButton.addEventListener("click", startNewGame);
