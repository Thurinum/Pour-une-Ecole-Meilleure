////////////////////////
// COPYLEFT 🄯 2020.   //
// Get or set cookies //
////////////////////////

let cache = {};
let isCached = false;

// Split the cookie string into an object
function updateCache() {
	if (!isCached) {
		let properties = document.cookie.split(";");
		for (let i = 0; i < properties.length; i++) {
			let pair = properties[i].split("=");
			cache[pair[0]] = pair[1];
		}
		isCached = true;
	}
}

// Set a cookie
function set(key, value) {	
	if (cache[key] === value)
		return; // already sey
		
	cache[key] = value;
	document.cookie = `${key}=${value};`;
}

// Get a cookie
function get(key) {
	updateCache();
	return cache[key];
}

// Clear all cookies
function clear() {
	// TODO
}

export { set, get, clear };
