
  
    const categories = {
      html: [
        {
          question: "Which HTML tag is used to link JavaScript file?",
          options: ["<link>", "<js>", "<script>", "<javascript>"],
          answer: "<script>"
        },
        {
          question: "What does HTML stand for?",
          options: [
            "Hyper Trainer Markup Language",
            "Hyper Text Markup Language",
            "Hyper Text Marketing Language",
            "Home Tool Markup Language"
          ],
          answer: "Hyper Text Markup Language"
        }
      ],
      css: [
        {
          question: "What does CSS stand for?",
          options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
          ],
          answer: "Cascading Style Sheets"
        },
        {
          question: "Which property controls the text size?",
          options: ["font-size", "text-style", "text-size", "font-style"],
          answer: "font-size"
        }
      ],
      js: [
        {
          question: "Which language is used for web development?",
          options: ["Python", "Java", "JavaScript", "C++"],
          answer: "JavaScript"
        },
        {
          question: "Which method is used to select an element by ID?",
          options: [
            "getElementById()",
            "querySelector()",
            "getElementsByClassName()",
            "getElementByName()"
          ],
          answer: "getElementById()"
        }
      ]
    };

    let currentCategory = [];
    let currentIndex = 0;
    let score = 0;
    let timeLeft = 15;
    let timer;

    const categorySelect = document.getElementById("category");
    const startBtn = document.getElementById("start-quiz");
    const quizBox = document.getElementById("quiz-box");
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");
    const resultBox = document.getElementById("result-box");
    const scoreEl = document.getElementById("score");
    const feedbackEl = document.getElementById("feedback");
    const timerEl = document.getElementById("time");
    const currentQEl = document.getElementById("current-q");
    const totalQEl = document.getElementById("total-q");
    const shareBtn = document.getElementById("share-btn");

    startBtn.onclick = () => {
      const selected = categorySelect.value;
      currentCategory = categories[selected];
      totalQEl.textContent = currentCategory.length;
      document.querySelector(".category-select").classList.add("hidden");
      quizBox.classList.remove("hidden");
      showQuestion();
    };

    function showQuestion() {
      clearInterval(timer);
      timeLeft = 15;
      timerEl.textContent = timeLeft;
      timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timer);
          nextBtn.click();
        }
      }, 1000);

      const q = currentCategory[currentIndex];
      questionEl.textContent = q.question;
      optionsEl.innerHTML = "";
      currentQEl.textContent = currentIndex + 1;

      q.options.forEach(opt => {
        const btn = document.createElement("div");
        btn.classList.add("option");
        btn.textContent = opt;
        btn.onclick = () => selectOption(btn, q.answer);
        optionsEl.appendChild(btn);
      });

      nextBtn.disabled = true;
    }

    function selectOption(selectedBtn, correct) {
      const allOptions = document.querySelectorAll(".option");
      allOptions.forEach(opt => {
        opt.onclick = null;
        if (opt.textContent === correct) opt.classList.add("correct");
        else opt.classList.add("wrong");
      });

      if (selectedBtn.textContent === correct) score++;
      nextBtn.disabled = false;
    }

    nextBtn.onclick = () => {
      currentIndex++;
      if (currentIndex < currentCategory.length) {
        showQuestion();
      } else {
        showResult();
      }
    };

    function showResult() {
      quizBox.classList.add("hidden");
      resultBox.classList.remove("hidden");
      scoreEl.textContent = `You scored ${score}/${currentCategory.length}`;
      const percent = (score / currentCategory.length) * 100;
      feedbackEl.textContent = percent >= 80 ? "Great job!" : percent >= 50 ? "Good try!" : "Keep practicing!";
    }

    shareBtn.onclick = () => {
      const text = `I scored ${score}/${currentCategory.length} in this quiz! Try now.`;
      const shareURL = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(shareURL);
    };

    const themeBtn = document.getElementById("toggle-theme");
    themeBtn.onclick = () => {
      document.body.classList.toggle("dark");
    }