function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

if (document.getElementById("matte")) {
	var table = document.getElementById("matte");
	var spm = [
		"Andersen og Abdul spiller",
		"Melheim tar av uniformsjakka",
		"Sprittusj på tavla",
		"Databrus blir hengt utenfor vinduet",
		"Kirsi spør om noen ser feilen i noen sin oblig løsning.",
		"Hardy dupper",
		"De som skal vise oblig skriver alt for stort",
		"De som skal vise oblig skriver alt for lite",
		"Kirsi nevner barna sine",
		'"IKKE LOV"',
		"Pushups i pausene",
		"Du gjør ferdig obligen i timen",
		"Vi kan ikke elementære ting",
		"Kirsi spør om vi er enige",
		"Jon brygger kaffe",
		"Vi bruker overheaden"
	];
} else if (document.getElementById("digtek")) {
	var table = document.getElementById("digtek");
	spm = [
		"Nils snakker til seg selv",
		"Nils står KLIN inntil tavla",
		"Nils koder på tavla",
		"Nils snakker om C89",
		'"Nei det stemmer jo ikke"',
		"Thomassen følger med i timen i minst 1 min",
		'"Dette er jo selvfølgelig fordi..."',
		'"Eksekverer"',
		"Du spiller bloons/sjakk/tetris",
		"Du gjør MM1",
		"Du blir avhengig av kaffe",
		"Du ender opp med å se på Youtube om det vi har om istedet",
		"Står mer enn to minutter med fronten mot tavla",
		'"Ser dere noe feil her?"',
		"ū",
		"Bratseth sovner",
		"Noen stiller et spørsmål etter 15.27",
		"Du følger med"
	];
} else if (document.getElementById("annet")) {
	var table = document.getElementById("annet");
	spm = [
		"Live søler kaffe",
		"Du ender opp med å se på Youtube om det vi har om istedet",
		"Noen steller seg bakerst",
		"Johnny sover"
	];
}


shuffle(spm);

var boardSize1 = Math.ceil(Math.sqrt(spm.length));
var boardSize2 = Math.ceil(spm.length/boardSize1)

if (boardSize1 > 5) {boardSize1 = 5;}
if (boardSize2 > 5)	{boardSize2 = 5;}


// console.log("table");
var teller = 0;
loop1:
for (var i = 0; i < boardSize2; i++) {
	var newRow = document.createElement("div");
	newRow.className = "tr";
	table.appendChild(newRow);
	// console.log("trer");
	for (var j = 0; j < boardSize1; j++) {
		var newCell = document.createElement("div");
		newCell.className = "td";
		// console.log("tder", table.children[i].children[i]);
		newCell.innerHTML = spm[teller];
		newRow.appendChild(newCell);
		table.children[i].children[j].addEventListener("click", function(e) {
			// console.log(e.target);
			if (e.target.classList.contains("checked")) {
				e.target.className = "td";
			} else {
				e.target.className = "td checked";
			}
		});
		if (teller == 0 && newCell.innerHTML == "Du følger med") {
			msg = document.createElement("div");
			msg.innerHTML = "Gratulerer<br>Du fant et easter egg<br>Klarer du også å få bingo?"
			table.appendChild(msg);
			break loop1;
		}
		teller++;
	}
}
