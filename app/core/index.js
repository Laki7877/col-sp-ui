/**
 * This module contains all core functionality of the portal
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
angular.module('colsp.core', [
	'colsp.vendor',
	require('./nc')
]);
.value('config', require('../config.js'))
.value('route', require('../route.js'))
/**
 * Export angular module
 */
module.exports = 'colsp.core';