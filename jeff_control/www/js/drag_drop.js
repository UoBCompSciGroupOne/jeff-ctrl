
// Drag and Drop List
var list_commands = document.getElementById("commands");
Sortable.create(list_commands, {
	group: {
		name: 'sorting',
		put: ["newitem"]					// Add to list from newitem
	},
	handle: '.handle',
	animation: 150,							// Movement speed when rearranging
	sort: true,								// Can reorder within list
	
	/* UPON ADDITION TO LIST.
	Add unique ID number [removed, redundant].
	Display delete button [must not delete original list item].*/
    onAdd: function (evt) {					// When new element is dropped into list
		var del = evt.item.getElementsByClassName("delete_button");
		del[0].style.display = "block";
    },
});

// Drag and Drop New Item
var new_commands = document.getElementById("new_div_space_inner");
Sortable.create(new_commands, {
	group: {
		name: 'newitem',
		pull: 'clone'						// Drag does not remove original div
	},
	handle: '.handle',
	animation: 500,

});


function delete_item(marked_delete) {
	marked_delete.parentNode.removeChild(marked_delete);
}

