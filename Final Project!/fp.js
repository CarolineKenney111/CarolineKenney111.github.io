const keys = document.querySelectorAll('.key');
const phoneDisplay = document.getElementById('phoneDisplay');
const mathProblemDiv = document.getElementById('mathProblem');
const answerInput = document.getElementById('answerInput');
const submitAnswer = document.getElementById('submitAnswer');
const backspaceBtn = document.getElementById('backspaceButton');

let currentUnlockNumber = null;
let correctAnswer = null;
let changeProblemTimer;

// Generate a random math problem
function generateMathProblem() {
    clearTimeout(changeProblemTimer); // clear old timer

    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    correctAnswer = a + b;
    mathProblemDiv.innerText = `What is ${a} + ${b}? (Unlock a number)`;

    // If no answer within 3 seconds, change the math problem
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

                // Format with dashes
                let formatted = '';
                for (let i = 0; i < current.length; i++) {
                    if (i === 3 || i === 6) {
                        formatted += '-';
                    }
                    formatted += current[i];
                }

                phoneDisplay.innerText = formatted;
            }
        }
    });
});

// Handle Delete button (backspace) and move it randomly
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
    }

    // Move Delete button to random position
    backspaceBtn.style.position = 'absolute';
    backspaceBtn.style.top = Math.floor(Math.random() * 80 + 10) + 'vh';
    backspaceBtn.style.left = Math.floor(Math.random() * 80 + 10) + 'vw';
});

// When user submits answer
submitAnswer.addEventListener('click', () => {
    if (parseInt(answerInput.value) === correctAnswer) {
        currentUnlockNumber = getRandomLockedNumber();
        if (currentUnlockNumber !== null) {
            unlockNumber();
        }
        answerInput.value = '';
        generateMathProblem();
    } else {
        // Shake screen and flash red background
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

// Start the first math problem
generateMathProblem();
