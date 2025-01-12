let poäng = 0; // Variabel för att lagra poäng
let timerInterval; // Variabel för att lagra timerintervallet
let timeRemaining = 3; // Starttid i sekunder

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('borja');


// Funktion för att uppdatera timern
function updateTimer() {
    timerDisplay.textContent = timeRemaining;
    if (timeRemaining <= 0) {
        clearInterval(timerInterval); // Stoppa timern när tiden är slut
        alert('Nu har tiden gått');
        // Inaktivera alla knappar
        let knappar = document.querySelectorAll("button");
        knappar.forEach(knapp => {
            knapp.disabled = true;
        });
    } else {
        timeRemaining--; // Minska återstående tid
    }
}

// Starta timern
startButton.addEventListener('click', () => {
    clearInterval(timerInterval); // Rensa eventuell befintlig timer
    timeRemaining = 3; // Återställ timern
    timerInterval = setInterval(updateTimer, 1000); // Starta en ny timer
});

// Funktion för att rätta flervalsfrågor
function rättaFlervalsSvar(formId, feedbackId, rättSvar, knappId) {
    const form = document.getElementById(formId);
    const feedback = document.getElementById(feedbackId);
    const valdaAlternativ = form.elements['svar1'].value; // Hämtar det valda alternativet (A, B, C, D)

    if (valdaAlternativ === rättSvar) {
        feedback.textContent = "Rätt svar! +1 poäng";
        poäng++; // Lägg till poäng
        localStorage.setItem('poäng', poäng); // Spara poängen i localStorage
    } else {
        feedback.textContent = "Fel svar. Försök igen nästa gång!";
    }

    // Inaktivera knappen för denna fråga
    document.getElementById(knappId).disabled = true;

    // Inaktivera alla alternativ i formuläret
    const alternativ = form.elements['svar1'];
    for (let i = 0; i < alternativ.length; i++) {
        alternativ[i].disabled = true;
    }
}

// Funktion för att hämta poäng från localStorage (vid behov)
function hämtaPoäng() {
    const sparadPoäng = localStorage.getItem('poäng');
    if (sparadPoäng) {
        poäng = parseInt(sparadPoäng, 10);
    }
}

// Anropa funktionen för att hämta poäng vid sidladdning
hämtaPoäng();

