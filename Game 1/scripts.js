document.getElementById("startBTN").addEventListener("click", startGame);
// document.getElementById("startAgain").addEventListener("click", startGame);

function right_orientation() {
	if (window.innerHeight > window.innerWidth) {
		return false;
	} else { return true; }
};

var instructions = [
	"Hi! Young Astronaut! Hope you are doing well...",
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
];

//var instructions = Array(5).fill("Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.")

var questions = [
	{
		"Question": "How many moons does Jupiter have officially?",
		"Options": ["53", "79", "21", "47"],
		"Answer": 1
	},
	{
		"Question": "Which galaxy is home to the Solar system?",
		"Options": ["Andromeda", "Whirlpool", "Milky Way", "Sombreo"],
		"Answer": 3
	},
	{
		"Question": "What is the third brightest astronomical object in the sky?",
		"Options": ["Sun", "Venus", "Moon", "Jupiter"],
		"Answer": 2
	}
]

// var temp = 0;

// function typeWriter(ID, n, speed) {
// 	text = `${atInst}.&emsp;` + instructions[n-1]
// 	console.log(text)
// 	console.log(text.length)
// 	if (temp < text.length) {
// 		console.log(text.charAt(temp))
// 		document.getElementById(ID).innerHTML += text.charAt(temp);
// 		temp++;
// 		setTimeout(typeWriter(ID, n, speed), speed);
// 	}
// 	else{i=0}
// }


function typeWriter(ID, text, speed, at = 0){
	console.log(text)
	if(at < text.length){
	    document.getElementById(ID).innerHTML += text.charAt(at);
		setTimeout(()=>{typeWriter(ID, text, speed, at+1)}, speed)
    }
}


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
	console.log("Entered showInstructions")
	document.getElementById("instrctions").style.visibility = "visible";
	next();
	document.getElementById("next").addEventListener("click", next);
	document.getElementById("skip").addEventListener("click", game);
}

function next() {
	console.log("Entered next")
	atInst += 1;
	text = instructions[atInst - 1]
    typeWriter("text", text, 50, 0);
	// console.log(document.getElementById("text"));
	if (atInst > instructions.length) { game(); }
	console.log(atInst);
}

var atQ = 0;

function game() {
	document.getElementById("helpText").style.visibility = "hidden";
	document.getElementById("score").style.visibility = "visible";
	document.getElementById("prof").style.visibility = "hidden";
	document.getElementById("ship").style.animation = "descend 1s";
	setTimeout(() => {
		document.getElementById("ship").style.visibility = "hidden";
		document.getElementById("game").style.visibility = "visible";
		// document.getElementById("game").innerHTML = '<div class="asteroid"></div>\n<div class="spaceship"></div>';
		document.getElementById("game").innerHTML = '<img src="asteroid1.png" class="asteroid">\n<img src="spaceship.png" class="spaceship">';
	}, 900)
	console.log("questions.length", questions.length)
	ask(4500);
}

function ask(delay) {
	q = questions[atQ];
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
			if (selected()) { checkanswer(); }
		});
	}, delay)

}

function selected() {
	const rbs = document.querySelectorAll('input[name="choice"]');
	for (const rb of rbs) { if (rb.checked) { return true; } }
	return false;
};


function checkanswer() {
	q = questions[atQ];
	corr = q["Options"][q["Answer"] - 1]
	document.getElementById("score").innerHTML = `Score: ${10 * (atQ + 1)}`
	document.getElementById("questions").style.animation = "fade 0.5s";
	setTimeout(() => {
		document.getElementById("questions").style.visibility = "hidden";
		if (document.getElementById(corr).checked) {
			// document.getElementById("questionForm").innerHTML += "&emsp; Correct answer";
			console.log("Correct answer");
			dodge();
		}
		else {
			// document.getElementById("questionForm").innerHTML += "&emsp; Wrong answer";
			console.log("Wrong answer");
			collision();
		}
	}, 490)
};


function dodge() {
	// const asteroid = document.getElementsByClassName("asteroid")[0]
	// const spaceship = document.getElementsByClassName("spaceship")[0]
	document.getElementsByClassName("asteroid")[0].style.animation = "dodge_a 3s"
	if (atQ % 2) { document.getElementsByClassName("spaceship")[0].style.animation = "dodge_s_r 3s"; }
	else { document.getElementsByClassName("spaceship")[0].style.animation = "dodge_s_l 3s"; }
	setTimeout(() => {
		atQ += 1
		if (atQ < questions.length) {
			console.log("Restoring updown Animation");
			document.getElementsByClassName("spaceship")[0].style.animation = ""
			document.getElementsByClassName("asteroid")[0].style.animation = ""
			document.getElementsByClassName("spaceship")[0].style.animation = "updown 2s infinite linear;"
			document.getElementsByClassName("asteroid")[0].style.animation = "shake  0.5s infinite, asteroidComing 3s linear;"
			ask(5000);
		}
		else { CompleteGame(); }
	}, 3000);
};

function collision() {
	document.getElementsByClassName("asteroid")[0].style.animation = "2s cubic-bezier(0.79, 0.31, 1, 0.57) asteroid_c1, shake  0.5s 6";
	document.getElementById("game").innerHTML += '\n<img src="collision.png" id="collision">\n'
	document.getElementsByClassName("asteroid")[0].style.top = "20vh";
	setTimeout(() => { gameOver("Game Over") }, 2000);
};

function gameOver(s) {
	document.getElementById("game").innerHTML = "";
	document.getElementById("end").style.visibility = 'visible'
	document.getElementById("end").innerHTML = `<h1 id="endGame">${s}</h1>`
	document.getElementById("endGame").style.animation = "zoomIn2 2s"
	setTimeout(() => {
		document.getElementById("endGame").style.animation = ""
		document.getElementById("end").innerHTML += '\n<button id="startAgain">Play Again</button>'
		document.getElementById("startAgain").style.animation = "zoomIn2 2s"
		document.getElementById("startAgain").addEventListener("click", () => {
			console.log("Clicked!!");
			document.getElementById("end").style.visibility = 'hidden'
			atQ = 0;
			game();
		});
	}, 3000)
}

function CompleteGame() {
	// make spaceship move ahead, out of screen! here!
	document.getElementsByClassName("asteroid")[0].style.visibility = "hidden"
	document.getElementsByClassName("spaceship")[0].style.animation = ""
	document.getElementsByClassName("spaceship")[0].style.animation = "escape 2s"
	setTimeout(() => {
		document.getElementsByClassName("spaceship")[0].style.visibility = "hidden"
		gameOver("Thank You");
	}, 2000)
}