var angular = require('angular');

require('angular-ui-bootstrap');
require('angular-sanitize');
require('angular-file-upload');
require('angular-scroll');
require('ui-select');
global.jQuery = require('jquery');
global.$ = require('jquery');
global._ = require('lodash');

angular.module('nc', ['ngSanitize', 'ui.bootstrap', 'ui.select', 'duScroll', 'angularFileUpload'])

.config(function($uibTooltipProvider) {
	$uibTooltipProvider.setTriggers({
		'clickanystart' : 'clickanyend'
	});
});
require('bulk-require')(__dirname, ['./**/*.js']);
require('./template.js');
