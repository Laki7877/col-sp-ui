/**
 * Collection of Route ID (Object key) with route string
 *
 * Format:
 *
 * '<text title>|<css>' : '<startWith url>'
 * 
 * This is temporary solution
 */
var _ = require('lodash');

function generateRouteArray(obj) {
	var menu = [];
	_.forOwn(obj, function(object, header) {
		var token = header.split('|');
		var menuItem = {
			header: token[0],
			submenu: []
		};

		if(token.length > 1) {
			menuItem.icon = token[1];
		}

		if(!_.isEmpty(object)) {
			_.forOwn(object, function(url, subheader) {

				var urls = [];
				if(_.isArray(url)) {
					urls = url;
					url = url[0];
				}
				var token2 = subheader.split('|');
				var submenuItem = {
					header: token2[0],
					css: '',
					url: url,
					urls: urls
				};
				
				if(token2.length > 1) {
					submenuItem.css += token2[1];
				}

				menuItem.submenu.push(submenuItem);
			});
			if(menuItem.submenu.length > 0) {
				menuItem.url = menuItem.submenu[0].url;
			}
		}

		menu.push(menuItem);
	});

	return menu;
}

var seller = {
	'Home|fa-home': {
		'Onboarding': '/onboarding',
		'Dashboard': '/dashboard',
		'Newsletters': '/newsletters'
	},
	'Order|fa-inbox': {
		'View': '/orders',
		'Return Request': '/returns'
	},
	'Product|fa-tag': {
	  	'View': '/products',
	  	'Add': ['/products/select', '/products/add'],	
	  	'Import': '/products/import',
	  	'Export': '/products/export',
	  	'Local Category|margin-top-30': '/categories',
	  	'Product Reviews': '/products/reviews',
	  	'Image Management': '/products/images',
	  	'Pending Products': '/products/groups'
	},

	'Inventory|fa-archive': {
		'View': '/inventory'
	},

	'Promotion|fa-bookmark': {
		'Coupons': '/coupons'
	},

	'Shop Setting|fa-sliders': {
		'Shop Profile': '/shops/settings',
		'Shop Appearance': '/shops/appearance'
	},


	'Account|fa-user': {
		'User Accounts': '/accounts',
		'User Roles': '/roles'
	},
	'Collection|fa-product-hunt': {
		'View': '/collections',
		'Add': '/collections/add',
		'Category View|margin-top-30': '/collections/cat',
	  	'Category Add': '/collections/catadd',
	  	'Group View|margin-top-30': '/collections/cat',
	  	'Group Add': '/collections/catadd',
	},
	'Buy 1 Get 1|fa-gift': {
		'View': '/buy1get1',
		'Add': '/buy1get1/add'
	}
};
var admin = {
	'Products|fa-tag': {
		'View All Products': '/admin/products',
		'Approve Products': '/admin/approve',
		'Pending Products': ['/admin/groups', '/admin/groups/add'],
		'Master Products': ['/admin/masters', '/admin/masters/add'],
		'Brands': ['/admin/brands', '/admin/brands/add'],
		'Attributes': ['/admin/attributes', '/admin/attributes/add'],
		'Attribute Sets': ['/admin/attributesets', '/admin/attributesets/add'],
		'Global Category': '/admin/categories'
	},
	'Accounts|fa-user': {
		'Seller Accounts': '/admin/sellers',
		'Shop Accounts': ['/admin/shops', '/admin/shops/add'],
		'Shop Types': ['/admin/shoptypes', '/admin/shoptypes/add'],
		'Admin Accounts': ['/admin/accounts', '/admin/accounts/add'],
		'Admin Roles': ['/admin/roles', '/admin/roles/add']
	},
	'Promotion|fa-bookmark': {
		'Global Coupons': '/admin/coupons/admin',
        'Seller Coupons': '/admin/coupons/seller',
        'On Top Credit Card': '/admin/ontopcredit',
        'Redeem': '/admin/redeem'
	},

	// Create By Col Dev (Natee)
	'CMS|fa-product-hunt': {
	 	'CMS Category': '/admin/cms/category',
	 	'CMS Static & Collection': '/admin/cms/collection',
	 	'CMS Group': '/admin/cms/group'
	},
	'Others|fa-sliders': {
		'Newsletters': '/admin/newsletters'
	}
};
var permission = {
	//Admin
	'View All Products': '/admin/products',
	'Approve Products': '/admin/approve',
	'Manage Pending Products': '/admin/groups',
	'Manage Master Products': '/admin/masters',
	'Manage Brands': '/admin/brands',
	'Manage Attribute & Attribute Sets': ['/admin/attributes', '/admin/attributesets'],
	'Manage Global Categories': '/admin/categories',
	'Manage Seller Accounts': '/admin/sellers',
	'Manage Shops': ['/admin/shops', '/admin/shoptypes'],
	'Manage Admin': ['/admin/accounts', '/admin/roles'],
	'Manage Global Coupons': '/admin/coupons/global',
	'Manage Seller Coupons': '/admin/coupons/seller',
	'Manage Newsletter': '/admin/newsletters'
	
};

module.exports = {
  seller: generateRouteArray(seller),
  admin: generateRouteArray(admin),
  reserve: ['add', 'select', 'import', 'export', 'reviews', 'images'],
  permission: permission
}