//remote baseUrl - 'https://microsoft-apiappa79c5198dccb42299762ef0adfb72ee8.azurewebsites.net/api/'
module.exports = {
	baseUrl: 'https://microsoft-apiappa79c5198dccb42299762ef0adfb72ee8.azurewebsites.net/api/',
	REST_SERVICE_BASE_URL: 'https://microsoft-apiappa79c5198dccb42299762ef0adfb72ee8.azurewebsites.net/api',
	MAX_GLOBAL_CAT_COLUMN : 4,
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
		}]
	},
	PRODUCT_STATUS: [{
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
	}],
	DEFAULT_SUCCESS_MESSAGE: 'Your changes have been saved successfully.',
	DEFAULT_ERROR_MESSAGE: 'Unable to save because required fields are missing or incorrect.', 
	TITLE: {
		CREATE: 'Create New {{content}}',
		DETAIL: '{{content}} Detail'
	}
};
