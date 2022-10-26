matrise = [
	[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  0,  0,  0,  0,  0,  0,  0],
	[ 0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0],
	[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0],
	[ 0,  0,  4,  0,  0,  0,  0,  5,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0],
	[ 0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  6,  0,  0],
	[ 0,  0,  1,  0,  0,  7,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0],
	[ 0,  0,  1,  0,  0,  1,  0,  0,  0,  0,  1,  0,  8,  0,  0,  1,  0,  0],
	[ 0,  0,  1,  0,  0,  1,  0,  0,  0,  0,  9,  1,  1,  1,  0,  1,  0,  0],
	[10,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  0,  0,  1,  0,  0],
	[ 0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0, 11,  1,  1,  1,  1,  1,  1],
	[ 0,  0,  0, 12,  1,  1,  1,  1,  1,  1,  1,  0,  1,  0,  0,  0,  0,  0],
	[ 0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0],
	[ 0,  0,  0,  0,  0,  1,  0,  0,  0,  0, 13,  0,  1,  0,  0,  0,  0,  0],
	[ 0,  0,  0,  0,  0, 14,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0],
	[ 0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0],
	[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0],
	[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0],
	[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0],
]

across = [
	[2, "Rølp og julemat"],
	[4, "Rise and grind"],
	[8, "Metermajor og memelord"],
	[9, "Skrive dikt"],
	[10,"Sulten og tørst, [BLANK] først"],
	[11,"Hærens varmeste plagg"],
	[13,"tirsdag og torsdag"]
]

down = [
	[1, "V76"],
	[3, "Lt."],
	[5, "Vår reddende engel"],
	[6, "Før revelje"],
	[7, "Oppkvikker"],
	[12, "Prøv igjen..."]
]




document.getElementById("ctable");

for (var i = 0; i < matrise.length; i++) {
	row = document.createElement("div")
	ctable.appendChild(row);
	for (var j = 0; j < matrise[i].length; j++) {
		cell = document.createElement("input")
		switch (matrise[i][j]) {
			case 1:
				// lag tom rute
				// <input contenteditable maxlength="1" value="">
				cell.maxLength = 1;
				cell.contenteditable = true;
				break;
			case 0:
				// lag disabled rute
				// <input disabled class="disabled" value="">
				cell.disabled = true;
				cell.className = "disabled";
				break;
			default:
				// ta verdi - 1, og lag som placeholder rute.
				// <input contenteditable placeholder="verdi" maxlength="1" value="">
				cell.maxLength = 1;
				cell.contenteditable = true;
				cell.placeholder = (matrise[i][j]-1) + ".";
				break;
		}
		row.appendChild(cell);
	}
}


aloc = document.getElementById("across");
dloc = document.getElementById("down");

for (var i = 0; i < across.length; i++) {
	clue = document.createElement("p");
	nr = document.createElement("b");
	text = document.createElement("span");
	nr.innerHTML = across[i][0] + "." + (" ".repeat(3-String(across[i][0]).length));
	text.innerHTML = across[i][1];
	aloc.appendChild(clue);
	clue.appendChild(nr);
	clue.appendChild(text);
}

for (var i = 0; i < down.length; i++) {
	clue = document.createElement("p");
	nr = document.createElement("b");
	text = document.createElement("span");
	nr.innerHTML = down[i][0] + "." + (" ".repeat(3-String(down[i][0]).length));
	text.innerHTML = down[i][1];
	dloc.appendChild(clue);
	clue.appendChild(nr);
	clue.appendChild(text);
}
