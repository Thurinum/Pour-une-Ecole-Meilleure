// Fetches open letters from letters.json
function getLetters(audience) {
	fetch('/content/embed/letters1.json')
	.then(response => response.json())
	.then(data => {
		// Parse letters
		setSlideshow("", "", "/content/embed/dummy", Object.keys(data).length.toString(), "text/plain", ".txt");

		document.querySelectorAll("embed").forEach(e => e.remove());

		for (let i = 0; i < Object.keys(data).length; i++) {
			// Is in right category?
			if (data[i].audience == audience) {
				// Set letter content
				if (data[i].name == "")
					data[i].name = "Lettre anonyme"

				// attmept to get title
				let title = data[i].content.split('\n', 1)[0];
				let content = data[i].content;
				console.log(content);
				let letter = `
				<h2>${data[i].name}</h2>
				<h3>Pour ${data[i].audience}</h3>
				<em>${title}</em><br/>
				<hr />
				<p style="white-space: pre-line">${content.slice((title.length)).trim()}</p>
				`;
				
				let slide = document.createElement("div");
				slide.setAttribute("class", "slide");
				slide.setAttribute("style", `
				padding: 8%;padding: 8%;text-align: justify;
				overflow: auto;hyphens: auto;
				background: white;height:75vh;
				`);
				slide.innerHTML = letter;
				document.getElementById("wrapperSlideshow").append(slide);
			}
		}
	});
}

document.getElementById("slideshow_lettersStudents").addEventListener("click", function() {
	getLetters("Les élèves de l'école");
});
document.getElementById("slideshow_lettersPrincipal").addEventListener("click", function() {
	getLetters("La direction");
});
document.getElementById("slideshow_lettersTeachers").addEventListener("click", function() {
	getLetters("Le personnel enseignant");
});
// TODO: add "everyone" section
