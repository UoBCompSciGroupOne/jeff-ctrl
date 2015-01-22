
// Drag and Drop List
var list_commands = document.getElementById("commands");
Sortable.create(list_commands, {
	group: {
		name: 'sorting',
		put: ["newitem"]					// Add to list from newitem
	},
	handle: '.handle',						// Draggable part
	animation: 150,							// Movement speed when rearranging
	sort: true,								// Can reorder within list
	scroll: true,
	scrollSensitivity: 80,					// Scrolls when near edge of page
	scrollSpeed: 10,
   
   
	/* UPON ADDITION TO LIST.
	Display delete button [must not delete original list item].*/
    onAdd: function (evt) {
		var del = evt.item.getElementsByClassName("delete_button");
		del[0].style.display = "block";
		
		var nested_list = evt.item.getElementsByClassName("loop_contents_active");
		if(nested_list.length) {               // If addition is a loop
			Sortable.create(nested_list[0], {   // Create new, nested list within loop
				group: {
					name: 'sorting',
					put: ["newitem"]
				},
				handle: '.handle',
				animation: 150,
				sort: true,
			});
		};
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

// Delete list element (parent of delete button is passed to this function)
function delete_item(marked_delete) {
	marked_delete.parentNode.removeChild(marked_delete);
}

