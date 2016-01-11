<?php
require __DIR__ . '/unicorn.php';
includeAll(__DIR__ . '/../controllers/*.php');

//product routing
Route::add('/', 'ProductController::index');
Route::add('/products', 'ProductController::index');
Route::add('/products/add', 'ProductController::add');
Route::add('/products/select', 'ProductController::select');
//attribute routing
Route::add('/attributes/add','AttributeController::add');
Route::add('/attributes','AttributeController::index');
//attribute set rounting
Route::add('/attributesets/add','AttributeSetController::add');
Route::add('/attributesets','AttributeSetController::index');
//admin routing
Route::add('/admin/category', 'GlobalCategoryController::add');
//seller category routing
Route::add('/category/add', 'LocalCategoryController::add');

Route::add('/test/:name', 'TestController::any');

Route::process();