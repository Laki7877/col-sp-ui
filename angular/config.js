module.exports = {
	//baseUrl: 'https://microsoft-apiappa79c5198dccb42299762ef0adfb72ee8.azurewebsites.net/api/',
	//REST_SERVICE_BASE_URL: 'https://microsoft-apiappa79c5198dccb42299762ef0adfb72ee8.azurewebsites.net/api',
    baseUrl: 'http://localhost:58127/api/',
	REST_SERVICE_BASE_URL: 'http://localhost:58127/api/',
	//REST_SERVICE_BASE_URL: 'http://colsp-dev.azurewebsites.net/api',
	MAX_GLOBAL_CAT_COLUMN : 4,
<<<<<<< HEAD
	HANDLE_EXCEPTION :false,
=======
    HANDLE_EXCEPTION: false,
>>>>>>> 5c27fbee1d994ba9245fb28c1ed99f056c770f4d
	CK_DEFAULT_OPTIONS: {
	   filebrowserBrowseUrl : '/ckfinder/ckfinder.html',
	   filebrowserImageBrowseUrl : '/ckfinder/ckfinder.html?type=Images',
	   filebrowserFlashBrowseUrl : '/ckfinder/ckfinder.html?type=Flash',
	   filebrowserUploadUrl : '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
	   filebrowserImageUploadUrl : '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
	   filebrowserFlashUploadUrl : '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
	},
	DROPDOWN: {
		DEFAULT_STATUS_DROPDOWN: [
			{
				name: 'Inactive',
				value: 'NA'
			},
			{
				name: 'Active',
				value: 'AT'
			}
		],
		YES_NO_DROPDOWN: [
			{
				name: 'No',
				value: false
			},
			{
				name: 'Yes',
				value: true
			}
		],
		VISIBLE_DROPDOWN: [
			{
				name: 'Visible',
				value: true
			},
			{
				name: 'Not Visible',
				value: false
			}
		],
		DATA_TYPE_DROPDOWN: [
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
		],
		VARIANT_DROPDOWN: [
			{
				name: 'Image',
				value: 'IO'
			},
			{
				name: 'Textbox',
				value: 'TO'
			},
			{
				name: 'Dropdown',
				value: 'DD'
			}
		],
		VALIDATION_DROPDOWN: [
			{
				name: 'No Validation',
				value: 'NO'
			},
			{
				name: 'Number Only',
				value: 'NU'
			},
			{
				name: 'Text Only',
				value: 'TX'
			},
			{
				name: 'Email Address',
				value: 'EM'
			},
			{
				name: 'Phone Number',
				value: 'PH'
			}
		]
	},
	PRODUCT_REVIEW_STATUS: [
		{
			name: 'Not Approved',
			value: 'WA'
		}, 
		{
			name: 'Approved',
			value: 'AP'
		}
	],
	PRODUCT_REVIEW_MAX_RATING: 5.0,
	PRODUCT_STATUS: [
		{
			name: 'Draft',
			value: 'DF',
			color: 'color-grey',
			icon: 'fa-circle'
		},
		{
			name: 'Wait for Approval',
			value: 'WA',
			color: 'color-yellow',
			icon: 'fa-clock-o'
		}
	],
	DEFAULT_SUCCESS_MESSAGE: 'Your changes have been saved successfully.',
	DEFAULT_ERROR_MESSAGE: 'Unable to save because required fields are missing or incorrect.', 
	TITLE: {
		CREATE: 'Create New {{content}}',
		DETAIL: '{{content}} Detail'
	}
};
