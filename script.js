let score = 0;
let clickcounter = 0;
let currentQuestion = 0;
let correctanswer = null;
document.getElementById("pts").innerHTML = score;

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    let questions = data;

    function showQuestion() {
      if (currentQuestion >= questions.length) {
        alert("Game finished!");
        alert("Your score is "+score+ "!")
        return;
      }

      let q = questions[currentQuestion];
      correctanswer = q.correct;

      document.getElementById("red").innerHTML = q.options[0];
      document.getElementById("green").innerHTML = q.options[1];
      document.getElementById("black").innerHTML = q.options[2];
      document.getElementById("white").innerHTML = q.options[3];
      document.getElementById("img").src = q.image;

      console.log("Correct answer is:", correctanswer);
    }

    function handleAnswer(i) {
      if (clickcounter >= 20) return;

      clickcounter++;
      let userAnswer = i;
      console.log("Answer:", userAnswer, "Count:", clickcounter);

      if (userAnswer === correctanswer) {
        score++;
        new Audio('Assets/Correct Answer.mp3').play();
      } else {
        new Audio('Assets/Wrong Answer.mp3').play(); 
      }

      document.getElementById("pts").innerHTML = score;
      currentQuestion++;
      showQuestion(); 
    }

    
    document.getElementById("red").addEventListener("click", () => handleAnswer(document.getElementById('red').innerText));
    document.getElementById("green").addEventListener("click", () => handleAnswer(document.getElementById('green').innerText));
    document.getElementById("black").addEventListener("click", () => handleAnswer(document.getElementById('black').innerText));
    document.getElementById("white").addEventListener("click", () => handleAnswer(document.getElementById('white').innerText));

    
    showQuestion();
  });



