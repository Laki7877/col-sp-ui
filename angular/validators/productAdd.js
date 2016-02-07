module.exports = ['$rootScope', function($root){
	return function(form){
		return 	{
				'label': 'Product Name (Thai)',
				'labelClass': 'required',
				'error' : {
					'messages': {
						'required': 'This is a required field',
						'pattern': 'Only letters and numbers allowed'
					}
				},
				'name': 'MasterVariant_ProductNameTh'		
			}
	}	
}];
