var skeemas = require('skeemas');
var schm = require('./ProductStages.json')
var v = skeemas.validate('foo', schm).valid;
