var table = document.querySelector(".tab");
var regen = document.querySelector("#regen");
var level = document.querySelector("#level");
var start = document.querySelector("#start");
var home = document.querySelector("#home");
var sablier = document.querySelector("#sablier");
var alarme = document.querySelector("#alarme");
var finalScore = document.querySelector("#finalScore");
var stopp = document.querySelector("#stopp");
var rows, cols;
var minuteur = document.getElementById("minuteur");
var temp;
var secondes = temp;
var timerid = null;
var gameover = false;


// Fonction pour créer les nombres

function creerNombres() {
    var numbers = [];
    for (var i = 1; i <= rows * cols; i++) {
        numbers.push(i);
    }
    return numbers;
}

// Fonction pour mélanger 

function melanger(numbers) {
    for (var i = numbers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
    }
    return numbers;
}

// Fonction pour remplir le tableau

function remplirTableau() {
    table.innerHTML = "";

    var numbers = creerNombres();
    melanger(numbers);

    var index = 0;

    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");

        for (var j = 0; j < cols; j++) {
            var td = document.createElement("td");
            td.textContent = numbers[index++];
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}

// Fonction pour démarrer le minuteur
function demarrerMinuteur() {

    if (timerid !== null) clearInterval(timerid);

    timerid = setInterval(function () {
        minuteur.textContent = "Time: " + secondes + "s";
        minuteur.style.border = "1px solid rgba(198, 146, 16, 0.5)";
        minuteur.style.borderRadius = "5px";
        minuteur.style.backgroundColor = "rgba(198, 146, 16, 0.5)";
        minuteur.style.padding = "0 5px 0 5px";
        sablier.style.display = "inline-block";
        if (secondes <= 5) {
            sablier.style.display = "none";
            alarme.style.display = "inline-block";
            minuteur.style.color = "red";
            setTimeout(function () {
                minuteur.style.color = "black";
            }, 500);
        } else {
            minuteur.style.color = "black";
            minuteur.style.fontSize = "";

        }

        secondes--;

        if (secondes == 0) {
            clearInterval(timerid);
            timerid = null;
            gameover = true;
            table.style.pointerEvents = "none";

            minuteur.textContent = "Time's up!";
            minuteur.style.border = "1px solid rgba(198, 146, 16, 0.5)";
            minuteur.style.borderRadius = "5px";
            minuteur.style.backgroundColor = "rgba(198, 146, 16, 0.5)";
            minuteur.style.padding = "0 5px 0 5px";

            finalScore.textContent = "Score : " + score + "/ " + (rows * cols);
            finalScore.style.color = "white";
            finalScore.style.border = "1px solid rgba(0, 0, 250, 0.7)";
            finalScore.style.borderRadius = "5px";
            finalScore.style.padding = "5px";
            finalScore.style.backgroundColor = "rgba(0, 0, 250, 0.7)";

            scoreDisplay.style.display = "none";
            sablier.style.display = "none";
            alarme.style.display = "none";
            regen.style.display = "inline";
            home.style.display = "inline";
            stopp.style.display = "none";

            if (score >= (rows * cols) - 5 && score < rows * cols) {
                finalScore.textContent += " You win!";
                trophy.style.display = "inline-block";
            }
            else if (score <= 10) {
                finalScore.textContent += " You lose!";
                sad.style.display = "inline-block";
            }
            else if (score === rows * cols) {
                finalScore.textContent = " Perfect score!";
                perfect.style.display = "inline-block";
            }
            else {
                finalScore.textContent += " You're close!";
            }

        }

    }, 1000);
}

//td au clic on compte le nombre de clics et on vérifie si le nombre cliqué est le bon et on affiche le score 
var score = 0;
var nextExpected = 1;
var scoreDisplay = document.getElementById("score");

table.addEventListener("click", function (e) {
    if (gameover) return;
    if (e.target.tagName !== "TD") return;

    var number = parseInt(e.target.textContent, 10);

    if (number === nextExpected) {
        nextExpected++;
        score++;
        e.target.style.backgroundColor = "rgba(10, 199, 10, 0.65)";
        e.target.style.color = "white";
    } else {
        score = Math.max(0, score - 1);
        e.target.style.backgroundColor = "rgba(255, 0, 0, 0.7";
        e.target.style.color = "white";
    }

    scoreDisplay.textContent = "Score : " + score;
    scoreDisplay.style.color = "white";
    scoreDisplay.style.border = "1px solid white";
    scoreDisplay.style.borderRadius = "5px";
    scoreDisplay.style.padding = "5px";
    scoreDisplay.style.backgroundColor = "rgba(0, 0, 250, 0.7)";

});


// start and select level
start.addEventListener("click", function () {
    regen.style.display = "none";
    stopp.style.display = "inline";
    scoreDisplay.style.display = "inline";
    rules.style.display = "none";

    // switch (level.value) {
    //     case "easy":
    //         rows = 5;
    //         cols = 5;
    //         temp = 30;
    //         break;
    //     case "medium":
    //         rows = 7;
    //         cols = 7;
    //         temp = 80;
    //         break;
    //     case "hard":
    //         rows = 10;
    //         cols = 10;
    //         temp = 120;
    //         break;
    //     default:
    //         return home.click();
    // }
    if (window.innerWidth <= 768) {
        // Mobile
        switch (level.value) {
            case "easy":
                rows = 4;
                cols = 4;
                temp = 20;
                break;
            case "medium":
                rows = 5;
                cols = 5;
                temp = 30;
                break;
            case "hard":
                rows = 10;
                cols = 10;
                temp = 0;
                break;
            default:
                return home.click();
        }
    } else {
        // Desktop
        switch (level.value) {
            case "easy":
                rows = 5;
                cols = 5;
                temp = 30;
                break;
            case "medium":
                rows = 7;
                cols = 7;
                temp = 80;
                break;
            case "hard":
                rows = 10;
                cols = 10;
                temp = 120;
                break;
            default:
                return home.click();
        }
    }
    gameover = false;
    table.style.pointerEvents = "auto";
    table.style.display = "table";
    secondes = temp;
    score = 0;
    nextExpected = 1;
    document.getElementById("score").textContent = "Score : 0";
    finalScore.textContent = "";
    minuteur.style.color = "black";

    demarrerMinuteur();
    remplirTableau();
});


//Fonction pour stopper la partie 

stopp.addEventListener("click", function () {
    gameover = true;
    table.style.pointerEvents = "none";

    if (timerid !== null) clearInterval(timerid);

    timerid = null;

    minuteur.textContent = "Game stopped!";
    minuteur.style.color = "white";
    minuteur.style.border = "1px solid white";
    minuteur.style.borderRadius = "5px";
    minuteur.style.paddingBottom = "5px";
    minuteur.style.backgroundColor = "rgba(250, 0, 0, 0.7)";

    finalScore.textContent = "Final score : " + score + "/ " + (rows * cols);
    finalScore.style.color = "white";
    finalScore.style.border = "1px solid rgba(0, 0, 250, 0.7)";
    finalScore.style.borderRadius = "5px";
    finalScore.style.padding = "5px";
    finalScore.style.backgroundColor = "rgba(0, 0, 250, 0.7)";
    scoreDisplay.style.display = "none";

    sablier.style.display = "none";
    regen.style.display = "inline";
    home.style.display = "inline";
    stopp.style.display = "none";
    outt.style.display = "inline-block";
    alarme.style.display = "none";

    if (score >= (rows * cols) - 5 && score < rows * cols) {
        finalScore.textContent += " You win!";
        trophy.style.display = "inline-block";
    }
    else if (score <= 10) {
        finalScore.textContent += " You lose!";
        sad.style.display = "inline-block";
    }
    else if (score === rows * cols) {
        finalScore.textContent = " Perfect score!";
        perfect.style.display = "inline-block";
    }
    else {
        finalScore.textContent += " Not bad ";
    }
});

// Régénération du tableau et du minuteur lors du clic sur le bouton

regen.addEventListener("click", function () {
    if (!rows || !cols) return;

    demarrerMinuteur();
    remplirTableau();

    regen.style.display = "none";
    rules.style.display = "none";
    scoreDisplay.style.display = "inline";
    stopp.style.display = "inline";

    gameover = false;
    table.style.pointerEvents = "auto";

    score = 0;
    nextExpected = 1;
    scoreDisplay.textContent = "Score : 0";
    finalScore.textContent = "";
    home.style.display = "none";

    secondes = temp;


    finalScore.style.color = "";
    finalScore.style.border = "none";
    finalScore.style.borderRadius = "";
    finalScore.style.backgroundColor = "transparent";

    perfect.style.display = "none";
    sad.style.display = "none";
    trophy.style.display = "none";
    outt.style.display = "none";
    alarme.style.display = "none";



});

// Retour à l'accueil lors du clic sur le bouton Home
home.addEventListener("click", function () {
    gameover = false;
    table.style.pointerEvents = "none";
    table.style.display = "none";
    home.style.display = "none";

    score = 0;
    nextExpected = 1;

    scoreDisplay.textContent = "Score : 0";
    finalScore.textContent = "";

    if (timerid !== null) clearInterval(timerid);
    timerid = null;

    minuteur.textContent = "";
    minuteur.style.border = "none";
    minuteur.style.backgroundColor = "transparent";

    finalScore.style.color = "";
    finalScore.style.border = "none";
    finalScore.style.borderRadius = "";
    finalScore.style.padding = "0";
    finalScore.style.backgroundColor = "transparent";

    regen.style.display = "none";
    scoreDisplay.style.display = "none";
    rules.style.display = "block";
    stopp.style.display = "none";

    perfect.style.display = "none";
    sad.style.display = "none";
    trophy.style.display = "none";
    outt.style.display = "none";
    alarme.style.display = "none";
});
