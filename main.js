let poäng = 0;
let timerInterval;
let timeRemaining;

// Hämta element från DOM
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('borja');
const övningarSection = document.getElementById('övningar');
const currentPage = document.body.dataset.page || "default";
// Objekt som lagrar tid för varje sida (lägg till fler vid behov)
const sidaTider = {
    "XYZ": 720,
    "NOG": 600,
    "DTK": 1380,
    "KVA": 600,
    "BONUS": 600
};

// Hämta rätt tid för den aktuella sidan, fallback till "default"
const selectedTime = sidaTider[currentPage] || sidaTider["default"];


// Unika nycklar för localStorage per sida
const timerStartedKey = `timerStarted_${currentPage}`;
const timerEndTimeKey = `timerEndTime_${currentPage}`;
const timerFinishedKey = `timerFinished_${currentPage}`;

window.onload = function () {
    inaktiveraKnappar();
    visaPoäng();
    hämtaPoäng();
    aktiveraKnappVidPoäng();
    visaBildVidPoäng();
    övningarSection.classList.add('hidden');

    const timerStarted = localStorage.getItem(timerStartedKey) === 'true';
    const timerEndTime = localStorage.getItem(timerEndTimeKey);
    const timerFinished = localStorage.getItem(timerFinishedKey) === 'true';

    if (timerFinished) {
        startButton.disabled = true;
        console.log("Timern har redan gått ut.");
        return;
    }

    if (timerStarted && timerEndTime) {
        const currentTime = Date.now();
        timeRemaining = Math.max(0, Math.floor((timerEndTime - currentTime) / 1000));
    
        if (timeRemaining > 0) {
            startTimer();
            startButton.disabled = true;
            övningarSection.classList.remove('hidden');
        } else {
            localStorage.setItem(timerFinishedKey, 'true');
            startButton.disabled = true;
        }
    } else {
        // Om ingen timer är lagrad, sätt standardtid för sidan
        timeRemaining = selectedTime;
    }
    
};

function inaktiveraKnappar() {
    document.querySelectorAll("button").forEach(knapp => {
        if (knapp.id !== 'borja' && knapp.id !== 'submit') {
            knapp.disabled = true;
        }
    });
}

function aktiveraKnappVidPoäng() {
    const extraKnapp = document.getElementById('extraKnapp');
    if (poäng >= 35 && extraKnapp) {
        extraKnapp.disabled = false;
    }
}

function aktiveraKnappar() {
    document.querySelectorAll("button").forEach(knapp => {
        if (knapp.id !== 'borja') {
            knapp.disabled = false;
        }
    });
}

// Timerfunktion
function startTimer() {
    timerDisplay.textContent = timeRemaining;
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Nu har tiden gått');
            document.querySelectorAll("button").forEach(knapp => knapp.disabled = true);
            localStorage.setItem(timerFinishedKey, 'true');
            localStorage.removeItem(timerStartedKey);
            localStorage.removeItem(timerEndTimeKey);
        }
    }, 1000);
}

// Starta timern
startButton.addEventListener('click', () => {
    if (localStorage.getItem(timerStartedKey) === 'true' || localStorage.getItem(timerFinishedKey) === 'true') {
        alert("Timern kan inte startas igen.");
        return;
    }

    clearInterval(timerInterval);
    timeRemaining = selectedTime;  // ANVÄND SIDSPECIFIK TID!
    const endTime = Date.now() + timeRemaining * 1000;
    
    localStorage.setItem(timerStartedKey, 'true');
    localStorage.setItem(timerEndTimeKey, endTime);
    startTimer();
    startButton.disabled = true;
    övningarSection.classList.remove('hidden');
    aktiveraKnappar();
});


// Funktion för att rätta flervalsfrågor
function rättaFlervalsSvar(formId, feedbackId, rättSvar, knappId) {
    const form = document.getElementById(formId);
    const feedback = document.getElementById(feedbackId);
    const valdaAlternativ = form.querySelector('input[type="radio"]:checked');

    if (valdaAlternativ) {
        if (valdaAlternativ.value === rättSvar) {
            feedback.textContent = "Rätt svar! +1 poäng";
            poäng++;
            localStorage.setItem('poäng', poäng);
        } else {
            feedback.textContent = "Fel svar. Försök igen nästa gång!";
        }
        document.getElementById(knappId).disabled = true;
        form.querySelectorAll('input[type="radio"]').forEach(alternativ => alternativ.disabled = true);
    } else {
        feedback.textContent = "Vänligen välj ett alternativ innan du kontrollerar svaret.";
    }
}

// Hämta och visa poäng
function hämtaPoäng() {
    const sparadPoäng = localStorage.getItem('poäng');
    if (sparadPoäng) {
        poäng = parseInt(sparadPoäng, 10);
    }
    visaPoäng();
}

function visaPoäng() {
    const sparadPoäng = localStorage.getItem('poäng');
    document.getElementById('poängDisplay').textContent = sparadPoäng ? `Poäng: ${sparadPoäng}` : "Poäng: 0";
}

// Visa bild vid viss poäng
function visaBildVidPoäng() {
    const sparadPoäng = localStorage.getItem('poäng');
    if (sparadPoäng) {
        const poäng = parseInt(sparadPoäng);
        if (poäng >= 35) {
            visaBild('bemarkelseSvår');
        } else if (poäng >= 30) {
            visaBild('bemarkelse30');
        } else if (poäng >= 25) {
            visaBild('bemarkelse25');
        } else if (poäng >= 20) {
            visaBild('bemarkelse20');
        }
    }
}

function visaBild(id) {
    const bild = document.getElementById(id);
    if (bild) {
        bild.style.display = 'inline';
    }
}
