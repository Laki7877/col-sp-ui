/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Third party packages
 *
 * @version 1.0.0
 * @author ahancer
 */
require('angular');
require('angular-animate');
require('angular-base64');
require('angular-bootstrap-datetimepicker');
require('angular-clipboard');
require('angular-cookies');
require('angular-file-upload');
require('angular-sanitize');
require('angular-scroll');
require('angular-ui-bootstrap');
require('angular-ui-tree');
require('ui-select');
/**
 *
 * App module
 * 
 */
angular.module('colsp.vendor', [
	'angular-clipboard',
	'angularFileUpload',
	'base64',
	'duScroll',
	'ngAnimate',
	'ngCookies',
	'ngSanitize',
	'ui-select',
	'ui-tree',
	'ui.bootstrap',
	'ui.bootstrap.datetimepicker'
]);
/* export angular module */
module.exports = 'colsp.vendor';