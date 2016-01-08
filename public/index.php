<?php
require __DIR__ . '/unicorn.php';
includeAll(__DIR__ . '/../controllers/*.php');

Route::add('/', 'ProductController::index');
Route::add('/products', 'ProductController::index');
Route::add('/products/add', 'ProductController::add');
Route::add('/products/select', 'ProductController::select');

Route::add('/attributes/add','AttributeController::add');



Route::add('/attributesets/add','AttributeSetController::add');

Route::process();