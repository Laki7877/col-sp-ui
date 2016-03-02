/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Main app module
 *
 * @version    1.0.0
 * @author     ahancer
 */
angular.module('colsp', [
	require('./core'),
	require('./seller'),
	require('./admin')
])
/**
 * App configuration
 */
.config(function(uiSelectConfig, $ncPaginationProvider, $cookiesProvider, route) {
	//Set default pagination sizes
	$ncPaginationProvider.paginationSizes = [10, 20, 50, 100];

	//Set default tagging uiSelectConfig
	uiSelectConfig.taggingTokens = '[ENTER|,]';
})
.value('config', require('./config.js'))
.run(require('./template.js'))
/**
 * Export angular module
 */
module.exports = 'colsp';