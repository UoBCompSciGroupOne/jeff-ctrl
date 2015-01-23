// Handles loading of the navbar into pages.

// Loads the navbar into pages.
$(function() {
	$('#navbar').load('navbar.html');
	$('#menu_content').load('menu_content.html');
});

// Produces the drop down menu.
function drop_menu() {
	$('#menu_content').css('visibility', 'visible');
	$('#background').css('visibility', 'visible');
	$('#menu_wrapper').css('background', 'white');
};

// Closes the drop down menu.
function close_menu() {
	$('#menu_content').css('visibility', 'hidden');
	$('#background').css('visibility', 'hidden');
	$('#menu_wrapper').css('background', '#339999');
};
