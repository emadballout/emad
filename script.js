let display = document.getElementById('display');
let emojiDisplay = document.getElementById('emoji-display');
let calculationCount = 0;

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
  emojiDisplay.innerHTML = '';
}

function getRandomWrongAnswer(correctAnswer) {
  const operations = ['+', '-', '*', '/'];
  const randomOp = operations[Math.floor(Math.random() * operations.length)];
  const randomNum = Math.floor(Math.random() * 100);
  return eval(`${correctAnswer} ${randomOp} ${randomNum}`);
}

function showEmojis(isCorrect) {
  emojiDisplay.innerHTML = '';
  const emoji = isCorrect ? '🎉' : '😡';
  const count = isCorrect ? 50 : 30;
  
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.textContent = emoji;
    span.style.position = 'absolute';
    span.style.left = `${Math.random() * 100}%`;
    span.style.top = `${Math.random() * 100}%`;
    span.style.fontSize = `${Math.random() * 3 + 1}rem`;
    span.style.animation = `float ${Math.random() * 3 + 2}s linear`;
    emojiDisplay.appendChild(span);
  }
}

function calculate() {
  try {
    const correctAnswer = eval(display.value);
    calculationCount++;
    
    // Only show correct answer 1 out of 3 times
    const showCorrect = calculationCount % 3 === 0;
    const displayedAnswer = showCorrect ? correctAnswer : getRandomWrongAnswer(correctAnswer);
    
    display.value = displayedAnswer;
    
    setTimeout(() => {
      const userResponse = confirm(`Is ${displayedAnswer} the correct answer?`);
      if (userResponse) {
        if (showCorrect) {
          alert('You got it right! 🎉');
          showEmojis(true);
        } else {
          alert('Actually... that was wrong 😅');
          showEmojis(false);
        }
      } else {
        if (showCorrect) {
          alert('Wait... that was actually correct! 🤔');
          showEmojis(true);
        } else {
          alert('Good catch! That was indeed wrong 😡');
          showEmojis(false);
        }
      }
    }, 100);
    
  } catch (error) {
    display.value = 'Error';
  }
}
