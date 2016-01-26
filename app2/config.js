angular.module('app')
	.value('config', {
		REST_SERVICE_BASE_URL: 'https://microsoft-apiappa79c5198dccb42299762ef0adfb72ee8.azurewebsites.net/api',
		DEFAULT_PAGINATION_SIZES: [10, 25, 50],
		DROPDOWN: {
			YES_NO_OPTIONS: [{
					name: 'Yes',
					value: true
				},
				{
					name: 'No',
					value: false
				}
			],
			ATTRIBUTE_DATA_TYPE: [
				{
					name: 'Free Text',
					value: 'ST'
				},
				{
					name: 'Dropdown',
					value: 'LT'
				},
				{
					name: 'HTML Box',
					value: 'HB'
				}
			]
		},
		FILTER: {
			ATTRIBUTE: [
				{ name: "All", value: 'All'},
				{ name: "Free Text", value: 'FreeText'},
				{ name: "Dropdown", value: 'Dropdown'},
				{ name: "Has Variation", value: 'HasVariation'},
				{ name: "No Variation", value: 'NoVariation'}
			]
		}
	})
	/*
	.config(function($logProvider, $provide){ 
	    $provide.decorator('$log', function ($delegate) {
	        $delegate.debug = function () {
	            var args = [].slice.call(arguments);
	            if (window.console && window.console.table)
	                console.trace(args[0], args[1]);
	            else
	                $delegate.log(null, args)
	        };
	        return $delegate;
	    });
	})*/