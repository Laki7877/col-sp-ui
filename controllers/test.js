//Set up client for known endpoints
var client = new $.RestClient('/api/');
client.add('Users');
client.add('Products');

//Set up service layer
var services = {
	users: {},
	products: {}
};

services.users.getAll(function(order, limit, offset){
	client.Users.read({ _order : order, _limit: limit, _offset: offset});	
});
