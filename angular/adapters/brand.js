module.exports = ['Brand', function(Brand){
	'use strict';
	return {
		'load': function(formData){
			$.fn.select2.amd.define('select2/data/brandAdapter',[
				'select2/data/array',
				'select2/utils'
			    ],
			    function (ArrayAdapter, Utils) {

					function CustomDataAdapter ($element, options) {
					    CustomDataAdapter.__super__.constructor.call(this, $element, options);
					    this.MappedData = [];
					}

					Utils.Extend(CustomDataAdapter, ArrayAdapter);

					//current is called everyimt full list is queried
					CustomDataAdapter.prototype.query = function (params, callback) {
						var that = this;
						return Brand.getAll(params.term).then(function (data) {
						var mapped = data.map(function(obj){
									obj.id = obj.BrandId;
									return obj;
								});
						that.MappedData = mapped;
						callback({ results: mapped });
					    });
					};

					//current is called every time match list is queried
					 CustomDataAdapter.prototype.current = function (callback) {
		
						var currentBrandId = -1; 
						if('Brand' in formData){
							currentBrandId = Number(this.$element.val()) || Number(formData.Brand.BrandId);
						}
						
						var data = [];
						var m = this.MappedData.map(function(o){ return Number(o.id) });
						if(m.indexOf(currentBrandId) == -1){
							if(formData.Brand){
								data.push(formData.Brand);
							}
						}else{
							var found = this.MappedData[m.indexOf(currentBrandId)];
							data.push(found);
						}
					

						var self = this;
						if(data.length == 0){
						   this.$element.find(':selected').each(function () {
							var $option = $(this);
							var option = self.item($option);
							data.push(option);
						   });
						}

						callback(data)
					};

					return CustomDataAdapter;
				    }
			); //end_define



		}
	};
}];
