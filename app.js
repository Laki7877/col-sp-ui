//App Start here
var angular = require('angular');
var config = require('./config.js');
//Services
var services = {};
var controllers = {};
services.Products = require('./services/products.js');
controllers.Products = require('./controllers/products.js');

var app = angular.module('colspApp', [])
.factory('Products', services.Products)
.value('config', config);

app.controller('ProductListCtrl', controllers.Products);
