// Slideshow.js - Generates slideshows to display embedded content
// (C) 2020 Maxime Gagnon. All rights reserved.

let IS_ANIM = false;
let FIRST_RUN = true;

// Generate all slideshows on a page
function iniSlideshows(flag) {
	let slideshows = document.getElementsByClassName("slideshow");
	let currentSlides = []; // Stores indices of current slides
	let maxSlides = [];

	// Changes a slide in a given direction
	// @param direction: "+" ()
	function changeSlide(direction, currentSlideshow) {
		if (IS_ANIM)
			return;
		IS_ANIM = true;
		let currentIndex = currentSlides[currentSlideshow];
		console.log("Current index:", currentIndex)
		// console.log(slideshows[currentSlideshow]
						// .getElementsByClassName("slide"))
		let currentSlide = slideshows[currentSlideshow]
						.getElementsByClassName("slide")[currentIndex];

		if (direction === "-") {
			currentIndex--;
		} else if (direction === "+") {
			currentIndex++;
		}

		if (currentIndex <= 0) {
			currentIndex = 4
		} else if (currentIndex >= maxSlides[currentSlideshow]) {
			currentIndex = 0
		}

		currentSlides[currentSlideshow] = currentIndex;
		console.log("Current index2:", currentIndex)
		console.log(slideshows[currentSlideshow].querySelectorAll(".slide"))
		let newSlide = slideshows[currentSlideshow].getElementsByClassName("slide")[currentIndex];

		newSlide.style.transition = `none`;
		newSlide.style.opacity = `0`;
		newSlide.style.transform = `translate(${parseInt(direction + "100")}%)`;
		newSlide.style.display = "block";
		newSlide.style.transition = `transform 1s cubic-bezier(.68,-0.55,.27,1.55), opacity 1s cubic-bezier(.68,-0.55,.27,1.55)`;

		// Give time to the transition to update ?
		setTimeout(function() {
			newSlide.style.transform = `translate(0)`;
			newSlide.style.opacity = `1`;
		}, 25);
		
		currentSlide.style.transform = `translate(${-parseInt(direction + "100")}%)`;
		setTimeout(function() {
			currentSlide.style.display = "none";
			IS_ANIM = false;
		}, 1000);
	}

	for (let i = 0; i < slideshows.length; i++) {
		// Get custom attributes on <div class="slideshow">[i]
		let slidesCount = slideshows[i].getAttribute("slides");
		let path = slideshows[i].getAttribute("src");
		let mimeType = slideshows[i].getAttribute("type");
		let extension = slideshows[i].getAttribute("extension");

		currentSlides[i] = 0;
		maxSlides[i] = slidesCount;

		if (!flag) {
			for (let a = 1; a <= slidesCount; a++) {
			let embed = document.createElement("embed");
			embed.setAttribute("class", "slide");
			embed.setAttribute("src", path + a + extension);
			// embed.setAttribute("type", mimeType);
			embed.setAttribute("width", "100%");
			embed.setAttribute("height", "100%");

			// Only show the first slide
			if (a === 1) {
				embed.style.display = "block";
			}

			slideshows[i].append(embed);
		}
		}
		

		// Buttons to change slide
		let buttonLeft = slideshows[i].getElementsByClassName("slideshow_arrow_left")[0];
		let buttonRight = slideshows[i].getElementsByClassName("slideshow_arrow_right")[0];
		let buttonClose = slideshows[i].getElementsByClassName("slideshow_close")[0];

		if (buttonLeft && buttonRight) {
			buttonLeft.addEventListener("click", function() {
			changeSlide("-", i);
			});
			buttonRight.addEventListener("click", function() {
				changeSlide("+", i);
			});

			buttonLeft.style.transform = "translate(0, -50%) scale(1)";
			buttonRight.style.transform = "translate(0, -50%) scale(1)";
		}
		
		buttonClose.addEventListener("click", function() {
			slideshows[i].style.transform = "translate(-50%, -50%) scale(0.9)";
			slideshows[i].style.opacity = "0";

			setTimeout(function() {
				slideshows[i].style.display = "none";
			}, 500);
		});
	}
};

// SET SLIDESHOW DATA
// ==================
// Attempts to set a slideshow's data
function setSlideshow(trigger, event, src, slides, type, ext, flag) {
	function configSlideshow() {
		let wrapper = document.getElementById("wrapperSlideshow");
		wrapper.innerHTML = `<span class="slideshow_close">X</span><span class="slideshow_resize">&#8690;
</span>`;
		if (slides > 1) {
			wrapper.innerHTML += `<span class="slideshow_arrow slideshow_arrow_left">&lt;</span>
			<span class="slideshow_arrow slideshow_arrow_right">&gt;</span>
			`;
		}
		// throw "Your mom gay";
		wrapper.setAttribute("slides", slides);
		if (type) {
			wrapper.setAttribute("type", type);
		}
		if (ext) {
			wrapper.setAttribute("extension", ext);
		}
		wrapper.setAttribute("src", src);
		wrapper.style.display = "block";
		wrapper.style.opacity = "1";
		wrapper.style.transform = "translate(-50%, -50%) scale(1.0)";

		iniSlideshows(flag);
	}
	
	if (document.getElementById(trigger))
		document.getElementById(trigger).addEventListener(event, configSlideshow)
	else
		configSlideshow()
}
