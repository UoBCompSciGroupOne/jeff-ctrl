/* ----- Arduino Communication ----- */

// Array to store commands.
var command_list = [];


// Allow input of number for a command
function add_varnum(button) {

	// Activates number input
	if (button == 'forward' || button == 'left' || button == 'right' || button == 'backward') {
		document.getElementById('time_select').className = "number_input_active";
		document.getElementById('loop_number_select').className = "number_input_inactive";
	}
	else if (button == 'for') {
		document.getElementById('time_select').className = "number_input_inactive";
		document.getElementById('loop_number_select').className = "number_input_active";
	}

   	// Deactivates any active button
	var active = document.getElementsByClassName('button_active');
	for( var i = 0; i < active.length; i++) {
		active[i].className = "button_inactive";
	}
   
   	// Activates button clicked
	if (button == 'forward') {
		document.getElementById('forward_button').className = "button_active";
	}
	else if (button == 'left') {
		document.getElementById('left_button').className = "button_active";
	}
	else if (button == 'right') {
		document.getElementById('right_button').className = "button_active";
	}
	else if (button == 'backward') {
		document.getElementById('backward_button').className = "button_active";
	}
	else if (button == 'for') {
		document.getElementById('for_button').className = "button_active";
	}

}


// Gets information on new line instruction (command, amount).
function add_div() {

	var amount = document.getElementsByClassName('number_input_active')[0].getElementsByClassName('div_amt')[0].value;
	var command_raw = document.getElementsByClassName('button_active');
	var command;

	/* Safari is incompatible with HTML5 form validation. This line to ensure entry of a valid number. */
	if(amount == "" || amount < 0 || amount > 100) {
		return false;
	}

	switch (command_raw[0].id) {

		case "forward_button":
			command = "forward";
			break;
		case "backward_button":
			command = "backward";
			break;
		case "left_button":
			command = "left";
			break;
		case "right_button":
			command = "right";
			break;
		case "for_button":
			// Safari is incompatible with HTML5 form validation. This line to ensure integer > 2 input for # loops.
			if(amount % 1 != 0 || amount < 2) {
				return false;
			}
			command = "for";
			break;

		default:
			window.alert("Cannot find command type?");

	}

	move(command, amount);

   	// Prevent page refresh.
	return false;
	
}


// Adds the move to the page, and to the command list array.
function move(command, amount) {

	// Changes new_list_item div to that specified by button press. Changes hidden attributes.
	var new_item = document.getElementById('new_div_space_inner').getElementsByClassName('list_item');
	var length = new_item.length;			// Should be 1. However this is not always the case (see below).
	var new_item_display, new_item_cmd, new_item_amount, loop_contents, loop_end;

	// Handles bug in Sortable where clones are created as a result of the drag and drop functionality.
	for(var i = 0; i < length; i++) {

		new_item_display = new_item[i].getElementsByClassName('display_cmd');
		new_item_cmd = new_item[i].getElementsByClassName('hidden_cmd');
		new_item_amount = new_item[i].getElementsByClassName('hidden_amount');

		if (command == 'forward' || command == 'backward' || command == 'left' || command == 'right') {

			loop_contents = new_item[i].getElementsByClassName('loop_contents_active');
			loop_end = new_item[i].getElementsByClassName('loop_end_active');

			new_item_display[0].innerHTML = command + '(' + amount + ');';
			new_item_cmd[0].innerHTML = command;
			new_item_amount[0].innerHTML = amount;

			if(loop_end.length) {         // also loop_contents
				loop_contents[0].className = 'loop_contents_inactive';
				loop_end[0].className = 'loop_end_inactive';
			}

		} else if(command == 'for') {

			loop_contents = new_item[i].getElementsByClassName('loop_contents_inactive');
			loop_end = new_item[i].getElementsByClassName('loop_end_inactive');

			new_item_display[0].innerHTML = 'loop from 1 to ' + amount + ':';
			new_item_cmd[0].innerHTML = command;
			new_item_amount[0].innerHTML = amount;

			if(loop_end.length) {       // also loop_contents
				loop_contents[0].className = 'loop_contents_active';
				loop_end[0].className = 'loop_end_active';
			}

		}
	}	/* These loops is annoying but necessary. Dragging always creates a clone, and if the dragged object is not
		dropped into the list, it returns. This overlaps with previous, and so all must be changed on button click. */

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

	// Resets previously stored array.
	command_list.length = 0;

	// Create array from list.
	var list = document.getElementById("command_list").getElementsByClassName("list_item");
	var length = list.length;

	// List of divs; Start position; End position (for recursive).
	create_array(list, 0, length);

	var command, duration;

	// Loops through list of commands.
	for (var i = 0; i < command_list.length; i++) {

		command = command_list[i][0];
		duration = command_list[i][1];

		// Sends command.
		handle_command(command, duration);

	}
}


// Creates array using ordered list of divs from page.
function create_array(list, start, end) {
	
	var command, amount;
	
	// Loops through command divs.
	for(var i = start; i < end; i++) {

		// Gets information about command.
		command = list[i].getElementsByClassName('hidden_cmd')[0].innerHTML;
		amount = list[i].getElementsByClassName('hidden_amount')[0].innerHTML;

		// Handles the case of a for-loop command.
		if(command == "for") {

			// Gets information about for loop.
			loop_content = list[i].getElementsByClassName("list_item");
			var length = loop_content.length;

			// Recursive for loops
			for(var j = 0; j < amount; j++) {
				create_array(list, i + 1, i + length + 1);
			}

			// Updates loop index.
			i = i + length;

		// Handles the case of a standard move command.
		} else {
			command_list.push([command, amount]);
		}

	};
	
}


// Adds a for loop to the array.
function create_array_loop(list, start, amount) {

	// Gets information about loop contents.
	loop_content = list[start].getElementsByClassName("list_item");
	var length = loop_content.length;
	var num_loops = list[start].getElementsByClassName('hidden_amount')[0].innerHTML;
   
   	// Adds contents of loop to command list.
	for(var j = 0; j < num_loops; j++) {
		for(var k = 0; k < length; k++) {
			command = list[k+start+1].getElementsByClassName('hidden_cmd')[0].innerHTML;
			amount = list[k+start+1].getElementsByClassName('hidden_amount')[0].innerHTML;
			command_list.push([command, amount]);
		}
	}
   
	return start + length;
	
}

/* ----- Page Styling ----- */

// Swaps the control tab.
function activate_tab(tab) {

	// Activates tab for functions.
	if (tab == 'functions_tab') {

		document.getElementById('control_variables').className = "control_inactive";
		document.getElementById('variables_tab').className = "tab_inactive";
		document.getElementById('control_loops').className = "control_inactive";
		document.getElementById('loops_tab').className = "tab_inactive";
		document.getElementById('control_functions').className = "control_active";
		document.getElementById('functions_tab').className = "tab_active";

	}

	// Activates tab for variables.
	else if (tab == 'variables_tab') {

		document.getElementById('control_variables').className = "control_active";
		document.getElementById('variables_tab').className = "tab_active";
		document.getElementById('control_loops').className = "control_inactive";
		document.getElementById('loops_tab').className = "tab_inactive";
		document.getElementById('control_functions').className = "control_inactive";
		document.getElementById('functions_tab').className = "tab_inactive";

	}
	
	// Activates tab for loops.
	else if (tab == 'loops_tab') {

		document.getElementById('control_variables').className = "control_inactive";
		document.getElementById('variables_tab').className = "tab_inactive";
		document.getElementById('control_loops').className = "control_active";
		document.getElementById('loops_tab').className = "tab_active";
		document.getElementById('control_functions').className = "control_inactive";
		document.getElementById('functions_tab').className = "tab_inactive";

	}

}
