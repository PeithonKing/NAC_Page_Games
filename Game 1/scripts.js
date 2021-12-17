document.getElementById("startBTN").addEventListener("click", startGame);


var instructions = [
	"1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
	"2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
	"3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
	"4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolores.",
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
	console.log("Clicked on start");
    document.getElementById("startgame").style.visibility = "hidden";
	setTimeout(showInstructions, 100)
}
	
var atInst = 0; // defines the instruction levels completed
	
function showInstructions(){
	document.getElementById("instrctions").style.visibility = "visible";
	next();
	document.getElementById("next").addEventListener("click", next);
	document.getElementById("skip").addEventListener("click", game);
}


function next(){
	document.getElementById("text").innerHTML = instructions[atInst]
	atInst += 1;
	console.log(atInst);
	if(atInst>instructions.length){
		setTimeout(game, 100);
	}
}

function game(){
	document.getElementById("helpText").style.visibility = "hidden";
	document.getElementById("prof").style.visibility = "hidden";
	document.getElementById("ship").style.transform = "translateY(65vh)";
	document.getElementById("ship").style.visibility = "hidden";
	setTimeout(() => {
		document.getElementById("game").style.visibility = "visible";
		document.getElementById("game").innerHTML = '<div class="spaceship"></div><div class="asteroid"></div>';
    }, 1000)
}