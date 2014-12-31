// Drag and Drop List
var list_commands = document.getElementById("commands");
Sortable.create(list_commands, {
	group: {
		name: 'sorting',
		put: ["newitem"]					// Add to list from newitem
	},
	animation: 150,							// Movement speed when rearranging
	sort: true								// Can reorder within list
	
});

// Drag and Drop New Item
var new_commands = document.getElementById("new_div_space_inner");
Sortable.create(new_commands, {
	group: {
		name: 'newitem',
		pull: 'clone'						// Drag does not remove original div
	},
	animation: 500,

});
