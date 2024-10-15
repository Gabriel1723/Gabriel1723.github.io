//Dessa funktioner är väldigt enkla
function rättaSvar1() {
    let svar = document.getElementById("svar1").value;
    let rättSvar = 8; //Det är bara att ändra detta för att ändra svar och lägga bilder
    if (svar == rättSvar) {
        document.getElementById("feedback1").innerHTML = "Rätt svar!";
    } else {
        document.getElementById("feedback1").innerHTML = "Fel svar. Försök igen.";
    }
}

function rättaSvar2() {
    let svar = document.getElementById("svar2").value;
    let rättSvar = 6; 
    if (svar == rättSvar) {
        document.getElementById("feedback2").innerHTML = "Rätt svar!";
    } else {
        document.getElementById("feedback2").innerHTML = "Fel svar. Försök igen.";
    }
}