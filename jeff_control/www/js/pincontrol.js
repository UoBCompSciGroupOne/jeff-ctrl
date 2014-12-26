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
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/lft/' + secs);
}

function right() {
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/rgt/' + secs);
}
