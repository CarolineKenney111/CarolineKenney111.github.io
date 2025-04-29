const keys = document.querySelectorAll('.key');
const phoneDisplay = document.getElementById('phoneDisplay');
const mathProblemDiv = document.getElementById('mathProblem');
const answerInput = document.getElementById('answerInput');
const submitAnswer = document.getElementById('submitAnswer');
const backspaceBtn = document.getElementById('backspaceButton');
const finalSubmit = document.getElementById('finalSubmit');
const dogPrize = document.getElementById('dogPrize');
const interactionArea = document.getElementById('interactionArea');

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
    answerInput.style.display = 'inline-block';
    submitAnswer.style.display = 'inline-block';
    backspaceBtn.style.display = 'inline-block';

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
        finalSubmit.style.display = 'none';
    }

    backspaceBtn.style.position = 'absolute';
    backspaceBtn.style.top = Math.floor(Math.random() * 80 + 10) + 'vh';
    backspaceBtn.style.left = Math.floor(Math.random() * 80 + 10) + 'vw';
});

// Handle math problem submission
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

// Handle phone number submission
finalSubmit.addEventListener('click', () => {
    // Hides everything except the dogPrize section
    interactionArea.style.display = 'none';

    // Show dog prize message
    dogPrize.innerHTML = `
        <h2>Congratulations on completing your number! I hope my project frustrated you! <br>
        Your prize is a picture of a cute dog:</h2>
    `;

    // Load the dog image
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const dogImg = document.createElement('img');
            dogImg.id = 'dogImage';
            dogImg.src = data.message;
            dogImg.alt = 'Cute Dog';
            dogPrize.appendChild(dogImg);

    // Create a restart button
const restartBtn = document.createElement('button');
restartBtn.textContent = 'Start Over to Earn a New Dog';
restartBtn.id = 'restartBtn';
restartBtn.style.marginTop = '20px';
restartBtn.style.fontSize = '16px';
restartBtn.style.padding = '8px 16px';
restartBtn.style.backgroundColor = '#f44336';
restartBtn.style.color = 'white';
restartBtn.style.border = 'none';
restartBtn.style.borderRadius = '8px';
restartBtn.style.cursor = 'pointer';

dogPrize.appendChild(restartBtn);

// Restart logic
restartBtn.addEventListener('click', () => {
    // Clear everything
    dogPrize.innerHTML = '';
    phoneDisplay.innerText = '';
    
    keys.forEach(key => {
        key.disabled = true;
        key.classList.remove('enabled');
    });

    finalSubmit.style.display = 'none';
    answerInput.value = '';
    interactionArea.style.display = 'block';

    generateMathProblem();
});

        });
        
});

// Start game
generateMathProblem();
