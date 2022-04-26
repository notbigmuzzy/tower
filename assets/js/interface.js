$(document).ready(function(){

	//TOGGLE GAME PANELS
	$('the-switches .toggle-button').click(function(e) {
		e.preventDefault()
		let thisPanel = $(this).attr('data-toggle');

		if ($('body').hasClass(thisPanel)) {
			$('body').removeClass();
		} else {
			$('body').removeClass().addClass(thisPanel);
		}
	});

});