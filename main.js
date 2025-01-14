let poäng = 0; // Variabel för att lagra poäng
let timerInterval; // Variabel för att lagra timerintervallet

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('borja');

window.onload = function (){
    inaktiveraKnappar(); // Inaktivera alla knappar när sidan laddas
    visaPoäng(); 
    hämtaPoäng()
    aktiveraKnappVidPoäng();
};

function inaktiveraKnappar() {
    const allaKnappar = document.querySelectorAll("button"); // Hämta alla knappar
    allaKnappar.forEach(knapp => {
        // Kontrollera om knappen inte är "Börja timern"
        if (knapp.id !== 'borja' && knapp.id !== 'skickaPoang') {
            knapp.disabled = true; // Inaktivera knappen
        }
    });

}

function aktiveraKnappVidPoäng() {
    const extraKnapp = document.getElementById('extraKnapp');
    
    // Om poängen är 4 eller mer, aktivera knappen
    if (poäng >= 7) {
        extraKnapp.disabled = false;
    }
}

function aktiveraKnappar() {
    const allaKnappar = document.querySelectorAll("button"); // Hämta alla knappar
    allaKnappar.forEach(knapp => {
        // Kontrollera om knappen inte är "Börja timern"
        if (knapp.id !== 'borja') {
            knapp.disabled = false; // Inaktivera knappen
        }
    });
}


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
    timeRemaining = 5; // Återställ timern
    timerInterval = setInterval(updateTimer, 1000); // Starta en ny timer
    aktiveraKnappar()
});

// Funktion för att rätta flervalsfrågor
function rättaFlervalsSvar(formId, feedbackId, rättSvar, knappId) {
    const form = document.getElementById(formId); // Hämta formuläret
    const feedback = document.getElementById(feedbackId); // Hämta feedback-elementet
    const valdaAlternativ = form.querySelector('input[type="radio"]:checked'); // Hämta valt alternativ

    if (valdaAlternativ) {
        if (valdaAlternativ.value === rättSvar) {
            feedback.textContent = "Rätt svar! +1 poäng";
            poäng++; // Lägg till poäng
            localStorage.setItem('poäng', poäng); // Spara poängen i localStorage
        } else {
            feedback.textContent = "Fel svar. Försök igen nästa gång!";
        }

        // Inaktivera knappen och alternativen
        document.getElementById(knappId).disabled = true;
        const alternativ = form.querySelectorAll('input[type="radio"]');
        alternativ.forEach(alternativ => alternativ.disabled = true);
    } else {
        feedback.textContent = "Vänligen välj ett alternativ innan du kontrollerar svaret.";
    }
}

// Funktion för att hämta poäng från localStorage (vid behov)
function hämtaPoäng() {
    const sparadPoäng = localStorage.getItem('poäng');
    if (sparadPoäng) {
        poäng = parseInt(sparadPoäng, 10);
    }
    visaPoäng(); // Uppdatera poäng i HTML
}

function visaPoäng() {
    const sparadPoäng = localStorage.getItem('poäng');
    if (sparadPoäng) {
        document.getElementById('poängDisplay').textContent = `Poäng: ${sparadPoäng}`;
    } else {
        document.getElementById('poängDisplay').textContent = "Poäng: 0";
    }
}


//AIzaSyAkKWkjeqc9vsmqtRXykAHDEdpSN6aXkgo
//https://docs.google.com/spreadsheets/d/11ewKSHjifWy_MJ-jCb2ayBLOR2Ku6g4GBNSr9XT7vdM/edit?usp=sharing
