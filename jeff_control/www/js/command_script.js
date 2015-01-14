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
      var loop_contents = new_item[i].getElementsByClassName('loop_contents_active');
      var loop_end = new_item[i].getElementsByClassName('loop_end_active');
	
		new_item_display[0].innerHTML = direction + '(' + duration + ');';
		new_item_cmd[0].innerHTML = direction;
		new_item_amount[0].innerHTML = duration;
      if(loop_end.length) {         // also loop_contents
         loop_contents[0].className = 'loop_contents_inactive';
         loop_end[0].className = 'loop_end_inactive';
      }
	}	/* This loop is annoying but necessary. Dragging always creates a clone, and if the dragged object is not
		dropped into the list, it returns. This overlaps with previous, and so all must be changed on button click.
		It is a bug in the library code. There is likely a simple, cleaner alternative (deleting the dragged
		element if not dropped into list), but this works for now. */

}

// Adds move to page and to command list array.
function loop(type) {

	// Gets the number of loops.
	var loopnumberList = document.getElementById('loop_number');
	var loopnumber = loopnumberList.options[loopnumberList.selectedIndex].value;

	// Changes new_list_item div to that specified by button press. Changes hidden attributes.
	var new_item = document.getElementById('new_div_space_inner').getElementsByClassName('list_item');
	var length = new_item.length;			// Should be 1. However this is not always the case (see below).

	for(var i=0; i < length; i++) {
		var new_item_display = new_item[i].getElementsByClassName('display_cmd');
		var new_item_cmd = new_item[i].getElementsByClassName('hidden_cmd');
		var new_item_amount = new_item[i].getElementsByClassName('hidden_amount');
      var loop_contents = new_item[i].getElementsByClassName('loop_contents_inactive');
      var loop_end = new_item[i].getElementsByClassName('loop_end_inactive');

	
		new_item_display[0].innerHTML = 'loop from 1 to ' + loopnumber + ':';
		new_item_cmd[0].innerHTML = type;
		new_item_amount[0].innerHTML = loopnumber;
      if(loop_end.length) {       // also loop_contents
         loop_contents[0].className = 'loop_contents_active';
         loop_end[0].className = 'loop_end_active';
      }
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
	var list = document.getElementById("command_list").getElementsByClassName("list_item");
   var length = list.length;
	create_array(list, 0, length);        // List of divs; Start position; End position (for recursive)

   
	/*	[--------------------------------  TEST  --------------------------------] 
		Alert array contents: */
	window.alert(command_list);
   
   
	var command, duration;

	// Loops through list of commands.
	for (var i = 0; i < command_list.length; i++) {

		command = command_list[i][0];
		duration = command_list[i][1];

		handle_command(command, duration);

	};
}

// Creates array using ordered list of divs
function create_array(list, start, end) {
	
	var command, amount;
	
	for(var i = start; i < end; i++) {
      
		command = list[i].getElementsByClassName('hidden_cmd')[0].innerHTML;
		amount = list[i].getElementsByClassName('hidden_amount')[0].innerHTML;
      
      if(command == "for") {
         
         loop_content = list[i].getElementsByClassName("list_item");
         var length = loop_content.length;
         
         for(var j = 0; j < amount; j++) {
            create_array(list, i + 1, i + length + 1);
         }
         
         i = i + length;
      }
      
      else {
         command_list.push([command, amount]);
      }
      
	};
	
}

// Add for loop to array
function create_array_loop(list, start, amount) {
   
   loop_content = list[start].getElementsByClassName("list_item");
   var length = loop_content.length;
   var num_loops = list[start].getElementsByClassName('hidden_amount')[0].innerHTML;
   
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

		$('#control_constants').css('display', 'none');
		document.getElementById('constants_tab').className = "tab_inactive";
		$('#control_loops').css('display', 'none');
		document.getElementById('loops_tab').className = "tab_inactive";
		$('#control_functions').css('display', 'initial');
		document.getElementById('functions_tab').className = "tab_active";

	// Activates tab for constants.
	} else if (tab == 'constants_tab') {

		$('#control_constants').css('display', 'initial');
		document.getElementById('constants_tab').className = "tab_active";
		$('#control_loops').css('display', 'none');
		document.getElementById('loops_tab').className = "tab_inactive";
		$('#control_functions').css('display', 'none');
		document.getElementById('functions_tab').className = "tab_inactive";

	// Activates tab for loops.
	} else if (tab == 'loops_tab') {

		$('#control_constants').css('display', 'none');
		document.getElementById('constants_tab').className = "tab_inactive";
		$('#control_loops').css('display', 'initial');
		document.getElementById('loops_tab').className = "tab_active";
		$('#control_functions').css('display', 'none');
		document.getElementById('functions_tab').className = "tab_inactive";

	}

}
