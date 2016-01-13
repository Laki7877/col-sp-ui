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
Route::add('/', 'Redirect::index');
Route::add('/admin', 'Redirect::admin');

//product routing
Route::add('/products', 'ProductController::index');
Route::add('/products/add', 'ProductController::add');
Route::add('/products/select', 'ProductController::select');
Route::add('/products/:productid', 'ProductController::edit');

//category routing
Route::add('/categories', 'LocalCategoryController::add');

//admin routing
Route::add('/admin/attributes/add','AdminController::addAttribute');
Route::add('/admin/attributes/:id','AdminController::editAttribute');
Route::add('/admin/attributes','AdminController::listAttribute');
Route::add('/admin/attributesets/add','AdminController::addAttributeSet');
Route::add('/admin/attributesets','AdminController::listAttributeSet');
Route::add('/admin/categories', 'AdminController::category');

//test route
Route::add('/test/:name', 'TestController::any');

Route::process();
