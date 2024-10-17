addEventListener("DOMContentLoaded", () => {
    // Le JS pour la section de sélection de la difficulté
    const facile = document.getElementById("facile");
    const moyen = document.getElementById("moyen");
    const difficile = document.getElementById("difficile");
    const infini = document.getElementById("infini");
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
  
    start.addEventListener("click", () => {
      facile.style.display = "none";
      moyen.style.display = "none";
      difficile.style.display = "none";
      infini.style.display = "none";
      start.style.display = "none";
      explication.style.display = "none";
      document.getElementById("main").style.display = "block";
  
      // Ici je passe la fonction main avec des paramètres différents en fonction de la difficulté
      if (DIFFICULTY === "facile") {
        main(3, 10, 1, 10);
      } else if (DIFFICULTY === "moyen") {
        main(2, 50, 1, 50);
      } else if (DIFFICULTY === "difficile") {
        main(1, 100, 1, 100);
      } else if (DIFFICULTY === "infini") {
        main(Infinity, 100000000, 1, 100000000); 
      } else {
        main(3, 10, 1, 10); 
      }
    });


  
    // Ma fonction main, le cœur du jeu
    function main(health, difficult_value, inputValuemin, inputValuemax) {
      const mystere = document.getElementById("mysterie-container");
      const validate = document.getElementById("validate");
      const mystereValue = Math.floor(Math.random() * difficult_value) + 1;
      const replay = document.getElementById("replay");
      const body = document.querySelector("body");
      let count = 0;
  
      inputNumber.min = inputValuemin;
      inputNumber.max = inputValuemax;
  
      validate.addEventListener("click", () => {
        count++;
        const inputValue = Number(inputNumber.value);
  
        if (inputValue === mystereValue) {
          mystere.innerHTML = "Bravo ! Vous avez gagné ! Vous avez trouvé le nombre mystère en " + count + " tentative(s) !";
          replay.style.display = "block";
          validate.style.display = "none";
          body.classList.remove("neutral", "lose");
          body.classList.add("win");
          ShootSomeStars();
        } else {
          let message = "Vous avez écrit " + inputValue + "... ";
          if (inputValue > mystereValue) {
            message += "Mais le nombre mystère est plus petit !";
          } else {
            message += "Mais le nombre mystère est plus grand !";
          }
  
          if (health !== Infinity) {
            message += " Vous êtes à " + (health - 1) + " essai(s) !";
            health--; 
          }

          if (health === Infinity) {
            body.classList.remove("neutral", "win", "lose");
            body.classList.add("infini");
          }
  
          mystere.innerHTML = message;
          validate.className = "btn btn-danger";
          shakeElement(validate, 2000);
  
          // Vérifier si le joueur a perdu
          if (health === 0) {
            mystere.innerHTML = "Perdu ! Le nombre était " + mystereValue + " !";
            replay.style.display = "block";
            replay.className = "btn btn-danger border border-white";
            validate.style.display = "none";
            body.classList.remove("neutral", "win");
            body.classList.add("lose");
          } else {
            body.classList.remove("neutral", "win");
            body.classList.add("lose");
          }
        }
      });
  
      replay.addEventListener("click", () => {
        location.reload();
      });
    }
  });
  
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
  