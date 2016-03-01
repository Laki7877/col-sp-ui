<?php
require __DIR__ . '/unicorn.php';
includeAll(__DIR__ . '/controllers/*.php');

class Redirect {
	public static function index($params) {
        return View::render('main');
	}
	public static function admin($params) {
		header('Location: /admin/accounts');
	}
    public static function exception($params) {
		return View::render('exception');
	}
}

//index
Route::add('', 'Redirect::index');
Route::add('/', 'Redirect::index');
Route::add('/admin', 'Redirect::admin');
Route::add('/exception', 'Redirect::exception');

//login routing
Route::add('/login', 'LoginController::index');

//product routing
Route::add('/products', 'ProductController::index');
Route::add('/products/add', 'ProductController::add');
Route::add('/products/select', 'ProductController::select');
Route::add('/products/images', 'ProductController::images');
Route::add('/products/reviews', 'ProductController::reviews');
Route::add('/products/export', 'ProductController::export');
Route::add('/products/import/update', 'ProductController::importUpdate');
Route::add('/products/import', 'ProductController::import');
Route::add('/products/:productid', 'ProductController::edit');

//category routing
Route::add('/categories', 'CategoryController::index');

//Shop Setting tab
Route::add('/shops/settings', 'ShopController::settings');

//seller routing
Route::add('/accounts', 'SellerController::listAccount');
Route::add('/accounts/add', 'SellerController::addAccount');
Route::add('/accounts/:id', 'SellerController::editAccount');
Route::add('/roles', 'SellerController::listRole');
Route::add('/roles/add', 'SellerController::addRole');
Route::add('/roles/:id', 'SellerController::editRole');
Route::add('/inventory', 'SellerController::listInventory');

//admin routing
Route::add('/admin/attributes/add','AdminController::addAttribute');
Route::add('/admin/attributes/:id','AdminController::editAttribute');
Route::add('/admin/attributes','AdminController::listAttribute');
Route::add('/admin/attributesets/add','AdminController::addAttributeSet');
Route::add('/admin/attributesets/:id','AdminController::editAttributeSet');
Route::add('/admin/attributesets','AdminController::listAttributeSet');
Route::add('/admin/categories', 'AdminController::category');
Route::add('/admin/brands', 'AdminController::listBrand');
Route::add('/admin/brands/add', 'AdminController::addBrand');
Route::add('/admin/brands/:id', 'AdminController::editBrand');
Route::add('/admin/accounts', 'AdminController::listAccount');
Route::add('/admin/accounts/add', 'AdminController::addAccount');
Route::add('/admin/accounts/:id', 'AdminController::editAccount');
Route::add('/admin/roles', 'AdminController::listRole');
Route::add('/admin/roles/add', 'AdminController::addRole');
Route::add('/admin/roles/:id', 'AdminController::editRole');
Route::add('/admin/shops', 'AdminController::listShop');
Route::add('/admin/shops/add', 'AdminController::addShop');
Route::add('/admin/shops/:id', 'AdminController::editShop');
Route::add('/admin/shoptypes', 'AdminController::listShoptype');
Route::add('/admin/shoptypes/add', 'AdminController::addShoptype');
Route::add('/admin/shoptypes/:id', 'AdminController::editShoptype');
Route::add('/admin/products', 'AdminController::allProducts');
Route::add('/admin/approve', 'AdminController::approve');
Route::add('/admin/coupons/seller', 'AdminController::seller_coupons');
Route::add('/admin/coupons/seller/create', 'AdminController::seller_coupons_create');
Route::add('/admin/coupons/admin', 'AdminController::admin_coupons_list');
Route::add('/admin/coupons/admin/:id', 'AdminController::admin_coupons_edit');
Route::add('/admin/coupons/admin/create', 'AdminController::create_admin_coupons_create');
Route::add('/admin/coupons/admin', 'AdminController::admin_coupons');
Route::add('/admin/coupons/admin/create', 'AdminController::admin_coupons_create');
Route::add('/admin/ontopcredit', 'AdminController::listOntopcredit');
Route::add('/admin/ontopcredit/create', 'AdminController::addOntopcredit');
Route::add('/admin/ontopcredit/:id', 'AdminController::editOntopcredit');
//test route
Route::add('/test/:name', 'TestController::any');
