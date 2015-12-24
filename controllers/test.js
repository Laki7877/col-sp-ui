//Set up client for known endpoints
var client = new $.RestClient('/flat/');
client.add('Products', {url: 'Products.json'});

//Set up service layer
var services = {
	users: {},
	products: {}
};

services.products.getPage = function(pageIdx){
	var deferred = new $.Deferred();
	client.Products.read({ _offset: pageIdx }).done(deferred.resolve);
	return deferred.promise();
};

module.exports = services;
