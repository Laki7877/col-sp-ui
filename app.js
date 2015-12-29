//App Start here
var angular = require('angular');
var config = require('./config.js');
//Services
var services = {};
var controllers = {};
services.Products = require('./services/products');
controllers.ProductsList = require('./controllers/products_list');
controllers.ProductsAdd = require('./controllers/products_add');

var app = angular.module('colspApp', [])
.factory('Products', services.Products)
.value('config', config);

app.controller('ProductListCtrl', controllers.ProductsList);
app.controller('ProductAddCtrl', controllers.ProductsAdd);
