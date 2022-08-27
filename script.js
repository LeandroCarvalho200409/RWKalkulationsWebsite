/*
IT-Support Offertenrechner, erstellt durch Leandro Carvalho im Auftrag von Herrn Jacques Mock Schindler. 
*/

/*Hier werden alle nötige Variablen erstellt und inizialisiert. für die verschiedenen Prozentsätzen werden auch provisorisch statische Werte
  gesetzt.*/
var nameCounter = 0;
var rowCounter = 0;

var gemeinKostenProzent = 0.15
var gewinnZuschlagMaterial = 0.10
var reinGewinnZuschlag = 0.06
let skonto = 0.05
var mwst = 0.077
var rabattProzent = 0.12
var matZuschlag = 0.1

var stundenSatz = Number(25)
var ppkm = Number(2.5)

var total = parseFloat(0)
var totalWithMWST = parseFloat(0)

//Diese drei Arrays, welche hier erstellt werden, werden später gebraucht, um die Daten von den Material-Eingabefelder zu holen und zu speichern.
var materialBeschVal = []
var materialAnzsVal = []
var materialPPSsVal = []



/*Die Funktion <<onAddMaterial>> macht, das was ihr Name auch sagt, und zwar ist das, das Erstellen der weiteren Zeilen in HTML, wo man ein zusätzliches
  Material hinzufügen kann. Dabei wird jedes HTML-Element mithilfe von JS DOM Funktionen, erstellt und dessen nötigen Attribute(className, type, ...) werden 
  hier gesetzt. 
*/
function onAddMaterial(e){
    nameCounter = nameCounter+1; // Dieser nameCounter dienet um die ID's für die verschiedenen Elemente zu erstellen, sodass jeder eine eindeutige ID hat.
    var materialDiv = document.createElement("DIV") // Mit der .createElement() Funktion erstellt man einen HTML-Element.
    var materialDivClass = document.createAttribute("id") //MIt der Funktion .createAttribute() wird ein neues Attribut erstellt.
    materialDivClass.value = "material"+nameCounter
    materialDiv.className = "material"
    materialDiv.setAttributeNode(materialDivClass) // Mit der Funktion .setAttributeNode() wird ein schon erstelltes Attribut einem HTML-Element zugewiesen.

    var materialDef = document.createElement("LABEL")
    var materialDefInput = document.createElement("INPUT")
    var materialDefInputClass = document.createAttribute("id")
    materialDefInputClass.value = "beschreibung_material"+nameCounter
    var materialDefInputType = document.createAttribute("type")
    materialDefInputType.value="text"
    var materialDefInputName = document.createAttribute("name")
    materialDefInputName.value="beschreibung_material"+nameCounter
    var materialDefText = document.createTextNode("Beschreibung Material: ")
    var materialDefInputGenClass = document.createAttribute("class")
    materialDefInputGenClass.value = "beschreibung_material"
    materialDefInput.setAttributeNode(materialDefInputGenClass)
    materialDefInput.setAttributeNode(materialDefInputClass)
    materialDefInput.setAttributeNode(materialDefInputName)
    materialDefInput.setAttributeNode(materialDefInputType)
    materialDef.appendChild(materialDefText) //Mit der Funktion .appendChild() kann man einen HTML-Element als ein Kind eines anderen HTML-Element zuweisen.
    materialDef.appendChild(materialDefInput)

    var materialAnz = document.createElement("LABEL")
    var materialAnzInput = document.createElement("INPUT")
    var materialAnzInputClass = document.createAttribute("id")
    materialAnzInputClass.value = "anzahl_material"+nameCounter
    var materialAnzInputType = document.createAttribute("type")
    materialAnzInputType.value="number"
    var materialAnzInputName = document.createAttribute("name")
    materialAnzInputName.value="anzahl_material"+nameCounter
    var materialAnzText = document.createTextNode("Anzahl Material: ")
    var materialAnzInputGenClass = document.createAttribute("class")
    materialAnzInputGenClass.value = "anzahl_material"
    materialAnzInput.setAttributeNode(materialAnzInputGenClass)
    materialAnzInput.setAttributeNode(materialAnzInputClass)
    materialAnzInput.setAttributeNode(materialAnzInputName)
    materialAnzInput.setAttributeNode(materialAnzInputType)
    materialAnz.appendChild(materialAnzText)
    materialAnz.appendChild(materialAnzInput)

    var materialPPS = document.createElement("LABEL")
    var materialPPSInput = document.createElement("INPUT")
    var materialPPSInputClass = document.createAttribute("id")
    materialPPSInputClass.value = "pps_material"+nameCounter
    var materialPPSInputType = document.createAttribute("type")
    materialPPSInputType.value="text"
    var materialPPSInputName = document.createAttribute("name")
    materialPPSInputName.value="pps_material"+nameCounter
    var materialPPSText = document.createTextNode("Preis p. Stk. Material: ")
    var materialPPSInputGenClass = document.createAttribute("class")
    materialPPSInputGenClass.value = "pps_material"
    materialPPSInput.setAttributeNode(materialPPSInputGenClass)
    materialPPSInput.setAttributeNode(materialPPSInputClass)
    materialPPSInput.setAttributeNode(materialPPSInputName)
    materialPPSInput.setAttributeNode(materialPPSInputType)
    materialPPS.appendChild(materialPPSText)
    materialPPS.appendChild(materialPPSInput)

    materialDiv.appendChild(materialDef)
    materialDiv.appendChild(materialAnz)
    materialDiv.appendChild(materialPPS)
    document.getElementById("materialContainer").appendChild(materialDiv)


    //Ab hier wird die HTML-Tabelle für das Resultat der Rechnung erstellt. Für den Anfang ist diese Tabelle jedoch noch leer.
    var beforeMaterialDiv = document.getElementById("materialRow"+rowCounter)
    var materialRowsDivRow = document.createElement("TR")
    materialRowsDivRow.id = "materialRow"+nameCounter
    materialRowsDivRow.className = "materialRow"


    var materialRowsDivRowDataBesch = document.createElement("TD")
    materialRowsDivRowDataBesch.id="data_beschreibung_"+nameCounter
    materialRowsDivRowDataBesch.className="data_beschreibung beschreibung"
    var materialRowsDivRowDataBeschP = document.createElement("P")
    materialRowsDivRowDataBeschP.id="data_beschreibung_p"+nameCounter
    materialRowsDivRowDataBeschP.className="data_beschreibung_p"
    materialRowsDivRowDataBesch.appendChild(materialRowsDivRowDataBeschP)

    var materialRowsDivRowDataPPS = document.createElement("TD")
    materialRowsDivRowDataPPS.id="data_pps_"+nameCounter
    materialRowsDivRowDataPPS.className="data_pps"
    var materialRowsDivRowDataPPSP = document.createElement("P")
    materialRowsDivRowDataPPSP.id="data_pps_p"+nameCounter
    materialRowsDivRowDataPPSP.className="data_pps_p"
    materialRowsDivRowDataPPS.appendChild(materialRowsDivRowDataPPSP)

    var materialRowsDivRowDataAnz = document.createElement("TD")
    materialRowsDivRowDataAnz.id="data_anzahl_"+nameCounter
    materialRowsDivRowDataAnz.className="data_anzahl"
    var materialRowsDivRowDataAnzP = document.createElement("P")
    materialRowsDivRowDataAnzP.id="data_anzahl_p"+nameCounter
    materialRowsDivRowDataAnzP.className="data_anzahl_p"
    materialRowsDivRowDataAnz.appendChild(materialRowsDivRowDataAnzP)

    var materialRowsDivRowDataPreis = document.createElement("TD")
    materialRowsDivRowDataPreis.id="data_preis_"+nameCounter
    materialRowsDivRowDataPreis.className="data_preis"
    var materialRowsDivRowDataPreisP = document.createElement("P")
    materialRowsDivRowDataPreisP.id="data_preis_p"+nameCounter
    materialRowsDivRowDataPreisP.className="data_preis_p"
    materialRowsDivRowDataPreis.appendChild(materialRowsDivRowDataPreisP)

    materialRowsDivRow.appendChild(materialRowsDivRowDataBesch)
    materialRowsDivRow.appendChild(materialRowsDivRowDataPPS)
    materialRowsDivRow.appendChild(materialRowsDivRowDataAnz)
    materialRowsDivRow.appendChild(materialRowsDivRowDataPreis)
   
    ++rowCounter
    var tableBody = document.getElementById("matTableBody")
    var verwaltungsKostenTR = document.getElementById("verwaltungskostenTR")
    var secondTHead = document.getElementById("twoColTR")
    tableBody.insertBefore(materialRowsDivRow, secondTHead) /*Mithilfe der .insertBefore() Funktion konnte ich eine Material Row vor der Verwaltungskosten
                                                              Row einfügen und so auch bewirken, dass die Auflistung aller Materialien am gleichen Ort ist.*/
}

/* Falls man ausversehen eine Zeile des Materiales zu viel erstellt hat, dann soll man es doch nicht einfach stehen lassen, sondern kann es mithilfe der
   .removeMaterial() Funktion löschen. Dabei löscht es einfach die zuletzterstellte Zeile und entfernt diese. Der nameCounter und rowCounter variablen werden
   ebenfalls 1 abgezogen.*/
function removeMaterial(e){
    document.getElementById("materialContainer").removeChild(document.getElementById("material"+nameCounter))
    document.getElementById("matTableBody").removeChild(document.getElementById("materialRow"+rowCounter))
    if(nameCounter >= 0){
        nameCounter = nameCounter-1;
    }
    if(rowCounter >= 0){
        rowCounter = rowCounter-1
    }
}
/*Diese Funktion sollte eigentlich die verschiedenen Prozentsätzen von der configurations.csv Datei abholen. 
  Hier gibt es jedoch ein Problem, denn wenn man es nicht von einem Server aus ausruft, dann gibt es einen sogenannten CORS Fehler. Da ich die HTML-Datei
  bis jetzt immer von einem sogenannten Live Server von Visual Studio Code aufgerufen habe, ist mir dieser Fehler erst jetzt aufgefallen.
  Fazit: Die Funktion funktioniert eigentlch, jedoch nicht, wenn man die HTML-Datei lokal öffnet. Da die Funktion nicht funktioniert, nimmt das Programm
  einfach die statischen, provisorischen Werte.*/
function getValues(){
    fetch('./configurations.csv', {
        mode: 'no-cors'
    })
    const fetchP = fetch('./configurations.csv', {
        mode: 'cors'
    })
    .then(response => {
        return response.text();
    })
    .then(data => {
        // Hier werden die Daten, die man vom CSV-File bekommt, nach den Zeilenumbrüche geteilt und in einer Array gespeichert.
        var splitNewLN = data.split("\n")
        //Hier passiert das gleiche, wie mit dem Zeilenumbruch, dedoch mit den Semikolons und den \r, bis man den Wert selber herausgefischt hat.
        var splitMWSTTab = splitNewLN[0].split(";")
        var mwstSplit = splitMWSTTab[1].split("\r")
        mwst = Number(mwstSplit[0])

        //Weiterhin gilt für die folgenden Werte das gleiche, wie bei der MWST
        var splitSkontoTab = splitNewLN[1].split(";")
        var skontoSplit = splitSkontoTab[1].split("\r")
        skonto = Number(skontoSplit[0])

        var splitGemeinPTab = splitNewLN[2].split(";")
        var gemeinPSplit = splitGemeinPTab[1].split("\r")
        gemeinKostenProzent = Number(gemeinPSplit[0])

        var splitMatZuTab = splitNewLN[3].split(";")
        var matZuSplit = splitMatZuTab[1].split("\r")
        matZuschlag = Number(matZuSplit[0])

        var splitrGZuTab = splitNewLN[4].split(";")
        var reinGeZuSplit = splitrGZuTab[1].split("\r")
        reinGewinnZuschlag = Number(reinGeZuSplit[0])

        var splitRabattTab = splitNewLN[5].split(";")
        var rabattSplit = splitRabattTab[1].split("\r")
        rabattProzent = Number(rabattSplit[0])

        var splitStundenSatzTab = splitNewLN[6].split(";")
        var stdSatzSplit = splitStundenSatzTab[1].split("\r")
        stundenSatz = Number(stdSatzSplit[0])

        var splitppkmTab = splitNewLN[7].split(";")
        var ppkmSplit = splitppkmTab[1].split("\r")
        ppkm = Number(ppkmSplit[0])
    })
}
/*Wenn der Knopf <<berechnen> geklickt wird, wird diese Funktion ausgeführt, die nichts anderes macht, als die Funktion, die die Daten vom CSV-File abholt
  aufruft und nachdem diese Funktion aufgerufen wird, soll die Funktion onBerechnen() erst nach einer Sekunde aufgerufen werden. Dies habe ich so gemacht, da
  weil die fetch() Funktion nicht gerade direkt die Daten zur Verfügung stellt, sonst die Berechnungen durchgeführt werden würden, ohne, dass die Daten schon
  da wären.*/
function onClick(e){
    getValues()
    setTimeout(function() {onBerechnen()}, 1*1000)
}
/*Diese Funktion berechnet alle nötigen Werte und gibt sie in die entsprechenden Felder der Tabelle aus.*/
function onBerechnen(e){

    //Hier werden gewisse Variablen wieder auf leer, oder 0 gesetzt, weil sonst beim zweiten Aufruf der Berechnung die alten Daten noch dabei wären.
    materialBeschVal = []
    materialAnzsVal = []
    materialPPSsVal = []
    total = 0
    totalWithMWST = 0

    //Hier werden die Daten von allen Eingabefeldern abgeholt und gespeichert.
    var hours = parseFloat(document.getElementById("stunden").value)
    var km = parseFloat(document.getElementById("strecke").value)
    var materialBesch = document.getElementsByClassName("beschreibung_material")
    var materialAnzs = document.getElementsByClassName("anzahl_material")
    var materialPPSs = document.getElementsByClassName("pps_material")

    //Die Werte für die anzahl Stunden und für die gefahrene Strecke werden berechnet und ausgegeben.
    document.getElementById("stunden_pps_p").innerHTML="CHF "+parseFloat(stundenSatz).toFixed(2)
    document.getElementById("stunden_anzahl_p").innerHTML=parseFloat(hours).toFixed(2)
    document.getElementById("stunden_preis_p").innerHTML="CHF "+parseFloat(stundenSatz*hours).toFixed(2)
    total = parseFloat(total+stundenSatz*hours)
    console.log("Total + Stundensatz: "+total)

    document.getElementById("strecke_pps_p").innerHTML="CHF "+parseFloat(ppkm).toFixed(2)
    document.getElementById("strecke_anzahl_p").innerHTML=parseFloat(km).toFixed(2)
    document.getElementById("strecke_preis_p").innerHTML="CHF "+parseFloat(ppkm*km).toFixed(2)
    total = parseFloat(total+ppkm*km)
    console.log("Total + strecke: "+total)

    //Diese for-Schleife holt alle Werte von den Material Eingabefelder ab und speichert sie in verschiedenen Arrays.
    for(var i=0; i<materialBesch.length; ++i){
            materialBeschVal.push(materialBesch[i].value)
            materialAnzsVal.push(parseFloat(materialAnzs[i].value))
            materialPPSsVal.push(parseFloat(materialPPSs[i].value))
    }
    //Berechnet alle nötigen Zahlen zu den Materialien + noch einen vom benutzer definierten Material-Zuschlag, und gibt alle Daten zu den Materialien aus.
    for(var i=0; i<=nameCounter; i++){
        document.getElementById("data_beschreibung_p"+i).innerHTML=materialBeschVal[i]
        var pps = parseFloat(materialPPSsVal[i])
        var ppsZuschlag=parseFloat(materialPPSsVal[i]*matZuschlag)
        var ppsWithZuschlag = parseFloat(pps+ppsZuschlag)
        document.getElementById("data_pps_p"+i).innerHTML="CHF "+ppsWithZuschlag.toFixed(2)
        document.getElementById("data_anzahl_p"+i).innerHTML=parseFloat(materialAnzsVal[i]).toFixed(2)
        document.getElementById("data_preis_p"+i).innerHTML="CHF "+parseFloat(ppsWithZuschlag*materialAnzsVal[i]).toFixed(2)
        var preisMat = Number(parseFloat(ppsWithZuschlag*materialAnzsVal[i]))
        total = parseFloat(total+preisMat)
        console.log("Total + Preis von Material "+materialBeschVal[i]+": "+total)
    }

    //Hier werden die Gemeinkosten anhand vom gewählten, oder vordefinierten Prozentsatz berechnet.
    var gemeinKosten = parseFloat(parseFloat(total*gemeinKostenProzent))
    total = parseFloat(total+gemeinKosten)
    console.log("Total + gemeinkosten("+gemeinKosten+"): "+total)

    //Hier wird der Reingewinn anhand vom gewählten, oder vordefinierten Prozentsatz berechnet.
    var reingewinn = parseFloat(total*reinGewinnZuschlag)
    total = parseFloat(total+reingewinn)
    console.log("Total + gewinn("+reingewinn+"): "+total)

    //Hier wird der Skonto anhand des vordefinierten oder definierten Prozentsatzes berechnet.
    var skontoBerechnet = parseFloat(total*skonto)
    total = parseFloat(total+skontoBerechnet)
    console.log("Total + skonto("+skontoBerechnet+"): "+total)

    //Das gleiche, wie beim Skonto passiert auch hier mit dem Rabatt.
    var rabatt = parseFloat(total*rabattProzent)
    total = parseFloat(total+rabatt)
    console.log("Total + rabatt("+rabatt+"): "+total)

    //Hier werden die Verwaltungskosten(Gemeinkosten, Rabatt, Skonto und Reingewinn) berechnet und in der Tabelle ausgegeben.
    var verwaltungsKosten = parseFloat(gemeinKosten+rabatt+skontoBerechnet+reingewinn)
    document.getElementById("verwaltungskosten_p").innerHTML="CHF "+verwaltungsKosten.toFixed(2)

    /*Falls die Checkbox skonto gewählt wurde und noch keine Ausgabe für den Skonto existiert, wird hier eine Ausgabe für den Skonto erstellt. Ebenfalls wird
    der Skonto vom Bruttoverkaufspreis abgerechnet.*/
    if(document.getElementById("skonto").checked && document.getElementById("skonto_TR") == null){
        var skontoTR = document.createElement("TR")
        var skontoBeschTD = document.createElement("TD")
        skontoBeschTD.className="beschreibung"
        var skontoBeschP = document.createElement("P")
        skontoBeschP.id="skontoBeschP"
        skontoBeschP.innerHTML="./. Skontoabzug("+parseInt(skonto*100)+"%)"
        var skontoDataTD = document.createElement("TD")
        skontoDataTD.colSpan=3
        var skontoDataP = document.createElement("P")
        skontoDataP.id="skontoDataP"
        skontoDataP.innerHTML="CHF "+skontoBerechnet.toFixed(2)
        skontoTR.id = "skonto_TR"

        skontoBeschTD.appendChild(skontoBeschP)
        skontoDataTD.appendChild(skontoDataP)
        skontoTR.appendChild(skontoBeschTD)
        skontoTR.appendChild(skontoDataTD)
        document.getElementById("matTableBody").insertBefore(skontoTR, document.getElementById("tr_ohneMWST"))
        total=parseFloat(total-skontoBerechnet)
    }
    //Das gleiche Spiel, wie oben beim Skonto, jedoch hier mit dem Rabatt.
    if(document.getElementById("rabatt").checked && document.getElementById("rabatt_TR") == null){
        var rabattTR = document.createElement("TR")
        var rabattBeschTD = document.createElement("TD")
        rabattBeschTD.className="beschreibung"
        var rabattBeschP = document.createElement("P")
        rabattBeschP.id="rabattBeschP"
        rabattBeschP.innerHTML="./. Spezialrabatt("+parseInt(rabattProzent*100)+"%)"
        var rabattDataTD = document.createElement("TD")
        rabattDataTD.colSpan="3"
        var rabattDataP = document.createElement("P")
        rabattDataP.id="rabattDataP"
        rabattDataP.innerHTML="CHF "+rabatt.toFixed(2)
        rabattTR.id = "rabatt_TR"

        rabattBeschTD.appendChild(rabattBeschP)
        rabattDataTD.appendChild(rabattDataP)
        rabattTR.appendChild(rabattBeschTD)
        rabattTR.appendChild(rabattDataTD)
        document.getElementById("matTableBody").insertBefore(rabattTR, document.getElementById("tr_ohneMWST"))
        total=parseFloat(total-rabatt)
    }
    //Falls die Checkbox Rabatt nicht gewählt wurde und jedoch eine Ausgabe dafür existiert, dann wird die Ausgabe gelöscht.
    if(document.getElementById("rabatt").checked == false && document.getElementById("rabatt_TR") != null){
        document.getElementById("matTableBody").removeChild(document.getElementById("rabatt_TR"))
    }
    //Falls die Checkbox Skonto nicht gewählt wurde und jedoch eine Ausgabe dafür existiert, dann wird die Ausgabe gelöscht.
    if(document.getElementById("skonto").checked == false && document.getElementById("skonto_TR") != null){
        document.getElementById("matTableBody").removeChild(document.getElementById("skonto_TR"))
    }
    /*Schlussendlich wird die Mehrwertsteuer auch noch berechnet. Einerseits wird in der Offerte gezeigt, was der Preis ohne MWST wäre und was der Preis mit 
      MWST ist.*/
    var mwstBerechnet = parseFloat(total*mwst)
    totalWithMWST = parseFloat(total+mwstBerechnet)
    document.getElementById("total").innerHTML="CHF "+totalWithMWST.toFixed(2)
    document.getElementById("totalOhneMWST_p").innerHTML="CHF "+parseFloat(total).toFixed(2)
}
