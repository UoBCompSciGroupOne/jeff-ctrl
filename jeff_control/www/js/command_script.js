/* ----- Arduino Communication ----- */

// Array to store commands.
var command_list = [];


// Adds move to page and to command list array.
function move(direction) {

	// Gets the duration of move, and adds move to array.
	var timeList = document.getElementById('time');
	var duration = timeList.options[timeList.selectedIndex].value;
	command_list.push([direction, duration]);

	// Adds move to list on page.
	var new_item = document.createElement('div');
	new_item.innerHTML = direction + '(' + duration + ');';
	var list = document.getElementById('commands');
	list.appendChild(new_item);

}


// Performs a specific command.
function handle_command (command, duration) {

	var code = '';

	// Sets url to send to arduino.
	switch (command) {

		case 'forward':
			code = '/arduino/fwd/';
			break;
		case 'backward':
			code = '/arduino/bwd/';
			break;
		case 'left':
			code = '/arduino/lft/';
			break;
		case 'right':
			code = '/arduino/rgt/';
			break;
		default:
			$('#message').html('Incorrect command.');

	}

	// Sends command to arduino.
	$.ajax({
		url: code + duration,
		async: false,
		success:
			function (result) { $('#message').html(result); }
	});

}


// Sends the commands to the arduino.
function run_commands() {

	var command, duration;

	// Loops through list of commands.
	for (var i = 0; i < command_list.length; i++) {

		command = command_list[i][0];
		duration = command_list[i][1];

		handle_command(command, duration);

	};

}


// Lists commands stored in array.
function list_commands() {

	var test = document.getElementById('array');
	for (var i = 0; i < command_list.length; i++) {
		test.innerHTML = test.innerHTML + command_list[i] + '<br>';
	};
	
}


/* ----- Page Styling ----- */

// Swaps the control tab.
function activate_tab(tab) {

	// Activates tab for functions.
	if (tab == 'functions_tab') {

		$('#control_constants').css('display', 'none');
		$('#constants_tab').css('background', '#106060');
		$('#control_loops').css('display', 'none');
		$('#loops_tab').css('background', '#106060');
		$('#control_functions').css('display', 'initial');
		$('#functions_tab').css('background', '#339999');

	// Activates tab for constants.
	} else if (tab == 'constants_tab') {

		$('#control_constants').css('display', 'initial');
		$('#constants_tab').css('background', '#339999');
		$('#control_loops').css('display', 'none');
		$('#loops_tab').css('background', '#106060');
		$('#control_functions').css('display', 'none');
		$('#functions_tab').css('background', '#106060');

	// Activates tab for loops.
	} else if (tab == 'loops_tab') {

		$('#control_constants').css('display', 'none');
		$('#constants_tab').css('background', '#106060');
		$('#control_loops').css('display', 'initial');
		$('#loops_tab').css('background', '#339999');
		$('#control_functions').css('display', 'none');
		$('#functions_tab').css('background', '#106060');

	}

}
