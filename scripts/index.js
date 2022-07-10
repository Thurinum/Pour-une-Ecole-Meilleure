"use strict";

import * as utils from "./modules/utils.mjs";
import * as typewriter from "./modules/typewriter.mjs";
import * as parallax from "./modules/parallax.mjs";
import * as slideshow from "./modules/slideshow.mjs";
import * as popup from "./modules/popup.mjs";
import * as cookie from "./modules/cookie.mjs"

//**// UTILITY FUNCTIONS //**//
// Display bug report
function report() {
	// [REDACTED]
	// slideshow.setContent("Report");
	// slideshow.show();
}

// Show up once per page load, based on:
// https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples
function fetchQuotes() {
	let target = document.getElementById("wrapperMain_subheading");
	let content = "Bienvenue!"; // Placeholder text

	fetch("content/embed/quotes_fr.json")
	.then(function(response) {
		return response.json();
	})
	.then (function(data) {
		let index = utils.random(0, data.length);
		let author = data[index].author;
		if (author === null) 
			author = "D'auteur inconnu";

		content = `${data[index].text}<br/><span style="font-size:smaller;z-index:-1">&mdash; ${author}</span>`;
		target.innerHTML = content;
	});
}

// Letters stored in json format and parsed
// Generates HTML to display in slideshow
// We don't preload since it's a small document
function fetchLetters(audience) {
	fetch('content/embed/letters_fr.json')
	.then(response => response.json())
	.then(data => {
		// Initialize slideshow with no content
		slideshow.setContent("Empty");
	
		// Set slideshow content array
		let content = [];
		let counter = 0;
		for (let i = 0; i < Object.keys(data).length; i++) {
			// Only use letters that match the target audience
			if (data[i].audience == audience) {
				// Get letter author
				if (data[i].name == "")
					data[i].name = "Lettre anonyme";

				// Attempt to get title by parsing content string
				// Since there is no field for letter title...
				let title = data[i].content.split('\n', 1)[0];
				if (title.length > 50)
					title = data[i].content.split('...', 1)[0];
				if (title.length > 50)
					title = data[i].content.split('»', 1)[0];
				if (title.length > 50)
					title = data[i].content.split('.', 1)[0];
				let text = data[i].content;
				
				// Set letter content
				let letter = `<div class="slide slide${counter}" style="padding-left: 8%;padding-right:8%;text-align: justify;height:91%;margin-top: 5%;overflow: auto;hyphens: auto;background: white;width: 84%;"><span style="display: none;">Pour ${data[i].audience}</span><h2>${title}</h2>
				<h3><em>${data[i].name}</em></h3>
				<br/>
				<hr />
				<p style="white-space: pre-line">${text.slice((title.length)).trim()}</p></div>`;

				// Append slide directly to slideshow
				content.push(letter);
				counter++
			}
		}
		
		if (content.length === 0)
			throw new Error(`Could no find any letter for audience "${audience}".`);
		
		// Update slideshow items set and show
		if (!slideshow.settings.sets[audience])
			slideshow.settings.sets.push(
			new slideshow.ItemSet (audience, content, false, 0, "div"));
		slideshow.setContent(audience);
		slideshow.show();
	});
}






//**// SETUP PAGE LOAD //**//
window.addEventListener("load", function() {
	//**// DISPLAY SCRIPT ERRORS IN POPUP //**//
	window.addEventListener("error", function(err) {
		popup.show(
			"Looks like something went quite wrong.",
			`We detected an error on the platform: <br>Notice something strange? Help us by reporting!<br/><br/>
			<details style="font-family:monospace;"><summary>Show technical details</summary>
			Error at line <strong>${err.lineno}</strong>, column <strong>${err.colno}</strong> in <u>${err.filename.replace(/^.*[\\\/]/, '')}</u>: <br><span style="color:red;">${err.message}</span></details>`,
			"Report Bug",
			"Close",
			report,
			120000
		);
	});

	let headers = [ // Dynamic headings content
		"UNE MEILLEURE ÉCOLE",
		"UNE ÉDUCATION PLUS SENSÉE",
		"DES ÉLÈVES PLUS INTÈGRES",
		"UNE VIE PLUS ÉQUILIBRÉE",
		"UN PARCOURS PLUS AUDACIEUX",
		"UNE COMMUNICATION EFFICACE",
		"DES CITOYENS PLUS INFORMÉS",
		"UNE PENSÉE PLUS ALTRUISTE",
		"UN MONDE PLUS OUVERT D'ESPRIT",
		"DES CHERCHEURS AU QUOTIDIEN",
		"DES DÉCISIONS PLUS RÉFLÉCHIES",
		"UNE MEILLEURE ÉCOLE",
	];
	
	// Main header typewriter effect
	typewriter.set(
		document.getElementById("wrapperMain_heading"),
		headers, "POUR ", 50,	4000
	);
	
	// Main section parallax effect
	let targets = [
		new parallax.ParallaxTarget("#wrapperMain", 		 true, true, true, false, false),
		new parallax.ParallaxTarget("#wrapperMain_parallax", true, true, true, false, false),
	]; 
	parallax.set(utils.get("wrapperMain_gradient"), "mousemove", targets);
	
	// Display inspirational quotes on the main section
	fetchQuotes();
	
	// Set simple parallax for LT background
	parallax.setScroll(utils.get("wrapperIntro_graphic"), 750);
	
	// Setup slideshow system
	slideshow.setup(
		"#wrapperSlideshow", [
			new slideshow.ItemSet (
				"Report",
				["[REDACTED]"],
				true, 0, "iframe"
			),
			
			new slideshow.ItemSet (
				"Pedagogies", [
					"content/embed/pedagogies/pedagogy1.pdf",
					"content/embed/pedagogies/pedagogy2.pdf",
					"content/embed/pedagogies/pedagogy3.pdf",
					"content/embed/pedagogies/pedagogy4.pdf",
					"content/embed/pedagogies/pedagogy5.pdf"
				], true, 0, "embed"
			),
			
			new slideshow.ItemSet (
				"Schools", [
					"content/embed/schools/school1.pdf",
					"content/embed/schools/school2.pdf",
					"content/embed/schools/school3.pdf",
					"content/embed/schools/school4.pdf",
					"content/embed/schools/school5.pdf"
				], true, 0, "embed"
			),
			
			new slideshow.ItemSet (
				"Systems", [
					"content/embed/systems/system1.pdf",
					"content/embed/systems/system2.pdf",
					"content/embed/systems/system3.pdf",
					"content/embed/systems/system4.pdf",
					"content/embed/systems/system5.pdf"
				], true, 0, "embed"
			),
			
			new slideshow.ItemSet (
				"About", [
					"content/iframe/about.html",
				], true, 0, "iframe"
			),
			
			new slideshow.ItemSet (
				"Empty", [],
				 true, 0, "div"
			),
		],
	);
	
	// Add triggers for presentations
	utils.get("slideshow_pedagogies").addEventListener("click", function() {
		slideshow.setContent("Pedagogies");
		slideshow.show();
	});
	utils.get("slideshow_systems").addEventListener("click", function() {
		slideshow.setContent("Systems");
		slideshow.show();
	});
	utils.get("slideshow_schools").addEventListener("click", function() {
		slideshow.setContent("Schools");
		slideshow.show();
	});
	
	// Fetch open letters
	utils.get("slideshow_lettersStudents").addEventListener("click", function() {
		fetchLetters("Les élèves de l'école");
	});
	utils.get("slideshow_lettersPrincipal").addEventListener("click", function() {
		fetchLetters("La direction");
	});
	utils.get("slideshow_lettersTeachers").addEventListener("click", function() {
		fetchLetters("Le personnel enseignant");
	});	
	
	// Reveal main section once the page is loaded
	document.getElementById("wrapperMain_gradient").style.background = "linear-gradient(180deg, var(--background-primary) 0%, rgba(255, 255, 255, 0) 13.02%), linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, var(--background-primary) 100%)";
	
	// Display welcome popup
	if (cookie.get("isWelcomeShown") !== "true") {
		popup.show(
			"Politique des cookies",
			"Nous utilisons des cookies pour faire fonctionner ce site.",
			"", "D'accord!"
		);
		cookie.set("isWelcomeShown", "true");
	}
	
	popup.show(
		"Donnez-nous votre avis!",
		"Vous avez des suggestions? Faites-nous les parvenir!",
		"Nous écrire!", "Non merci!",
		report
	);
	
	// Suggestions
	utils.get("suggestions").addEventListener("click", report);
	
	// About us popup
	let aboutButton = document.querySelector(".footer")
		.contentWindow.document.querySelector("#footer_about");
		
	aboutButton.addEventListener("click", function() {
		slideshow.setContent("About");
		slideshow.show();
	});
});
