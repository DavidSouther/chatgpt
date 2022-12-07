const quiz = [
  { question: "What language model is ChatGPT trained on?", answer: "GPT-3" },
  {
    question: "How large is ChatGPT's training dataset?",
    answer: "175 billion",
  },
  {
    question: "What are some tasks that ChatGPT is typically used for?",
    answer: "natural language processing",
  },
  {
    question: "What programming language is ChatGPT's model implemented in?",
    answer: "Python",
  },
];

let score = 0;

for (let i = 0; i < quiz.length; i++) {
  const item = quiz[i];
  const response = prompt(item.question);
  if (response.toLowerCase().includes(item.answer.toLowerCase())) {
    score++;
    alert("Correct!");
  } else {
    alert("Incorrect. The correct answer was " + item.answer);
  }
}

alert("You scored " + score + " out of " + quiz.length);
