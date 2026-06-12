const questionEl      = document.getElementById('question-text');
const questionWrapper = document.getElementById('question-wrapper');
const bottomWrapper   = document.getElementById('bottom-wrapper');

async function loadQuestions() {
  const response = await fetch('/questions.json');
  if (!response.ok) throw new Error(`Impossible de charger questions.json (${response.status})`);
  const data = await response.json();
  return data.questions;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function animateLetters(el, text) {
  el.innerHTML = '';

  const words = text.split(' ');

  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.classList.add('word'); // inline-block = le mot reste entier

    const lettersCount = words.slice(0, wordIndex).join(' ').length + wordIndex;

    [...word].forEach((char, charIndex) => {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = char;
      letterSpan.classList.add('letter');
      letterSpan.style.animationDelay = `${(lettersCount + charIndex) * 40}ms`;
      wordSpan.appendChild(letterSpan);
    });

    el.appendChild(wordSpan);

    // Espace entre les mots (sauf après le dernier)
    if (wordIndex < words.length - 1) {
      const space = document.createElement('span');
      space.classList.add('word');
      space.innerHTML = '&nbsp;';
      space.style.opacity = '1';
      el.appendChild(space);
    }
  });
}

async function init() {
  try {
    const questions = await loadQuestions();
    const text = questions?.length
      ? pickRandom(questions)
      : 'Aucune question disponible.';

    animateLetters(questionEl, text);
  } catch (err) {
    console.error(err);
    animateLetters(questionEl, 'Erreur lors du chargement des questions.');
  }

  // 1. La question apparaît lettre par lettre
  questionWrapper.style.opacity = '1';

  // 2. La phrase + image apparaissent une fois l'animation terminée
  // On calcule la durée totale selon la longueur du texte
  const text = questionEl.textContent;
  const totalDuration = text.length * 40 + 200; // délai + marge

  setTimeout(() => {
    bottomWrapper.style.opacity = '1';
  }, totalDuration);
}

init();