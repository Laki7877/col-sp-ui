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
	},

	'Report|fa-file-o': {
	    'View Report': '/reports',
	}
};
var admin = {
	'Products|fa-tag': {
		'View All Products': '/admin/products',
		'Approve Products': '/admin/approve',
		'Pending Products': ['/admin/groups', '/admin/groups/add'],
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
		'Seller Coupons': '/admin/coupons/seller',
        'On Top Credit Card':'/admin/ontopcredit',
        'Buy 1 Get 1':'/admin/buy1get1'
	},
    // Create By Col Dev (Natee)
	'CMS|fa fa-contao': {
	    'CMS Category': '/admin/cms/category',
	    'CMS Static & Collection': '/admin/cms/master',
	    'CMS Group': '/admin/cms/group'
	},
	'Reports|fa-file': {
	    'Sale Report For Seller': '/admin/reports/std/saleforseller',
        'Stok Status Report': '/admin/reports/std/stokstatus'
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
	'Manage Newsletter': '/admin/newsletters',

	'View Dashboard': '/dashboard',
	'View Orders': '/orders',
	'Manage Return Requests': '/returns',
	'View Products': '/products',
	'Manage Local Category': '/categories',
	'Manage Product Reviews': '/reviews',
	'Manage Product Images': '/products/images',
	'Manage Pending Products': '/products/groups',
	'View Intentory': '/inventory',
	'View Coupons': '/coupons',
	'Manage Shop Profile': '/shop/settings',
	'Manage Shop Appearance': '/shop/appearance',
	'Manage User Account & Roles': ['/accounts', '/roles']
	
};

module.exports = {
  seller: generateRouteArray(seller),
  admin: generateRouteArray(admin),
  reserve: ['add', 'select', 'import', 'update', 'export', 'reviews', 'images', 'shippinglist'],
  permission: permission
}
