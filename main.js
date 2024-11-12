//funktion för att rätta svar
function rättaSvar(frågaId, feedbackId, rättSvar, knappId) {
    let svar = document.getElementById(frågaId).value;
    if (svar == rättSvar) {
        document.getElementById(feedbackId).innerHTML = "Rätt svar! +1 poäng";
    } else {
        document.getElementById(feedbackId).innerHTML = "Fel svar.";
    }
    
    
    document.getElementById(knappId).disabled = true;
}