<?php
require __DIR__ . '/unicorn.php';
includeAll(__DIR__ . '/../controllers/*.php');

//index
Route::add('/', 'ProductController::index');

//product routing
Route::add('/products', 'ProductController::index');
Route::add('/products/add', 'ProductController::add');
Route::add('/products/select', 'ProductController::select');
Route::add('/products/:productid', 'ProductController::edit');
//attribute routing
Route::add('/admin/attributes/add','AdminController::add');
Route::add('/admin/attributes','AttributeController::index');
//attribute set rounting
Route::add('/admin/attributesets/add','AttributeSetController::add');
Route::add('/admin/attributesets','AttributeSetController::index');
//admin routing
Route::add('/admin/categories', 'GlobalCategoryController::add');
//seller category routing
Route::add('/categories', 'LocalCategoryController::add');

Route::add('/test/:name', 'TestController::any');

Route::process();
