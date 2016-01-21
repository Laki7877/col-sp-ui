module.exports=[function() {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			if(attrs.uiSelectValidation) {
				console.log(attrs.uiSelectValidation);
				elem.find('input').attr('maxlength', attrs.uiSelectValidation);
				console.log(elem.find('input'));
			}
		}
	}
}];