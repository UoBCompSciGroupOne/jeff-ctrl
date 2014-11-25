function forward() {
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/fwd/' + secs);
};

function left() {
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/lft/' + deg);
}

function right() {
	var secList = document.getElementById("time");
	var secs = secList.options[secList.selectedIndex].value;
	$('#message').load('/arduino/rgt/' + deg);
}
