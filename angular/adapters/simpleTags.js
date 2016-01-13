module.exports = [function(){
	'use strict';
	return {
		'load': function(formData){
			$.fn.select2.amd.define('select2/data/simpleTagsAdapter',[
				'select2/data/array',
				'select2/utils'
			    ],
			    function (ArrayAdapter, Utils) {

					function CustomDataAdapter ($element, options) {
					    CustomDataAdapter.__super__.constructor.call(this, $element, options);
					}

					Utils.Extend(CustomDataAdapter, ArrayAdapter);

					//current is called every time match list is queried
					 CustomDataAdapter.prototype.current = function (callback) {
		
						var data = [{
							id: 1,
							text: "hello"
						},{
							id: 2,
							text: "yello"
						}];

						callback(data)
					};

					return CustomDataAdapter;
				    }
			); //end_define



		}
	};
}];
