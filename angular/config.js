module.exports = {
    // REST_SERVICE_BASE_URL: 'http://colsp-dev.azurewebsites.net/api',
	// REST_SERVICE_BASE_URL: 'http://27.254.48.174/sellerportal/api',
    // REST_SERVICE_BASE_URL: 'http://localhost:58127/api',
    REST_SERVICE_BASE_URL: 'http://devmkp-colspapi.cenergy.co.th/api',
	MAX_GLOBAL_CAT_COLUMN : 4,
	MAX_IMAGE_UPLOAD_SIZE: 5242880,
	CK_DEFAULT_OPTIONS: {
		filebrowserBrowseUrl : '/ckfinder/ckfinder.html',
		filebrowserImageBrowseUrl : '/ckfinder/ckfinder.html?type=Images',
		filebrowserFlashBrowseUrl : '/ckfinder/ckfinder.html?type=Flash',
		filebrowserUploadUrl : '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
		filebrowserImageUploadUrl : '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
		filebrowserFlashUploadUrl : '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
	},
	TYPEAHEAD_IMPORT_GUIDELINE_LIMIT: 8,
	TYPEAHEAD_DELAY: 150,
	xROLLBAR: {
		token: '3f012de90d9247c0a19ae95ac6ed9daf',
		environment: 'development'
	},
	DROPDOWN: {
		COUPON_CRITERIA: [
		{
			name: 'No Criteria',
			value: 'NoFilter'
		},
		{
			name: 'Total price is more than..',
			value: 'Total price is more than'
		}
		],
		COUPON_GLOBAL_FILTER: [
		{
			name: 'No Criteria',
			value: 'NoFilter'
		},
		{
			name: 'Global Category',
			value: 'GlobalCategory'
		}
		],
		COUPON_SELLER_FILTER: [
		{
			name: 'No Criteria',
			value: 'NoFilter'
		},
		{
			name: 'Local Category',
			value: 'LocalCategory'
		}
		],
		COUPON_DISCOUNT: [
			{
				display: 'Discount by Percent',
				Type: 'PERCENT'
			},
			{
				display: 'Discount by Amount',
				Type: 'AMOUNT'
			}
		],
		SHOP_GROUP_DROPDOWN: [
		{
			name: 'All',
			value: 'AL'
		},
		{
			name: 'BU',
			value: 'BU'
		},
		{
			name: 'INDY',
			value: 'IN'
		},
		{
			name: 'Merchant',
			value: 'ME'
		}
		],
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
		DEFAULT_ATTRIBUTE_VISIBLE_DROPDOWN: [
		{
			name: 'All Users',
			value: 'ME'
		},
		{
			name: 'Admin Only',
			value: 'AD'
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
		},
		{
			name: 'Checkbox',
			value: 'CB'
		}
		],
		VARIANT_DROPDOWN: [
		{
			name: 'Product Image',
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
		VARIANT2_DROPDOWN: [
		{
			name: 'Product Image',
			value: 'IO'
		},
		{
			name: 'Custom Image',
			value: 'CI'
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
	ORDER_STATUS: [
	{
		name: 'Payment Pending',
		value: 'PP',
		color: 'color-grey',
		icon: 'fa-clock-o',
		state: 0
	},
	{
		name: 'Payment Confirmed',
		value: 'PC',
		color: 'color-grey',
		icon: 'fa-check-circle-o',
		state: 1
	},
	{
		name: 'Processing',
		value: 'PE',
		color: 'color-yellow',
		icon: 'fa-check-circle-o',
		state: 2
	},
	{
		name: 'Ready to Ship',
		value: 'RS',
		color: 'color-green',
		icon: 'fa-check-circle-o',
		state: 3
	},
	{
		name: 'Shipping',
		value: 'SH',
		color: 'color-green',
		icon: 'fa-clock-o',
		state: 4
	},
	{
		name: 'Delivered',
		value: 'DE',
		color: 'color-green',
		icon: 'fa-check-circle-o',
		state: 5
	},
	{
		name: 'Canceled',
		value: 'CA',
		color: 'color-red',
		icon: 'fa-ban',
		state: -1
	}
	],
	RETURN_STATUS: [
	{
		name: 'Accepted',
		value: 'AP',
		color: 'color-green'
	},
	{
		name: 'Waiting',
		value: 'WA',
		color: 'color-grey'
	}
	],
	SHOP_STATUS: [
	{
		name: 'Inactive',
		value: 'NA',
		color: 'color-red'
	},
	{
		name: 'Active',
		value: 'AT',
		color: 'color-green'
	}
	],
	SHOP_GROUP: [
	{
		name: 'BU',
		value: 'BU'
	},
	{
		name: 'INDY',
		value: 'IN'
	},
	{
		name: 'Merchant',
		value: 'ME'
	}
	],
	INVENTORY_STATUS: [
	{
		name: 'Normal Stock',
		color: ''
	},
	{
		name: 'Low Stock',
		color: 'color-red'
	},
	{
		name: 'Out of Stock',
		color: 'color-red'
	}
	],
	PRODUCT_REVIEW_STATUS: [
	{
		name: 'Not Approved',
		value: 'WA',
		color: 'color-grey'
	},
	{
		name: 'Approved',
		value: 'AP',
		color: 'color-green'
	}
	],
	PRODUCT_REVIEW_BUTTON: [
	{
		name: 'Unapprove',
		value: 'AP'
	},
	{
		name: 'Approve',
		value: 'WA'
	}
	],
	PRODUCT_REVIEW_MAX_RATING: 5.0,
	PRODUCT_STATUS: [
	{
		name: 'Draft',
		value: 'DF',
		color: 'color-grey',
		icon: 'fa-circle-o'
	},
	{
		name: 'Wait for Approval',
		value: 'WA',
		color: 'color-yellow',
		icon: 'fa-clock-o'
	},
	{
		name: 'Approved',
		value: 'AP',
		color: 'color-green',
		icon: 'fa-check-circle-o'
	},
	{
		name: 'Not Approved',
		value: 'RJ',
		color: 'color-red',
		icon: 'fa-ban'
	}
	],
	CATEGORY_SYNC_DELAY: 1200, //Category wait for x millisecond before actually saving
	DEFAULT_SUCCESS_MESSAGE: 'Your changes have been saved successfully.',
	DEFAULT_ERROR_MESSAGE: 'Unable to save because required fields are missing or incorrect.',
	TITLE: {
		CREATE: 'Add {{content}}',
		DETAIL: '{{content}} Detail'
	},
	ERROR_MESSAGE: {
		WRONG_IMAGE_SIZE: 'Maximum file size reached. Please upload only under 5 MB per image',
		WRONG_IMAGE_FORMAT: 'Wrong file format. Please upload only JPG or PNG file'
	}
};
