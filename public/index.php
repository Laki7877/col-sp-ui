<?php
require __DIR__ . '/unicorn.php';
includeAll(__DIR__ . '/../controllers/*.php');


//LOL redirect functions
class Redirect {
	public static function index($params) {
		header('Location: /products');
	}
	public static function admin($params) {
		header('Location: /admin/categories');
	}
}

//index
Route::add('', 'Redirect::index');
Route::add('/', 'Redirect::index');
Route::add('/admin', 'Redirect::admin');

//product routing
Route::add('/products', 'ProductController::index');
Route::add('/products/add', 'ProductController::add');
Route::add('/products/select', 'ProductController::select');
Route::add('/products/images', 'ProductController::images');
Route::add('/products/:productid', 'ProductController::edit');

//category routing
Route::add('/categories', 'CategoryController::index');

//admin routing
Route::add('/admin/attributes/add','AdminController::addAttribute');
Route::add('/admin/attributes/:id','AdminController::editAttribute');
Route::add('/admin/attributes','AdminController::listAttribute');
Route::add('/admin/attributesets/add','AdminController::addAttributeSet');
Route::add('/admin/attributesets','AdminController::listAttributeSet');
Route::add('/admin/attributesets/:id','AdminController::editAttributeSet');
Route::add('/admin/categories', 'AdminController::category');
Route::add('/admin/brands', 'AdminController::listBrand');
Route::add('/admin/brands/add', 'AdminController::addBrand');
Route::add('/admin/brands/:id', 'AdminController::editBrand');
Route::add('/admin/accounts', 'AdminController::listAccount');
//test route
Route::add('/test/:name', 'TestController::any');

Route::process();
