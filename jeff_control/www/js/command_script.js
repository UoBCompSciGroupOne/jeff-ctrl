/* ----- Arduino Communication ----- */

// Array to store commands.
var command_list = [];


// Adds move to page and to command list array.
function move(direction) {
	

	// Gets the duration of move.
	var timeList = document.getElementById('time');
	var duration = timeList.options[timeList.selectedIndex].value;

	// Changes new_list_item div to that specified by button press. Changes hidden attributes.
	var new_item = document.getElementById('new_div_space_inner').getElementsByClassName('list_item');
	var length = new_item.length;			// Should be 1. However this is not always the case (see below).

	for(var i=0; i < length; i++) {
		var new_item_display = new_item[i].getElementsByClassName('display_cmd');
		var new_item_cmd = new_item[i].getElementsByClassName('hidden_cmd');
		var new_item_amount = new_item[i].getElementsByClassName('hidden_amount');
	
		new_item_display[0].innerHTML = direction + '(' + duration + ');';
		new_item_cmd[0].innerHTML = direction;
		new_item_amount[0].innerHTML = duration;
	}	/* This loop is annoying but necessary. Dragging always creates a clone, and if the dragged object is not
		dropped into the list, it returns. This overlaps with previous, and so all must be changed on button click.
		It is a bug in the library code. There is likely a simple, cleaner alternative (deleting the dragged
		element if not dropped into list), but this works for now. */
	
	

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

	/* Reset previously stored array */
	command_list.length = 0;

	/* Create array from list */
	create_array();
	
	var command, duration;

	// Loops through list of commands.
	for (var i = 0; i < command_list.length; i++) {

		command = command_list[i][0];
		duration = command_list[i][1];

		handle_command(command, duration);

	};
}

// Creates array using ordered list of divs
function create_array() {
	
	var list = document.getElementById("command_list").getElementsByClassName("list_item");
	var command, amount;
	
	for(var i = 0; i < list.length; i++) {
		command = list[i].getElementsByClassName('hidden_cmd')[0].innerHTML;
		amount = list[i].getElementsByClassName('hidden_amount')[0].innerHTML;
		command_list.push([command, amount]);
	};
	
	/*	[--------------------------------  TEST  --------------------------------] 
		Alert array contents: */
	window.alert(command_list);
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
