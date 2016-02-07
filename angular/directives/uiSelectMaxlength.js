module.exports=function() {
	'ngInject';
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			if(attrs.uiSelectValidation) {
				elem.find('input').attr('maxlength', attrs.uiSelectValidation);
			}
		}
	}
};