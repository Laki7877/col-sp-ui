/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';

angular.module('nc', ['ngSanitize', 'ui.bootstrap', 'ui.select', 'duScroll', 'angularFileUpload'])
.run(require('./template.js'));
require('bulk-require')(__dirname, ['./**/*.js']);
module.exports = 'nc';