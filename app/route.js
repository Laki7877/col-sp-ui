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
 * Route v1 declaration
 */
var route = {
	$default: {
		title: 'Central Online - Seller Portal'
	},
	/* Not found page */
	404: {
		path: '/error',
		wrapperClass: 'wrapper-login'
	},
	/* Default page */
	main: {
		path: '/',
		wrapperClass: 'wrapper-login'
	},
	/* Admin page */
	seller: {
		$default: {
			menu: 'seller',
			headerView: 'seller/views/header.html',
			wrapperClass: 'wrapper'
		},
		product: {
			list: {
				path: '/products',
				controller: 'AdminProductListCtrl',
				view: 'seller/views/products.list.html'
			},
			detail: {
				path: '/products/:id',
				controller: 'AdminProductAddCtrl',
				view: 'seller/views/products.add.html'
			},
			select: {
				path: '/products/select',
				controller: 'AdminProductSelectCtrl',
				view: 'seller/views/products.select.html'
			},
			add: {
				path: '/products/add',
				controller: 'AdminProductAddCtrl',
				view: 'seller/views/products.add.html'
			},
			import: {
				path: '/products/import',
				controller: 'AdminProductImportCtrl',
				view: 'seller/views/products.import.html'
			},
			export: {
				path: '/products/export',
				controller: 'AdminProductExportCtrl',
				view: 'seller/views/products.export.html'
			},
			review: {
				path: '/products/reviews',
				controller: 'AdminProductReviewCtrl',
				view: 'seller/views/products.add.html'
			},
			image: {
				/* image management */
				path: '/products/images',
				controller: 'AdminProductImageCtrl',
				view: 'seller/views/products.image.html'
			}
		},
		inventory: {
			path: '/inventory',
			controller: 'AdminInventoryListCtrl',
			view: 'seller/views/inventories.list.html'
		},
		category: {
			/* local category */
			path: '/categories',
			controller: 'AdminCategoryCtrl',
			view: 'seller/views/categories.list.html'
		},
		promotion: {
			coupon: {}
		},
		shop: {
			profile: {
				path: '/shops/settings',
				controller: 'AdminShopProfileCtrl',
				view: '/seller/views/shops.profile.html'
			},
			appearance: {
				path: '/shops/appearance',
				controller: 'AdminShopAppearanceCtrl',
				view: '/seller/views/shops.appearance.html'
			}
		},
		user: {
			account: {
				list: {
					path: '/accounts',
					controller: 'AdminUserAccountCtrl',
					view: 'seller/views/users.account.list.html'
				},
				detail: {
					path: '/accounts/:id',
					controller: 'AdminUserAccountAddCtrl',
					view: 'seller/views/users.account.add.html'
				},
				add: {
					path: '/accounts/add',
					controller: 'AdminUserAccountAddCtrl',
					view: 'seller/views/users.account.add.html'
				}
			},
			role: {
				list: {
					path: '/roles',
					controller: 'AdminUserRoleCtrl',
					view: 'seller/views/users.role.list.html'
				},
				detail: {
					path: '/roles/:id',
					controller: 'AdminUserRoleAddCtrl',
					view: 'seller/views/users.role.add.html'
				},
				add: {
					path: '/roles/add',
					controller: 'AdminUserRoleAddCtrl',
					view: 'seller/views/users.role.add.html'
				}
			}
		}
	},
	/* Admin page */
	admin: {
		$default: {
			menu: 'admin',
			headerView: 'admin/views/header.html',
			wrapperClass: 'wrapper'
		},
		product: {
			list: {
				path: '/admin/products',
				controller: 'AdminProductListCtrl',
				view: 'admin/views/products.list.html'
			},
			detail: {
				path: '/admin/products/:id',
				controller: 'AdminProductAddCtrl',
				view: 'admin/views/products.add.html'
			},
			add: {
				path: '/admin/products/add',
				controller: 'AdminProductAddCtrl',
				view: 'admin/views/products.add.html'
			},
			approve: {
				path: '/admin/products/approve',
				controller: 'AdminProductApproveCtrl',
				view: 'admin/views/products.approve.html'
			},
			master: {
				path: '/admin/master',
				controller: 'AdminProductMasterCtrl',
				view: 'admin/views/products.master.html'
			}
		},
		brand: {
			list: {
				path: '/admin/brands',
				controller: 'AdminBrandListCtrl',
				view: 'admin/views/brands.list.html'
			},
			detail: {
				path: '/admin/brands/:id',
				controller: 'AdminBrandAddCtrl',
				view: 'admin/views/brands.add.html'
			},
			add: {
				path: '/admin/brands/add',
				controller: 'AdminBrandAddCtrl',
				view: 'admin/views/brands.add.html'
			}
		},
		attribute: {
			list: {
				path: '/admin/attributes',
				controller: 'AdminAttributeListCtrl',
				view: 'admin/views/attributes.list.html'
			},
			detail: {
				path: '/admin/attributes/:id',
				controller: 'AdminAttributeAddCtrl',
				view: 'admin/views/attributes.add.html'
			},
			add: {
				path: '/admin/attributes/add',
				controller: 'AdminAttributeAddCtrl',
				view: 'admin/views/attributes.add.html'
			}
		},
		attributeset: {
			list: {
				path: '/admin/attributesets',
				controller: 'AdminAttributeSetListCtrl',
				view: 'admin/views/attributesets.list.html'
			},
			detail: {
				path: '/admin/attributesets/:id',
				controller: 'AdminAttributeSetAddCtrl',
				view: 'admin/views/attributesets.add.html'
			},
			add: {
				path: '/admin/attributesets/add',
				controller: 'AdminAttributeSetAddCtrl',
				view: 'admin/views/attributesets.add.html'
			}
		},
		category: {
			path: '/admin/categories',
			controller: 'AdminCategoryCtrl',
			view: 'admin/views/categories.list.html'
		},
		shop: {
			account: {
				list: {
					path: '/admin/shops',
					controller: 'AdminShopAccountListCtrl',
					view: 'admin/views/shops.account.list.html'
				},
				detail: {
					path: '/admin/shops/:id',
					controller: 'AdminShopAccountAddCtrl',
					view: 'admin/views/shops.account.add.html'
				},
				add: {
					path: '/admin/shops/add',
					controller: 'AdminShopAccountAddCtrl',
					view: 'admin/views/shops.account.add.html'
				}
			},
			type: {
				list: {
					path: '/admin/shoptypes',
					controller: 'AdminShopTypeListCtrl',
					view: 'admin/views/shops.type.list.html'
				},
				detail: {
					path: '/admin/shoptypes/:id',
					controller: 'AdminShopTypeAddCtrl',
					view: 'admin/views/shops.type.add.html'
				},
				add: {
					path: '/admin/shoptypes/add',
					controller: 'AdminShopTypeAddCtrl',
					view: 'admin/views/shops.type.add.html'
				}
			}
		},
		account: {
			list: {
				path: '/admin/accounts',
				controller: 'AdminAccountListCtrl',
				view: 'admin/views/accounts.list.html'
			},
			detail: {
				path: '/admin/accounts/:id',
				controller: 'AdminAccountAddCtrl',
				view: 'admin/views/accounts.add.html'
			},
			add: {
				path: '/admin/accounts/add',
				controller: 'AdminAccountAddCtrl',
				view: 'admin/views/accounts.add.html'
			}
		},
		role: {
			list: {
				path: '/admin/roles',
				controller: 'AdminRoleListCtrl',
				view: 'admin/views/roles.list.html'
			},
			detail: {
				path: '/admin/roles/:id',
				controller: 'AdminRoleAddCtrl',
				view: 'admin/views/roles.add.html'
			},
			add: {
				path: '/admin/roles/add',
				controller: 'AdminRoleAddCtrl',
				view: 'admin/views/roles.add.html'
			}
		},
		promotion: {

		},
		report: {

		},
		other: {

		}
	},
	/* Login page */
	login: {
		path: '/login',
		controller: 'LoginCtrl',
		wrapperClass: 'wrapper-login',
		view: 'core/views/login.html'
	}
};
/**
 * Menu declaration
 */	
var menu = {
	seller: {
		'Home|fa-home': {

		},
		'Orders|fa-inbox': {

		},
		'Product|fa-tag': {
			'View': [route.seller.product.list, route.seller.product.detail],
			'Add': 	[route.seller.product.select, route.seller.product.add],
			'Import': route.seller.product.import,
			'Export': route.seller.product.export,
			'Local Categories|margin-top-30': route.seller.category,
			'Product Reviews': route.seller.product.review,
			'Image Management': route.seller.product.image
		},
		'Inventory|fa-archive': {
			'View': route.seller.inventory
		},

		'Promotion|fa-bookmark': {
			'Coupons': route.seller.promotion.coupon
		},

		'Shop Setting|fa-sliders': {
			'Shop Profile': route.seller.shop.profile,
			'Shop Appearance': route.seller.shop.appearance
		},

		'Report|fa-line-chart': {

		},
		'Account|fa-user': {
			'User Accounts': route.seller.user.account,
			'User Roles': route.seller.user.role
		}
	},
	admin: {
		'Products|fa-tag': {
			'View All Products': [route.admin.product.list, route.admin.product.detail],
			'Approve Products': [route.admin.product.approve],
			'Master Products': [route.admin.product.master],
			'Brands': [route.admin.brand.list, route.admin.brand.add, route.admin.brand.detail],
			'Attributes': [route.admin.attribute.list, route.admin.attribute.add, route.admin.attribute.detail],
			'Attribute Sets': [route.admin.attributeset.list, route.admin.attributeset.add, route.admin.attributeset.detail],
			'Global Category': route.admin.category
		},
		'Accounts|fa-user': {
			'Shop Accounts': [route.admin.shop.account.list, route.admin.shop.account.add, route.admin.shop.account.detail],
			'Shop Types': [route.admin.shop.type.list, route.admin.shop.type.add, route.admin.shop.type.detail],
			'Admin Accounts': [route.admin.account.list, route.admin.account.add, route.admin.account.detail],
			'Admin Roles': [route.admin.role.list, route.admin.role.add, route.admin.role.detail]
		},
		'Promotion|fa-bookmark': {
		},
		'Reports|fa-line-chart': {
		},
		'Others|fa-sliders': {
		}
	}
};
/* Export module */
module.exports = {
  route: route,
  menu: menu
};