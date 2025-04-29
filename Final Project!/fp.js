const keys = document.querySelectorAll('.key');
const phoneDisplay = document.getElementById('phoneDisplay');
const mathProblemDiv = document.getElementById('mathProblem');
const answerInput = document.getElementById('answerInput');
const submitAnswer = document.getElementById('submitAnswer');
const backspaceBtn = document.getElementById('backspaceButton');
const finalSubmit = document.getElementById('finalSubmit');
const dogPrize = document.getElementById('dogPrize');

let currentUnlockNumber = null;
let correctAnswer = null;
let changeProblemTimer;

// Generate a random math problem
function generateMathProblem() {
    clearTimeout(changeProblemTimer);

    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    correctAnswer = a + b;
    mathProblemDiv.innerText = `What is ${a} + ${b}? (Unlock a number)`;

    changeProblemTimer = setTimeout(() => {
        if (answerInput.value === '') {
            generateMathProblem();
        }
    }, 3000);
}

// Unlock a random locked number
function unlockNumber() {
    keys.forEach(key => {
        if (key.dataset.number == currentUnlockNumber) {
            key.disabled = false;
            key.classList.add('enabled');
        }
    });
}

// Find a random locked number
function getRandomLockedNumber() {
    const lockedKeys = Array.from(keys).filter(key => key.disabled);
    if (lockedKeys.length === 0) {
        mathProblemDiv.innerText = "All numbers unlocked!";
        return null;
    }
    const randomKey = lockedKeys[Math.floor(Math.random() * lockedKeys.length)];
    return parseInt(randomKey.dataset.number);
}

// Allow clicking only enabled numbers and auto-format with dashes
keys.forEach(key => {
    key.addEventListener('click', () => {
        if (!key.disabled) {
            let current = phoneDisplay.innerText.replaceAll('-', '');

            if (current.length < 10) {
                current += key.dataset.number;

                let formatted = '';
                for (let i = 0; i < current.length; i++) {
                    if (i === 3 || i === 6) {
                        formatted += '-';
                    }
                    formatted += current[i];
                }

                phoneDisplay.innerText = formatted;

                if (current.length === 10) {
                    finalSubmit.style.display = 'inline-block';
                }
            }
        }
    });
});

// Handle delete button and move it randomly
backspaceBtn.addEventListener('click', () => {
    let current = phoneDisplay.innerText.replaceAll('-', '');

    if (current.length > 0) {
        current = current.slice(0, -1);

        let formatted = '';
        for (let i = 0; i < current.length; i++) {
            if (i === 3 || i === 6) {
                formatted += '-';
            }
            formatted += current[i];
        }

        phoneDisplay.innerText = formatted;
        finalSubmit.style.display = 'none'; // Hide submit if they delete
    }

    backspaceBtn.style.position = 'absolute';
    backspaceBtn.style.top = Math.floor(Math.random() * 80 + 10) + 'vh';
    backspaceBtn.style.left = Math.floor(Math.random() * 80 + 10) + 'vw';
});

// Handle submitAnswer button
submitAnswer.addEventListener('click', () => {
    if (parseInt(answerInput.value) === correctAnswer) {
        currentUnlockNumber = getRandomLockedNumber();
        if (currentUnlockNumber !== null) {
            unlockNumber();
        }
        answerInput.value = '';
        generateMathProblem();
    } else {
        document.body.classList.add('shake');
        document.body.style.backgroundColor = '#ff4c4c';

        setTimeout(() => {
            document.body.classList.remove('shake');
            document.body.style.backgroundColor = '#f4f4f4';
        }, 500);

        alert('Wrong answer! Try again.');
        answerInput.value = '';
    }
});

// Handle final submit (phone number complete)
finalSubmit.addEventListener('click', () => {
    dogPrize.innerHTML = `<h2>Congratulations on completing your number! I hope my project frustrated you! <br>Your prize is a picture of a cute dog:</h2>`;

    fetchDog();

    finalSubmit.style.display = 'none';
});

// Fetch a dog and set up "New Dog" button
function fetchDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            // Set the dog image
            dogPrize.innerHTML += `<img id="dogImage" src="${data.message}" alt="Cute Dog">`;

            // If "New Dog" button doesn't exist yet, create it
            if (!document.getElementById('newDogButton')) {
                const newDogButton = document.createElement('button');
                newDogButton.id = 'newDogButton';
                newDogButton.textContent = 'New Dog';
                dogPrize.appendChild(newDogButton);

                newDogButton.addEventListener('click', () => {
                    fetch('https://dog.ceo/api/breeds/image/random')
                        .then(response => response.json())
                        .then(data => {
                            const dogImage = document.getElementById('dogImage');
                            dogImage.src = data.message;
                        });
                });
            }
        })
        .catch(error => {
            console.error('Error fetching dog image:', error);
            dogPrize.innerHTML += `<p>Sorry, no dog right now 😢</p>`;
        });
}

// Start everything
generateMathProblem();
