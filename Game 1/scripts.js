document.getElementById("startBTN").addEventListener("click", startGame);

function right_orientation() {
	if (window.innerHeight > window.innerWidth) {
		return false;
	} else { return true; }
};

// var instructions = [
// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
// ];

var instructions = Array(5).fill("Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.")

var questions = [
	{
		"Question": "Question1: This is some random Question1? (Correct = 2)",
		"Options": ["Option1", "Option2", "Option3", "Option4"],
		"Answer": 2
	},
	{
		"Question": "Question2: This is some random Question2? (Correct = 1)",
		"Options": ["Option1", "Option2", "Option3", "Option4"],
		"Answer": 1
	},
	{
		"Question": "Question3: This is some random Question3? (Correct = 3)",
		"Options": ["Option1", "Option2", "Option3", "Option4"],
		"Answer": 3
	}
]

function startGame() {
	if (right_orientation()) {
		// console.log("Clicked on start");
		document.getElementById("startgame").style.visibility = "hidden";
		setTimeout(showInstructions, 100)
	}
	else {
		console.log("Change to Landscape")
		document.getElementById("startgameH").style.animation = "shake 0.25s infinite";
		setTimeout(() => {
			document.getElementById("startgameH").style.animation = "";
		}, 250)
	}
}

var atInst = 0; // defines the instruction levels completed
function showInstructions() {
	document.getElementById("instrctions").style.visibility = "visible";
	next();
	document.getElementById("next").addEventListener("click", next);
	document.getElementById("skip").addEventListener("click", game);
}

function next() {
	atInst += 1;
	document.getElementById("text").innerHTML = `<p>Instructions:</p><p>${atInst}.&emsp;` + instructions[atInst - 1] + "</p>"
	if (atInst > instructions.length) { game(); }
	console.log(atInst);
}

var atQ = 0;

function game() {
	document.getElementById("helpText").style.visibility = "hidden";
	document.getElementById("prof").style.visibility = "hidden";
	document.getElementById("ship").style.animation = "descend 1s";
	setTimeout(() => {
		document.getElementById("ship").style.visibility = "hidden";
		document.getElementById("game").style.visibility = "visible";
		document.getElementById("game").innerHTML = '<div class="asteroid"></div><div class="spaceship"></div>';
	}, 900)
	console.log("questions.length", questions.length)
	ask(questions[0]);
	ask(questions[1]);
	ask(questions[2]);

}

function ask(q) {
	document.getElementById("Q").innerHTML = `<h1>${q["Question"]}</h1>`;
	console.log(q["Question"]);
	o = `\n<div class="grid-container">\n`
	q["Options"].forEach(function (opt) {
		o += `<div><input type="radio" name="choice" value="${opt}" id="${opt}" required>\n`
		o += `<label for="${opt}">${opt}</label></div>\n\n`
	});
	o += `</div><input type="submit" value="Submit" id="submitbutton">`
	document.getElementById("questionForm").innerHTML = o;
	setTimeout(() => {
		document.getElementById("questions").style.visibility = "visible";
		document.getElementById("questions").style.animation = "zoomIn 0.5s";
		document.getElementById("submitbutton").addEventListener("click", () => {
			if(selected()){checkanswer(q);}
		});
    }, 4500)

}


// Write this function in detail
function checkanswer(q) {
	corr = q["Options"][q["Answer"] - 1]
	document.getElementById("questions").style.animation = "zoomOut 0.5s";
	setTimeout(() => {
		document.getElementById("questions").style.visibility = "hidden";
		if (document.getElementById(corr).checked) {
			// document.getElementById("questionForm").innerHTML += "&emsp; Correct answer";
			console.log("Correct answer");
		}
		else {
			// document.getElementById("questionForm").innerHTML += "&emsp; Wrong answer";
			console.log("Wrong answer");
		}
	}, 500)
};



function selected(){
	// console.log("Submited Before Answering!")
	const rbs = document.querySelectorAll('input[name="choice"]');
	for(const rb of rbs){if(rb.checked){return true;}}
	return false;
};