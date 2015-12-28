$(document).ready(function () {
	$('[data-toggle="popover"]').popover();

	// Logic for add text to dropdown at Product page top filter
	$(".dropdown-btn .dropdown-menu a").click(function() {
		var $this = $(this);
		var $parent = $this.closest('.dropdown-btn');
		$('.dropdown-text', $parent).text($this.html());     
	});
});