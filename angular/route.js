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
		'View Orders': ['/orders', '/orders/shippinglist'],
		'Return Request': '/returns'
	},
	'Product|fa-tag': {
	  	'View Products': '/products',
	  	'Add Product': ['/products/select', '/products/add'],
	  	'Import - Add Products': '/products/import',
			'Import - Update Products': '/products/update',
	  	'Export Products': '/products/export',
	  	'Local Category|margin-top-30': '/categories',
	  	'Product Reviews': '/products/reviews',
	  	'Image Management': '/products/images',
	  	'Pending Products': '/products/groups'
	},

	'Inventory|fa-archive': {
		'View Inventory': '/inventory'
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
	}
};
var admin = {
	'Products|fa-tag': {
		'View All Products': '/admin/products',
		'Approve Products': '/admin/approve',
		'Pending Products': ['/admin/products/groups', '/admin/products/groups/add'],
		'Master Products': ['/admin/masters', '/admin/masters/add'],
		'Product Reviews': '/admin/products/reviews',
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
		'Global Coupons': '/admin/coupons/global',
		'All Seller Coupons': '/admin/coupons/seller'
	},
	'Others|fa-sliders': {
		'Newsletters': '/admin/newsletters'
	}
};
var permission = {
	//Admin
	1: '/admin/products',
	3: '/admin/approve',
	4: ['/admin/products/groups', '/admin/products/groups/add'],
	5: ['/admin/masters', '/admin/masters/add'],
	6: ['/admin/brands', '/admin/brands/add'],
	7: ['/admin/attributes', '/admin/attributes/add', '/admin/attributesets', '/admin/attributesets/add'],
	8: '/admin/categories',
	9: '/admin/sellers',
	10: ['/admin/shops', '/admin/shops/add'],
	11: ['/admin/accounts', '/admin/accounts/add'],
	12: '/admin/coupons/global',
	13: '/admin/coupons/seller',
	21: '/admin/newsletters',

	//Seller
	29: '/dashboard',
	30: '/orders',
	32: '/returns',
	33: '/products',
	34: ['/products/select', '/products/add'],
	46: '/categories',
	47: '/reviews',
	48: '/products/images',
	49: '/products/groups',
	50: '/inventory',
	52: '/coupons',
	55: '/shop/settings',
	56: '/shop/appearance',
	57: ['/roles', '/accounts'],

	//Shop
	64: '/dashboard',
	65: '/products/groups',
	66: '/products/images',
	68: '/inventory',
	69: '/coupons'
};

module.exports = {
  seller: generateRouteArray(seller),
  admin: generateRouteArray(admin),
  reserve: ['add', 'select', 'import', 'update', 'export', 'reviews', 'images', 'shippinglist'],
  permission: permission
}
