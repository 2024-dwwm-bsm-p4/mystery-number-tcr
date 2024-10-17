addEventListener("DOMContentLoaded", () => {
    // DIFFICULTY SELECTOR
    const facile = document.getElementById("facile");
    const moyen = document.getElementById("moyen");
    const difficile = document.getElementById("difficile");
    const start = document.getElementById("start");
    const explication = document.getElementById("explication");
    const inputNumber = document.getElementById("inputNumber");
    let DIFFICULTY = '';

    facile.addEventListener("click", () => {
        explication.innerHTML = 'Le nombre mystère est compris entre 1 et 10 ! Vous disposez de 3 essai(s) !';
        DIFFICULTY = 'facile';
    });
    
    moyen.addEventListener("click", () => {
        explication.innerHTML = 'Le nombre mystère est compris entre 1 et 50 ! Vous disposez de 2 essai(s) !';
        DIFFICULTY = 'moyen';
    });
    
    difficile.addEventListener("click", () => {
        explication.innerHTML = 'Le nombre mystère est compris entre 1 et 100 ! Vous disposez de 1 essai(s) !';
        DIFFICULTY = 'difficile';
    });

    start.addEventListener("click", () => {
        facile.style.display = "none";
        moyen.style.display = "none";
        difficile.style.display = "none";
        start.style.display = "none";
        explication.style.display = "none";
        document.getElementById("main").style.display = "block";

        if (DIFFICULTY === 'facile') {
            main(3, 10, 1, 10);
        }
        if (DIFFICULTY === 'moyen') {
            main(2, 50, 1, 50);
        }
        if (DIFFICULTY === 'difficile') {
            main(1, 100, 1, 100); 
        }
    });

    // MAIN
    function main(health, difficult_value, inputValuemin, inputValuemax) {
        const mystere = document.getElementById("mysterie-container");
        const validate = document.getElementById("validate");
        const mystereValue = Math.floor(Math.random() * difficult_value) + 1;
        const replay = document.getElementById("replay");
        let count = 0;

        inputNumber.min = inputValuemin;
        inputNumber.max = inputValuemax;

        validate.addEventListener("click", () => {
            
            count++;
            const inputValue = Number(inputNumber.value); 

            console.log(mystereValue);
            console.log(inputValue);

            if (inputValue === mystereValue) {
                mystere.innerHTML = "Bravo ! Vous avez gagné ! Vous avez trouvé le nombre mystère en " + count + " tentative(s) !";
                replay.style.display = "block";
                validate.style.display = "none";
            } else if (inputValue > mystereValue) {
                mystere.innerHTML = "Vous avez écrit " + inputValue + "... Mais il est bien trop grand ! Plus que..." + (health - 1) + " essai(s) !";
                health--;
            } else if (inputValue < mystereValue) {
                mystere.innerHTML = "Vous avez écrit " + inputValue + "... Mais il est bien trop petit ! Plus que..." + (health - 1) + " essai(s) !";
                health--;
            }

            if (health === 0) {
                mystere.innerHTML = "Perdu ! Le nombre était " + mystereValue + " !";
                replay.style.display = "block";
                validate.style.display = "none";
            }
        });

        replay.addEventListener("click", () => {
            location.reload();
        });
    }
});
