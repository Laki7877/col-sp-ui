/**
 * Main app module
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 *
 * App module
 * 
 */
angular.module('colsp', [
	require('./core'),
	require('./seller'),
	require('./admin')
])
/**
 * App configuration
 */
.config(function(uiSelectConfig, $ncPaginationProvider, $cookiesProvider) {
	//Set default pagination sizes
	$ncPaginationProvider.paginationSizes = [10, 20, 50, 100];

	//Set default tagging uiSelectConfig
	tokens.taggingTokens = '[ENTER|,]';
})
/**
 * Export angular module
 */
module.exports = 'colsp';