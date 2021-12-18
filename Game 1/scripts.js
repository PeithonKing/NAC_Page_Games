document.getElementById("startBTN").addEventListener("click", startGame);

function right_orientation(){
	if (window.innerHeight > window.innerWidth) {
		return false;
	} else {return true;}
};

var instructions = [
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
]

var questions = [
	{
		"Q": "Question1: This is some random Question1? (Correct = 2)",
		"options": ["Option1", "Option2", "Option3", "Option4"],
		"answer": 2
	},
	{
		"Q": "Question2: This is some random Question2? (Correct = 1)",
		"options": ["Option1", "Option2", "Option3", "Option4"],
		"answer": 1
	},
	{
		"Q": "Question3: This is some random Question3? (Correct = 3)",
		"options": ["Option1", "Option2", "Option3", "Option4"],
		"answer": 3
	}
]

function startGame() {
	if(right_orientation()){
		// console.log("Clicked on start");
		document.getElementById("startgame").style.visibility = "hidden";
		setTimeout(showInstructions, 100)
	}
	else{
		console.log("Change to Landscape")
		document.getElementById("startgameH").style.animation = "shake 0.25s infinite";
		setTimeout(() => {
			document.getElementById("startgameH").style.animation = "";
		}, 250)
	}
}
	
var atInst = 0; // defines the instruction levels completed
function showInstructions(){
	document.getElementById("instrctions").style.visibility = "visible";
	next();
	document.getElementById("next").addEventListener("click", next);
	document.getElementById("skip").addEventListener("click", game);
}

function next(){
	atInst += 1;
	document.getElementById("text").innerHTML = `<p>Instructions:</p><p>${atInst}.&emsp;` + instructions[atInst-1] + "</p>"
	if(atInst>instructions.length){game();}
	console.log(atInst);
}

function game(){ask("Hi!");}

function ask(q){
	document.getElementById("helpText").style.visibility = "hidden";
	document.getElementById("prof").style.visibility = "hidden";
	document.getElementById("ship").style.animation = "descend 1s";
	setTimeout(() => {
		document.getElementById("ship").style.visibility = "hidden";
		document.getElementById("game").style.visibility = "visible";
		document.getElementById("game").innerHTML = '<div class="spaceship"></div><div class="asteroid"></div>';
    }, 1000)
}

