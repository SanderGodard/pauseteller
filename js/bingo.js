var table = document.getElementById("bingotable");
// console.log("table");
for (var i = 0; i < table.children.length; i++) {
	// console.log("trer");
	for (var j = 0; j < table.children[i].children.length; j++) {
		// console.log("tder", table.children[i].children[i]);
		table.children[i].children[j].addEventListener("click", function(e) {
			// console.log(e.target);
			if (e.target.classList.contains("checked")) {
				e.target.className = "td";
			} else {
				e.target.className = "td checked";
			}
		});
	}
}
