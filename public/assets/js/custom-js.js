$(document).ready(function () {
	$('[data-toggle="popover"]').popover();

	// Logic for add text to dropdown at Product page top filter
	$(".dropdown-btn .dropdown-menu a").click(function() {
		var $this = $(this);
		var $parent = $this.closest('.dropdown-btn');
		$('.dropdown-text', $parent).text($this.html());     
	});


	$('[data-toggle="sub-sidebar"]').hover(function(e) { //mouse enter
		var $this = $(this);
		var $target = $($this.data('target'));
		$('.sub-sidebar').hide();
		$target.show();
	}, function(e) { //mouse leave
		var $this = $(this);
		var $target = $($this.data('target'));
		$target.hide();
	});
	$('.sub-sidebar').hover(function(e) { //mouse enter
		var $this = $(this);
		$this.show();
	}, function(e) { //mouse leave
		var $this = $(this);
		$this.hide();
	});
});