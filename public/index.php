<?php
require __DIR__ . '/unicorn.php';
includeAll(__DIR__ . '/../controllers/*.php');

Route::add('/', 'ProductController::index');
Route::add('/products', 'ProductController::index');
Route::add('/products/add', 'ProductController::add');
Route::process();