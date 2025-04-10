// 1. Select buttons
const newQuoteButton = document.querySelector('#js-new-quote');
const showAnswerButton = document.querySelector('#js-tweet');

// 2. Event listeners
newQuoteButton.addEventListener('click', getQuote);
showAnswerButton.addEventListener('click', showAnswer);

// 3. Variable to store the current answer
let currentAnswer = '';

// 4. Fetch quote
function getQuote() {
  const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

  fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      displayQuote(data.question);
      currentAnswer = data.answer; // store answer for later
      clearAnswer(); // clear any old answer
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('Something went wrong. Please try again later.');
    });
}

// 5. Display the quote
function displayQuote(quote) {
  const quoteText = document.getElementById('js-quote-text');
  quoteText.textContent = quote;
}

// 6. Show the stored answer
function showAnswer() {
  const answerText = document.getElementById('js-answer-text');
  answerText.textContent = currentAnswer;
}

// 7. Clear the answer when a new quote is fetched
function clearAnswer() {
  const answerText = document.getElementById('js-answer-text');
  answerText.textContent = '';
}

// 8. Get a quote on first load
getQuote();