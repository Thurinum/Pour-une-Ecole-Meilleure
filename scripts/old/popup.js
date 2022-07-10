// POPUP MESSAGE
// =============
// Show a popup for errors and warnings
function showPopup(header, message, button, action) {
	document.getElementById("notificationPopup_header").innerHTML = header;
	document.getElementById("notificationPopup_text").innerHTML = message;
	document.getElementById("notificationPopup_button").innerHTML = button;
	document.getElementById("notificationPopup").style.right = "1%";

	if (action == "&close") {
		document.getElementById("notificationPopup").style.right = "-100%";
	} else if (action == "&report") {
		document.getElementById("notificationPopup_button").addEventListener("click", function() {
			// Send a bug report
			let script = document.createElement("script");
			script.innerHTML = `setSlideshow("", "", "https://docs.google.com/forms/d/e/1FAIpQLSdoKhJd4oYacZ9AbXynsBUhvKXW1BW7sLnV0YTfi7tpkFGExQ/viewform?embedded=true", "1");`;
			document.body.append(script);
		});
	} else {
		document.getElementById("notificationPopup_button").href = action;
	}

	setTimeout(function() {
		document.getElementById("notificationPopup").style.right = "-100%";
	}, 10000);
}

// APPLE WARNING
// =============
// Apple's browsers are poorly supported (webp)
var isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
var isIOS = /(iPhone|iPod|iPad)/i.test(navigator.platform);
// 
// window.addEventListener("load", function() {
// 	if (isMacLike || isIOS)
// 		showPopup(
// 			"Avis",
// 			"Pour une meilleure expérience, utilisez Firefox ou Chrome.<br/><img width='25%' align='center' src='https://helgeklein.com/wp-content/uploads/2020/03/Chrome-Firefox.png' />",
// 			"Fermer",
// 			"&close"
// 		);
// 
// 	// document.cookie = "username=John Doe";
// 	showPopup(
// 		"Donnez-nous votre avis!",
// 		"Vous avez des suggestions? Faites-nous les parvenir!",
// 		"NOUS ÉCRIRE!",
// 		"&report"
// 	);
// });

window.addEventListener("error", function(err) {
	showPopup(
		"Looks like something went quite wrong.",
		`We detected an error on the platform: <br>Notice something strange? Help us by reporting!<br/>
		<details><summary>Show details</summary>
		Error at line ${err.lineno}, column ${err.colno} in ${err.filename}: <br><span style="color:red;">${err.message}</span></details>`,
		"Report Bug",
		"&report"
	);
});
