"use strict";

////////////////////////////////////////////////
// COPYLEFT 🄯 2020 MAXIME GAGNON.            //
// Show small popup at bottom right of screen //
////////////////////////////////////////////////

import * as utils from "./utils.mjs"

let isSetup = false;
let timeout;

function setup() {
	let popup = document.createElement("div");
	popup.setAttribute("id", "notificationPopup");
	document.body.append(popup);
	popup.innerHTML = `<h2 id="notificationPopup_header"></h2><p id="notificationPopup_text"></p><div id="notificationPopup_buttonsWrapper"><a class="button notificationPopup_button" id="notificationPopup_button"></a><a class="button notificationPopup_button" id="notificationPopup_close">Dismiss</a></div><style>#notificationPopup{width:28vw;height:auto;position:fixed;bottom:1%;right:-100%;color:var(--font-primary);background-color:var(--background-primary);border:solid 2px var(--font-secondary);padding:1%;box-shadow:0 0 10px #BABABA;transition:right .7s ease-in-out}#notificationPopup h2{font-family:Quicksand;font-size:3.5vmin;margin:0;margin-bottom:5px}#notificationPopup p{font-family:Quicksand;font-size:1.7vmin;margin:0;margin-bottom:10px}#notificationPopup_buttonsWrapper{width:100%;margin-top:7%;bottom:4%;display:flex}.notificationPopup_button{width:100%;height:auto}</style>`;
}

function show(header, message, label, close, action, delay=10000) {
	// Remove previous timeout
	clearTimeout(timeout);
	
	// Set base content and append to body
	if (!isSetup) {
		setup();
		isSetup = true;
	}
	
	// Set popup content and show
	let popup = utils.get("notificationPopup");
	let button = utils.get("notificationPopup_button");
	utils.get("notificationPopup_header").innerHTML = header;
	utils.get("notificationPopup_text").innerHTML = message;
	utils.get("notificationPopup_close").innerHTML = close;
	utils.get("notificationPopup_close").addEventListener("click", function() {
		popup.style.right = "-100%";
	});
	if (button) button.innerHTML = label;
	
	
	// Set action
	if (typeof(action) == "object") // i.e. string
		button.href = action; // Treat as mere link
	else if (!action)
		popup.children[2].removeChild(button);
	else
		if (button) button.addEventListener("click", action);
	
	// Display
	setTimeout(function() {
		popup.style.right = "1%";
	}, 10);
	timeout = setTimeout(function() {
		popup.style.right = "-100%";
	}, delay);
}

export { show }
