"use strict";

///////////////////////////////////////////////////
// COPYLEFT 🄯 2020 MAXIME GAGNON.               //
// Set element content with typewriter-like anim //
///////////////////////////////////////////////////


let shouldAnimate = true;

function typewriter(target, content, base, speed, duration) {
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
					target.style.transform = "scale(1.1)";
					target.style.opacity = "0";
				}, duration - 2000);
			}

			clearInterval(interval);
			return;
		} else {
			target.innerHTML += content.charAt(n);
			n++;
		}
	}

	let n = 0;
	let interval;

	target.innerHTML = base;
	target.style.transform = "scale(1)";
	target.style.opacity = "1";

	interval = setInterval(setNextChar, speed);
}

function set(target, content, base, speed, duration) {
	let i = 0;
	
	// Get vh, ensuring browser support
	let viewportHeight = Math.max(
		document.documentElement.clientHeight || 0,
		window.innerHeight || 0
	);
	
	typewriter(target, content[0], base, speed, duration);
	
	setInterval(function() {
		// Only run animation if heading is visible (scroll pos)
		if ((window.pageYOffset || document.documentElement.scrollTop) <= viewportHeight) {
			if (i >= content.length) 
				i = 0;
				
			typewriter(target, content[i], base, speed, duration);
			i++;	
		}
	}, duration);
	
	// Stop animating once window is out of focus
	// Prevents headings from overwriting each other
	window.addEventListener("blur", function() {
		shouldAnimate = false;
	});

	// Resume animating once focus is restored
	window.addEventListener("focus", function() {
		shouldAnimate = true;
	});
}

export { set };
