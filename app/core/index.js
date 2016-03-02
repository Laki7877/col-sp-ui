/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Contains all core functionality of the portal
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core', [
	'colsp.vendor',
	require('../nc')
])
.constant('route', require('../route.js'));
.run(function($ncTemplateOptionsCache) {
	$ncTemplateOptionsCache.putAll(require('bulk-require')(__dirname + '', './**/*.js'));	
})
/* require all */
require('bulk-require')(__dirname, './**/*.js');
/**
 * Export angular module
 */
module.exports = 'colsp.core';