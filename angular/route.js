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

	},
	'Orders|fa-inbox': {

	},
	'Product|fa-tag': {
	  	'View': '/products',
	  	'Add': ['/products/select', '/products/add'],	
	  	'Import': '/products/import',
	  	'Export': '/products/export',
	  	'Local Category|margin-top-30': '/categories',
	  	'Product Reviews': '/products/reviews',
	  	'Image Management': '/products/images'
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

	'Report|fa-line-chart': {

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
		'Master Products': '/admin/master',
		'Brands': '/admin/brands',
		'Attributes': '/admin/attributes',
		'Attribute Sets': '/admin/attributesets',
		'Global Category': '/admin/categories'
	},
	'Accounts|fa-user': {
		'Shop Accounts': '/admin/shops',
		'Shop Types': '/admin/shoptypes',
		'Admin Accounts': '/admin/accounts',
		'Admin Roles': '/admin/roles'
	},
	'Promotion|fa-bookmark': {
		'Global Coupons': '/admin/coupons/admin',
		'Seller Coupons': '/admin/coupons/seller'
	},
	'Reports|fa-line-chart': {
		'View': '/admin/reports'
	},
	'Others|fa-sliders': {
		'Newsletters': '/admin/newsletters'
	}
};

module.exports = {
  seller: generateRouteArray(seller),
  admin: generateRouteArray(admin)
}