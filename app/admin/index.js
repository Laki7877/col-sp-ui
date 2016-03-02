/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * This module handle all admin functionality
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
angular.module('colsp.admin', [
	require('../core')
]);
/* require all */
require('bulk-require')(__dirname, './**/*.js');
/**
 * Export angular module
 */
module.exports = 'colsp.admin';