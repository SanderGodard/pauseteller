
// Date kode
Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

// Toggle fullscreen
function toggleFullscreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen()
			.catch((err) => console.error(err))
	} else {
		document.documentElement.requestFullscreen(); // Får error på linja men den funker jo, så who knows?
		window.scrollTo(0, 0);
	}
	document.getElementsByTagName("main")[0].style.minHeight = "100vh";
}


// Formaterer tallene som blir vist på skjerm bare
function pad(a) {
	if (String(a).length < 2) {
		a = "0" + a
	};
	return a;
}

// Starter telling og holder pauser
function main() {
	// Må trykke for å starte main, da kan jeg kjøre fullscreen greia selv.
	document.title = "Vent litt...";
	tittel = document.getElementById("tittel");
	if (tittel != null) {
		mainside = true;
	} else {
		mainside = false;
	}
	pauseklokkeslett = [
		["08:40", "08:45"],
		["09:25", "09:30"],
		["10:15", "10:20"],
		["11:00", "11:45"],
		["12:25", "12:30"],
		["13:10", "13:15"],
		["13:55", "14:00"],
		["14:45", "14:50"],
		["15:30", "08:00"], // Skjer noe rart her?
	];
	// console.log("Trykket.");

	// Telleintervall.
	setInterval(function() {
		let isPause = false;
		let isHere = false;
		let sovetid = false;

		// console.log("Sjekker tid\n" + now.toString() + "\nFra" + compareTimeFrom.toString() + "\nTil" + compareTimeTo.toString() + "\ns=" + s);

		let sec = -1;
		let seconds = -1;

		for (var i = 0; i < pauseklokkeslett.length; i++) {

			for (var j = 0; j < pauseklokkeslett[i].length; j++) { // Går gjennom alle pausetidspunkter og sjekker hvilke to jeg står mellom.
				let now = new Date();
				const s = now.toUTCString();
				let compareTimeFrom = new Date(s);//.parse(s);
				let compareTimeTo = new Date(s);//.parse(s);
				// console.log("------------------NY-------------------")
				nexti = i;
				next = j + 1;
				if (next > 1) {
					nexti = i + 1;
					next = 0;
				}
				tid1 = pauseklokkeslett[i % pauseklokkeslett.length][j];
				tid2 = pauseklokkeslett[nexti % pauseklokkeslett.length][next];

				compareTimeFrom.setHours(tid1.split(":")[0], tid1.split(":")[1]);
				compareTimeTo.setHours(tid2.split(":")[0], tid2.split(":")[1]);
				// naatimer = now.getHours()
				if (now.getHours() < 8) {
					compareTimeFrom = compareTimeFrom.addDays(-1);
					compareTimeTo = compareTimeTo.addDays(-1);
					sovetid = true;
				}
				// console.log(tid1 + "vs" + pauseklokkeslett[pauseklokkeslett.length - 1][0]);
				// console.log(now.getHours() + "over" +  compareTimeFrom.getHours() + "or" + now.getHours() + "less than" + 8);
				if (tid1 == pauseklokkeslett[pauseklokkeslett.length - 1][0] && (now.getHours() >= compareTimeFrom.getHours() || now.getHours() < 8)) {
					compareTimeTo = compareTimeTo.addDays(1);
					// console.log("Adder en dag på Til");
				}
				// console.log(now);
				// console.log(now.valueOf());
				// console.log(compareTimeTo);
				// console.log(compareTimeTo.valueOf());
				if (now > compareTimeFrom && now < compareTimeTo) {
					// console.log("sek? " + ((compareTimeTo.getMinutes() - now.getMinutes()) * 60 - 60 - now.getSeconds()));
					// console.log(compareTimeFrom);
					let dag = 0;
					if (compareTimeTo.getDate() != now.getDate()) {
						dag = 24*60*60 - ((15.5-8)*60); //  - skoledag
					}
					sec = (dag) + ((compareTimeTo.getHours() - now.getHours()) * 60 * 60) + (compareTimeTo.getMinutes() - now.getMinutes()) * 60 - now.getSeconds(); // TODO er fortsatt noe feil her med logikken, sørg for at timer for kl 2000 er 12 timer før kl 0800, og da at det ikke viser 24 timer antall minutter igjen
					// console.log(sec);
					// sec = (compareTimeTo.valueOf() - now.valueOf());
					// console.log(sec);
					seconds = sec % 60;
					// console.log(tid1 + "," + tid2);
					isHere = true;
					// if (!isPause) {
					// 	isPause = false;
					// }
					for (var k = 0; k < pauseklokkeslett.length; k++) {
						// console.log(tid1 +" ,  "+ pauseklokkeslett[k][0])
						if (tid1 == pauseklokkeslett[k][0]) { //  || sec == -1
							isPause = true;
						}
					}
				// } else if (!isHere) {
				// 	isHere = false;
				}
				// console.log("Sjekker tid\n" + now.toString() + "\nFra" + compareTimeFrom.toString() + "\nTil" + compareTimeTo.toString() + "\n" + sec + "\nEr i dette intervallet: " + isHere);
				// console.log("sovetid: " + sovetid);
			}


		}
		// let hours = Math.floor(sec / (60 * 60));
		// let hours = Math.floor((sec % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor(sec / 60);
		// let minutes = Math.floor((sec % (1000 * 60 * 60)) / (1000 * 60)) + (60 * hours);
		// console.log(sec + " , " + seconds);
		// console.log("min" + minutes);

		if (seconds == 60) {
			seconds = 0;
			minutes++;
		}
		minutes = pad(minutes);
		seconds = pad(seconds);
		if (sovetid && mainside) {
			if (minutes < 120) {
				tittel.innerHTML = "Skoledagen har ikke begynt enda";
			} else {
				tittel.innerHTML = "Legg deg";
			}
			document.title = "Zzzzz";
		} else {
			if (mainside) {
				tittel.innerHTML = "Det er " + minutes + " minutter og " + seconds + " sekunder til pause.";
			}
			document.title = minutes + ":" + seconds;
		}
		// console.log("Pause:" + isPause + "\nerHer:" + isHere + "\n");
		var r = document.querySelector(':root');
		var rs = getComputedStyle(r);
		var dayOfWeek = yourDateObject.getDay();
		var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0); // 6 = Saturday, 0 = Sunday
		if ((isPause && isHere && !isWeekend) || false) {
			// fullscreen(true);
			if (mainside) {
				tittel.innerHTML = "Det er pause!" + "<br> " + minutes + " min, og " + seconds + " sekunder igjen.";
			}

			document.title = "Pause";
			// Notifier.prototype.Notify("", "Pauseteller", "Det er pause nå!")

			// Variable change

			// document.body.style.backgroundColor = "#307023";
			// document.body.style.color = "#111111";
			r.style.setProperty('--bg', rs.getPropertyValue('--green'));
			r.style.setProperty('--text', rs.getPropertyValue('--black'));
		} else if (isWeekend) {
			if (mainside) {
				tittel.innerHTML = "Det er helg! Ta deg fri.";
			}

			document.title = "Helg";
			r.style.setProperty('--bg', rs.getPropertyValue('--black'));
			r.style.setProperty('--text', rs.getPropertyValue('--white'));
		} else {
			// fullscreen(false);
			r.style.setProperty('--bg', rs.getPropertyValue('--black'));
			r.style.setProperty('--text', rs.getPropertyValue('--white'));
			// document.body.style.backgroundColor = "#111111";
			// document.body.style.color = "#dddddd";
		}
	}, 1000);
}

main();

// Det er en youtube link.
// https://www.youtube.com/watch?v=FLAGG
