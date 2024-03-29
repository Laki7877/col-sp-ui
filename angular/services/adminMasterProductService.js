module.exports = function (common) {
	'ngInject';
	var service = common.Rest('/Products/Master');

	service.customList = function(p){
		return common.makeRequest({
				method: 'GET',
				url: '/Products',
				params: p
		});
	}
	
	//override
	service.deserialize = function(d){
		d.MasterProduct.CustomName = d.MasterProduct.ProductNameEn + " (" + d.MasterProduct.Pid + ")";
		
		d.ChildProducts = d.ChildProducts.map(function(X){
				X.CustomName = X.ProductNameEn + " (" + X.Pid + ")";
				return X;
		});
		
		return d;
	}


	return service;

	
};