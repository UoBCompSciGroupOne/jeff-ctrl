function forward() {
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/fwd/' + secs);
};

function backward() {
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/bwd/' + secs);
};

function left() {
	var degList = document.getElementById("time");
	var deg = degList.options[degList.selectedIndex].value;
	$('#message').load('/arduino/lft/' + deg);
}

function right() {
	var degList = document.getElementById("time");
	var deg = degList.options[degList.selectedIndex].value;
	$('#message').load('/arduino/rgt/' + deg);
}
