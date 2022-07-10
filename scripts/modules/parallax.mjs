"use strict";

//////////////////////////////////////
// COPYLEFT 🄯 2020. MAXIME GAGNON.  //
// Background parallax solution     //
//////////////////////////////////////


import * as utils from "./utils.mjs"

// Used to instantiate parallax elements
class ParallaxTarget {
	constructor(
		element,		// The element itself. Element.
		background,		// Should the element animate its background-position?
		x,				// Should the element move along the X axis? Bool.
		y,				// Should the element move along the Y axis? Bool.
		invert,			// Should the element flow inversely to its axis? Bool.
		rotate,			// Should the element use CSS rotate transform? Bool.
	) {
		this.element = element;
		this.background = background;
		this.x = x;
		this.y = y;
		this.invert = invert;
		this.rotate = rotate;
	}
}

// Set customizable parallax anim
function set (
	trigger,		// Parallax-triggering element (e.g. overlay div). Element.
	event,			// Event attached to above (default: mousemove). String.
	targets,		// Target elements. Array of <ParallaxTarget>.
) {	
	// Obtain original transforms of each element so they can be taken into account
	for (let i = 0; i < targets.length; i++) {
		let target = targets[i];
		let elem = document.querySelector(target.element);
		
		// Retrieve original transforms as base offset for the element
		if (target.background) {
			target.baseX = parseFloat(
				getComputedStyle(elem).backgroundPositionX.slice(0, -2)) * 10;
			target.baseY = parseFloat(
				getComputedStyle(elem).backgroundPositionY.slice(0, -2)) * 10;
		} else {
			// Allow parallax effect to depend upon the parent element's width
			let marginTop = utils.toPercent(
				parseFloat(getComputedStyle(elem).marginTop.slice(0, -2)), elem.parentElement.offsetHeight);
				
			target.baseX = utils.toPercent(
				elem.offsetLeft, elem.parentElement.offsetWidth) * 2;
			target.baseY = utils.toPercent(
				elem.offsetTop, elem.parentElement.offsetHeight) - marginTop;
		}
	}
	
	// Apply parallax to trigger
	trigger.addEventListener(event, function(e) {
		// Update parallax, iterating through targets
		for (let i = 0; i < targets.length; i++) {
			let target = targets[i];
			let element = document.querySelector(target.element);
			
			// Set parallax offset based on direction (in percent)
			let sign; target.invert ? sign = -1 : sign = 1;
			
			// Retrieve, normalize, and convert mouse pos to percent
			// Then transform element based on chosen axes
			function getOffset(axis, size) { // Axis must be upper case
				let val = e["page" + axis] - rect[size] / 2;
				let n = utils.normalize(val, 0, rect[size]);
				
				let per;
				target[axis.toLowerCase()] ? 
				per =  utils.toPercent(n * 100, rect[size]) :
				per = 0;
				
				return per;
			}
			
			let rect = e.target.getBoundingClientRect();
			let per_x = getOffset("X", "width");
			let per_y = getOffset("Y", "height");

			// Apply transform to element
			if (target.background) {
				element.style.backgroundPositionX = `${sign * per_x + target.baseX}%`;
				element.style.backgroundPositionY = `${sign * per_y + target.baseY}%`;
			} else {
				element.style.left = `${sign * per_x + target.baseX}%`;
				element.style.top = `${sign * per_y + target.baseY}%`;
			}
		}
	})
}

// Simple on window scroll parallax effect
function setScroll(target, offset) {
	window.addEventListener("scroll", function() {
		let maxScroll = document.documentElement.scrollHeight;
		let per = utils.toPercent(window.scrollY, offset);
		target.style.right = per + "px";
	});
}

export { ParallaxTarget, set, setScroll }
