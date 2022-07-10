// Copyleft 🄯 2020 Maxime Gagnon.

// Main heading "typewriter" animation config
// Globals were used for simplicity, they won't bite today
// =======================================================
const ANIM_TARGET = document.getElementById("wrapperMain_heading");
const ANIM_DURATION_LETTER = 50;   // How long for each letter to "be typed"?
const ANIM_DURATION_PHRASE = 4000; // How long before switching to another phrase?
const ANIM_BASE_CONTENT = "POUR "; // Base content (always stays the same)
const ANIM_CONTENT = [			   // Dynamic headings content
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
let shouldAnimate = true;          // Disable animation when window not in focus


// MAIN HEADING ANIMATION
// ======================
// Set heading content with typewriter-like anim
function setMainHeading(content, speed) {
	// Don't show a new heading when window is out of focus
	// Prevents a bug where headings overwrite themselves
	if (!shouldAnimate)
		return;

	// SET NEXT CHARACTER
	// Appends the next char to the heading from ANIM_CONTENT
	function setNextChar() {
		if (n >= content.length) {
			// Fade heading before content change
			// Only fade when window is in focus
			// So that text stays visible when not in focus
			if (shouldAnimate) {
				setTimeout(function() {
					ANIM_TARGET.style.transform = "scale(1.1)";
					ANIM_TARGET.style.opacity = "0";
				}, ANIM_DURATION_PHRASE - 2000);
			}

			clearInterval(interval);
			return;
		} else {
			ANIM_TARGET.innerHTML += content.charAt(n);
			n++;
		}
	}

	let n = 0;
	let interval;

	ANIM_TARGET.innerHTML = ANIM_BASE_CONTENT;
	ANIM_TARGET.style.transform = "scale(1)";
	ANIM_TARGET.style.opacity = "1";

	interval = setInterval(setNextChar, speed);
}

window.addEventListener("load", function() {
	let i = 0;

	// Get vh, ensuring browser support
	let viewportHeight = Math.max(
		document.documentElement.clientHeight || 0,
		window.innerHeight || 0
	);

	// Run once first
	setMainHeading("UNE MEILLEURE ÉCOLE", ANIM_DURATION_LETTER);

	// Then run every X seconds
	setInterval(function() {
		// Only run animation if heading is visible (scroll pos)
		if ((window.pageYOffset || document.documentElement.scrollTop) <= viewportHeight) {
			if (i >= ANIM_CONTENT.length) i = 0;
			setMainHeading(ANIM_CONTENT[i], ANIM_DURATION_LETTER);
			i++;	
		}
	}, ANIM_DURATION_PHRASE);

	// We set the main gradient here!
	document.getElementById("wrapperMain_gradient").style.background = "linear-gradient(180deg, var(--theme-background-primary) 0%, rgba(255, 255, 255, 0) 13.02%), linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, var(--theme-background-primary) 100%)";
});


// HELPER FUNCTIONS FOR BELOW
// ==========================
// Normalize values between 0 and 1
function normalize(x, min, max) {
	return (x - min) / (max - min);
}

// Get random integer between min and max
// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Convert value to percentage
function toPercent(x, max) {
	return x * max / 100;
}

// INTro PARALLAX
// ================
// Parallax
window.addEventListener("scroll", function(e) {
	let item = document.getElementById("wrapperIntro_graphic");
	let maxScroll = document.documentElement.scrollHeight;
	let per = toPercent(window.scrollY, 10);
	item.style.right = per + "px";
});

// BACKGROUND PARALLAX ANIMATION
// =============================
// We use the gradient for the event since it's the topmost element
document.getElementById("wrapperMain_gradient").addEventListener("mousemove", function(e) {
	// Targets
	let foreground = document.getElementById("wrapperMain_parallax");
	let background = document.getElementById("wrapperMain");
	let heading = document.getElementById("wrapperMain_heading");
	let subheading = document.getElementById("wrapperMain_subheading");
	
	// Retrieve, normalize, and convert mouse pos to %
	let rect = e.target.getBoundingClientRect();
	let x = e.pageX - rect.width / 2;
	let n = normalize(x, 0, rect.width);
	let per = toPercent(n, rect.width);

	// Fg and bg offset in opposite directions
	foreground.style.backgroundPositionX = `${per + 50}%`;
	background.style.backgroundPositionX = `${per - 50}%`;

	// Don't enable 3D rotation on large viewports
	// This effect currently looks best with small widths
	subheading.style.transform = ""; // Remove previous transforms
	if (document.body.clientWidth <= 1500) {
		foreground.style.transform = `rotateY(${2 * per}deg)`;
		subheading.style.transform = `rotateY(${2 * per}deg)`;
	}
// check for is there
	heading.style.marginLeft = `${-(2 * per)}%`; // style.transform already animated
	subheading.style.transform += `translate(${-per}%)`;
}, {passive: false}); // *May* fix a bug with layout

// Stop animating once window is out of focus
// Prevents headings from overwriting each other
window.addEventListener("blur", function() {
	shouldAnimate = false;
});

// Resume animating once focus is restored
window.addEventListener("focus", function() {
	shouldAnimate = true;
});

// MAIN PAGE QUOTES
// ================
// Show up once per page load, based on:
// https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples
window.addEventListener("load", function() {
	let target = document.getElementById("wrapperMain_subheading");
	let content = "Bienvenue!"; // Placeholder text

	fetch("https://type.fit/api/quotes")
	.then(function(response) {
		return response.json();
	})
	.then (function(data) {
		let index = random(0, data.length);
		let author = data[index].author;
		if (author === null) 
			author = "Some random guy";

		content = `${data[index].text}<br/><span style="font-size:smaller;z-index:-1">&mdash; ${author}</span>`;
		target.innerHTML = content;
	});
});
