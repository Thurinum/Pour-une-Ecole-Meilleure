"use strict";

/////////////////////////////////////
// COPYLEFT 🄯 2020.               //
// Misceallenous utility functions //
/////////////////////////////////////


// Get element by id... xd
function get(id) {
	return document.getElementById(id);
}

// Normalize values between 0 and 1
function normalize(x, min, max) {
	return (x - min) / (max - min);
}

// Get random integer between min and max
// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Convert value to percentage (broken)
function toPercent(x, max) {
	return x * 100 / max;
}

export { get, normalize, random, toPercent };
