var ifr = document.getElementById("ifr");
var m = document.getElementsByTagName("main")[0];

function toggleFullscreenMovember() { // Kopi av den fra main, + iframe zoom
	ifr.classList = "fullscreenIframe";
	m.style.minHeight = "90vh";
	if (document.fullscreenElement) {
		ifr.classList = "";
		m.style.minHeight = "100vh";
		document.exitFullscreen()
			.catch((err) => console.error(err))
	} else {
		document.documentElement.requestFullscreen(); // Får error på linja men den funker jo, så who knows?
		window.scrollTo(0, 0);
	}
}
