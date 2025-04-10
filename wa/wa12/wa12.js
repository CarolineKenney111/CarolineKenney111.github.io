const dogImg = document.getElementById('dog-image');
const dogAnswer = document.getElementById('dog-answer');
const spinner = document.getElementById('spinner');
const newDogBtn = document.getElementById('js-new-dog');
const showAnswerBtn = document.getElementById('js-show-answer');
const guessBtn = document.getElementById('js-guess-breed');
const guessInput = document.getElementById('breed-input');
const guessResult = document.getElementById('guess-result');

let currentBreed = '';

function showSpinner() {
  spinner.classList.remove('hidden');
}
function hideSpinner() {
  spinner.classList.add('hidden');
}

function formatBreedFromURL(url) {
  const match = url.match(/breeds\/(.+?)\//);
  if (match && match[1]) {
    let breed = match[1].replace('-', ' ');
    breed = breed.split('/').reverse().join(' ');
    return breed.charAt(0).toUpperCase() + breed.slice(1);
  }
  return 'Unknown';
}

async function getDog() {
  showSpinner();
  dogAnswer.classList.add('hidden');
  guessInput.value = "";
  guessResult.textContent = "";

  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();

    dogImg.src = data.message;
    currentBreed = formatBreedFromURL(data.message);
    dogAnswer.textContent = `🐶 ${currentBreed}`;
  } catch (err) {
    console.error(err);
    alert("Could not fetch dog. Try again.");
  } finally {
    hideSpinner();
  }
}

function showAnswer() {
  dogAnswer.classList.remove('hidden');
}

function handleGuess() {
  const userGuess = guessInput.value.trim().toLowerCase();
  const correctBreed = currentBreed.toLowerCase();

  if (!userGuess) {
    guessResult.textContent = "Please enter a guess!";
    return;
  }

  if (userGuess === correctBreed) {
    guessResult.textContent = "✅ Correct!";
  } else {
    guessResult.textContent = `❌ Wrong! It was: ${currentBreed}`;
  }
}

newDogBtn.addEventListener('click', getDog);
showAnswerBtn.addEventListener('click', showAnswer);
guessBtn.addEventListener('click', handleGuess);

// Load one on page start
getDog();
