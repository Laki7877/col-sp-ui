module.exports=[function() {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			if(attrs.uiSelectValidation) {
				elem.find('input').attr('maxlength', attrs.uiSelectValidation);
			}
		}
	}
}];