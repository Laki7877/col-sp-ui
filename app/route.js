/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handle app route configuration
 * 
 * @version    1.0.0
 * @author     ahancer
 */
/**
 * Route declaration
 */
var route = {
	seller: {
		$config: {
			menu: 'seller'	
		},
		product: {
			list: 	'/products',
			detail: '/products/:id',
			select: '/products/select',
			add: 	'/products/add',
			import: '/products/import',
			export: '/products/export',
			review: '/products/reviews',
			images: '/products/images'
		},
		inventory: '/inventory',
		category: '/categories',
		promotion: {
			coupon: '/coupons'
		},
		shop: {
			profile: '/shops/settings',
			appearance: '/shops/appearance'
		},
		user: {
			account: '/accounts',
			roles: 	'/roles'
		}
	},
	admin: {
		$config: {
			menu: 'admin'
		}
		product: {
			detail: '/admin/products',
			add: '/admin/products/add',
		}
	},
	login: '/login',
	main: '/',
	404: '/exception'
};
/**
 * Menu declaration
 */
var menu = {
	seller: {
		'Home|fa-home': {
			'View': [route.seller.product.list, route.seller.product.detail],
			'Add': [route.seller.product.select, route.seller.product.add],
			'Import': route.seller.product.import,
			'Export': route.seller.product.export,
			'Local Categories|margin-top-30': route.seller.category,
			'Product Reviews': route.seller.product.review,
			'Image Management': route.seller.product.images
		}
	},
	admin: {

	}
};