addEventListener("DOMContentLoaded", () => {
  const facile = document.getElementById("facile");
  const moyen = document.getElementById("moyen");
  const difficile = document.getElementById("difficile");
  const infini = document.getElementById("infini");
  const timer = document.getElementById("timer");
  const start = document.getElementById("start");
  const explication = document.getElementById("explication");
  const inputNumber = document.getElementById("inputNumber");
  let DIFFICULTY = "";

  facile.addEventListener("click", () => {
      explication.innerHTML =
          "Le nombre mystère est compris entre 1 et 10 ! Vous disposez de 3 essais !";
      explication.style.color = "#28A745";
      explication.style.textShadow = "0 0 5px #28A745";
      DIFFICULTY = "facile";
  });

  moyen.addEventListener("click", () => {
      explication.innerHTML =
          "Le nombre mystère est compris entre 1 et 50 ! Vous disposez de 2 essais !";
      explication.style.color = "#FFC107";
      explication.style.textShadow = "0 0 5px #FFC107";
      DIFFICULTY = "moyen";
  });

  difficile.addEventListener("click", () => {
      explication.innerHTML =
          "Le nombre mystère est compris entre 1 et 100 ! Vous disposez de 1 essai !";
      explication.style.color = "#C82333";
      explication.style.textShadow = "0 0 5px #C82333";
      DIFFICULTY = "difficile";
  });

  infini.addEventListener("click", () => {
      explication.innerHTML =
          "Le nombre mystère est compris entre 1 et 100000000 ! Vous avez un nombre d'essais illimité !";
      explication.style.color = "#23272B";
      explication.style.textShadow = "0 0 5px #23272B";
      DIFFICULTY = "infini";
  });

  timer.addEventListener("click", () => {
      explication.innerHTML =
          "Le nombre est compris entre 1 et 1000 et vous avez une minute pour le trouver !";
      explication.style.color = "#F8F9FA";
      explication.style.textShadow = "0 0 5px #F8F9FA";
      DIFFICULTY = "timermode";
  });

  start.addEventListener("click", () => {
      facile.style.display = "none";
      moyen.style.display = "none";
      difficile.style.display = "none";
      infini.style.display = "none";
      start.style.display = "none";
      timer.style.display = "none";
      explication.style.display = "none";
      document.getElementById("main").style.display = "block";

      if (DIFFICULTY === "facile") {
          main(3, 10, 1, 10);
      } else if (DIFFICULTY === "moyen") {
          main(2, 50, 1, 50);
      } else if (DIFFICULTY === "difficile") {
          main(1, 100, 1, 100);
      } else if (DIFFICULTY === "infini") {
          main(Infinity, 100000000, 1, 100000000); 
      } else if (DIFFICULTY === "timermode") {
          main(60, 1000, 1, 1000); // 60 secondes pour le mode Timer
      } else {
          main(3, 10, 1, 10); 
      }
  });

  function main(health, difficult_value, inputValuemin, inputValuemax) {
    const mystere = document.getElementById("mysterie-container");
    const validate = document.getElementById("validate");
    const timerdisplay = document.getElementById("timerdisplay");
    const mystereValue = Math.floor(Math.random() * difficult_value) + 1;
    const replay = document.getElementById("replay");
    const body = document.querySelector("body");
    let timeLeft = health;
    let count = 0;
    let countdownTimer; // Déclare countdownTimer ici

    inputNumber.min = inputValuemin;
    inputNumber.max = inputValuemax;

    if (health === Infinity) { 
        body.classList.remove("neutral", "lose", "win", "timer");
        body.classList.add("infini");
    }

    if (health === 60) { // Mode timer
        countdownTimer = setInterval(() => { // Initialise countdownTimer
            body.classList.remove("neutral", "lose", "win", "infinite");
            body.classList.add("timer");
            timerdisplay.style.display = "block";
            timeLeft--;
            timerdisplay.innerHTML = "Temps restant : " + timeLeft + " secondes";

            if (timeLeft <= 0) {
                clearInterval(countdownTimer);
                timerdisplay.innerHTML = "Perdu ! Le temps est écoulé. Le nombre mystère était : " + mystereValue;
                validate.style.display = "none";
                replay.style.display = "block";
                body.classList.remove("neutral", "win");
                body.classList.add("lose");
            }
        }, 1000);
    }

    validate.addEventListener("click", () => {
        count++;
        const inputValue = Number(inputNumber.value);

        if (inputValue === mystereValue) {
            mystere.innerHTML = "Bravo ! Vous avez gagné en " + count + " tentative(s) !";
            validate.style.display = "none";
            replay.style.display = "block";
            if (countdownTimer) clearInterval(countdownTimer); // Arrêter le minuteur si gagné
            body.classList.remove("neutral", "lose", "timer", "infinite");
            body.classList.add("win");
            ShootSomeStars();
        } else {
            let message = "Vous avez écrit " + inputValue + "... ";
            if (inputValue > mystereValue) {
                message += "Mais le nombre mystère est plus petit !";
            } else {
                message += "Mais le nombre mystère est plus grand !";
            }

            if (health !== Infinity && health !== 60) {
                message += " Vous êtes à " + (health - 1) + " essai(s) !";
                health--; 
            }

            mystere.innerHTML = message;

            if (health === 0) {
                mystere.innerHTML = "Perdu ! Le nombre était " + mystereValue + " !";
                validate.style.display = "none";
                replay.style.display = "block";
                body.classList.remove("neutral", "win");
                body.classList.add("lose");
            }
        }
    });

    replay.addEventListener("click", () => {
        location.reload();
    });
}

  function ShootSomeStars() {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["star"],
      colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };
  
    // Fonction qui permet l'envoi de confettis après avoir gagné
    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });
  
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    }
  
    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }
  
  // Fonction qui permet de faire trembler le bouton
  function shakeElement(element, duration) {
    element.classList.remove("shake");
    setTimeout(() => {
      element.classList.add("shake");
  
      setTimeout(() => {
        element.classList.remove("shake");
      }, duration);
    }, 10);
  }

})