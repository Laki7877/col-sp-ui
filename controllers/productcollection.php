﻿<?php

class ProductCollectionController extends Controller
{
	public static function index($params) 
	{
		return View::render('list_product_collection');
	}

	public static function add($params)
	{
		return View::render('add_product_collection', [
			'title' => 'Add Product',
			'viewBag' => array('catId' => $_POST['category'])
		]);
	}

	public static function images($params){
		return View::render('image_management');
	}

	public static function edit($params){
		return View::render('add_product', [
				'title' => 'Product Detail',
				'viewBag' => array(
					'productId'=> $params['productid']
				)
			]);
	}

	public static function import($params){
		return View::render('import_product', [
				'title' => 'Import Product'
		]);
	}


	public static function select($params)
	{
		return View::render('global_category');
	}

	public static function reviews($params)
	{
		return View::render('product_review');
	}
}