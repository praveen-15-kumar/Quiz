const questions = [
  {
    question: "Which data structure uses FIFO order?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue"
  },
  {
    question: "What does 'HTTP' stand for?",
    options: [
      "HyperText Transfer Protocol",
      "HyperTransfer Text Program",
      "High Text Transfer Protocol",
      "Hyper Text Transmission Process"
    ],
    answer: "HyperText Transfer Protocol"
  },
  {
    question: "Which of the following is a relational database?",
    options: ["MongoDB", "Neo4j", "MySQL", "Firebase"],
    answer: "MySQL"
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    answer: "O(log n)"
  },
  {
    question: "Which of the following is not an OOP principle?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
    answer: "Compilation"
  },
  {
    question: "Which gate gives output 1 only when both inputs are 1?",
    options: ["OR", "XOR", "AND", "NAND"],
    answer: "AND"
  },
  {
    question: "What is the full form of CPU?",
    options: [
      "Central Process Unit",
      "Central Processing Unit",
      "Control Processing Unit",
      "Central Processor Utility"
    ],
    answer: "Central Processing Unit"
  },
  {
    question: "Which programming language is commonly used for system programming?",
    options: ["Python", "C", "HTML", "SQL"],
    answer: "C"
  },
  {
    question: "Which protocol is used to send email?",
    options: ["HTTP", "FTP", "SMTP", "IP"],
    answer: "SMTP"
  },
  {
    question: "Which type of memory is volatile?",
    options: ["ROM", "EEPROM", "Flash", "RAM"],
    answer: "RAM"
  }
];

let userName = "";

// Ask user name first
window.onload = function () {
  userName = prompt("Enter your name to start the quiz:");
  if (!userName) {
    alert("Name is required to start the quiz!");
    location.reload(); // reloads the page if no name
  } else {
    renderQuiz(); // proceed to show quiz
  }
};

function renderQuiz() {
  const quizContainer = document.getElementById("quizContainer");

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `
      <p>Q${i + 1}: ${q.question}</p>
      <div class="options">
        ${q.options
          .map(
            (option) => `
          <label>
            <input type="radio" name="question${i}" value="${option}" required />
            ${option}
          </label>
        `
          )
          .join("")}
      </div>
    `;
    quizContainer.appendChild(questionDiv);
  });

  document.getElementById("quizForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let score = 0;

    questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="question${i}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });

    // Send to backend
    fetch("http://localhost:5000/submit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName, score })
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("result").innerText = `🎉 ${userName}, your score is: ${score} / ${questions.length}`;
      })
      .catch(() => alert("❌ Error submitting score to the server."));
  });
}
