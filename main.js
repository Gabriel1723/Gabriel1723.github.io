
//funktion för att rätta svar
function rättaSvar(frågaId, feedbackId, rättSvar, knappId) {
    let svar = document.getElementById(frågaId).value;
    if (svar == rättSvar && knappFlagga == false) {
        document.getElementById(feedbackId).innerHTML = "Rätt svar! +1 poäng";
    } else {
        document.getElementById(feedbackId).innerHTML = "Fel svar.";
    };
    
    
    document.getElementById(knappId).disabled = true;
}
function timerFunktion() {
    alert('Nu är du blockerat från att svara');
        let knappar = document.querySelectorAll("button");
        knappar.forEach(knapp => {
            knapp.disabled = true;
  })
  };



  //måste använda windows.localstorage för att lagra poäng bland annat