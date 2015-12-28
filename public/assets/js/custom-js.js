$(document).ready(function () {
	$('[data-toggle="popover"]').popover({trigger: 'manual'});
	$(document).on('click', function(e) {
		var $target = $(e.target);
		var isPopover = $target.is('[data-toggle="popover"]');

		if (isPopover) {
			$target.popover('show');
		}
		else {
			$('[data-toggle="popover"]').popover('hide');
		}
	});

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