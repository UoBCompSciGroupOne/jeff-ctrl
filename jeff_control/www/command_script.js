var command_list = [];

function forward() {
	var secList = document.getElementById('time');
	var secs = secList.options[secList.selectedIndex].value;
	command_list.push(["forward", secs]);

	var new_item = document.createElement('div');
	new_item.innerHTML = 'forward(' + secs + ');';
	var list = document.getElementById('commands');
	list.appendChild(new_item);
}

function list_commands() {
	var test = document.getElementById('test');
	for (var i = 0; i < command_list.length; i++) {
		test.innerHTML = test.innerHTML + command_list[i] + '<br>';
	};
}