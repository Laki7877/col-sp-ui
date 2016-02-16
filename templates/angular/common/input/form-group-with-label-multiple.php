<!-- NC TEMPLATE ONLY -->
<div ng-class="['form-group ' + (options.formGroupClass || '')]">
	<div class="width-label"><label class="control-label" ng-class="options.labelClass || {}">{{ label }}</label></div>
	<ng-transclude ng-class="{ 'has-error' : isInvalid(templateField()) }"></ng-transclude>
</div>