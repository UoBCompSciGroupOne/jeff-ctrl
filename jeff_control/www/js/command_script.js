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

	switch (command) {
			case 'forward':
				$.ajax({url: '/arduino/fwd/' + duration,
					async: false,
					success:
						function (result) {
							$('#message').html(result);
						}
				});
				break;
			case 'backward':
				$.ajax({url: '/arduino/bwd/' + duration,
					async: false,
					success:
						function (result) {
							$('#message').html(result);
						}
				});
				break;
			case 'left':
				$.ajax({url: '/arduino/lft/' + duration,
					async: false,
					success:
						function (result) {
							$('#message').html(result);
						}
				});
				break;
			case 'right':
				$.ajax({url: '/arduino/rgt/' + duration,
					async: false,
					success:
						function (result) {
							$('#message').html(result);
						}
				});
				break;
			default:
				$('#message').html('Incorrect command.');
		}

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
