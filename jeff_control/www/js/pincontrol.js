// Handles communication with the Arduino for the live control page.

// Moves the robot forward.
function forward() {
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/fwd/' + secs);
};


// Moves the robot backward.
function backward() {
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/bwd/' + secs);
};


// Moves the robot left.
function left() {
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/lft/' + secs);
};


// Moves the robot right.
function right() {
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/rgt/' + secs);
};
