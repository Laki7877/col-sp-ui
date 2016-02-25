<?php

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
		return View::render('add_product_collection', [
				'title' => 'Collections Detail',
				'viewBag' => array(
					'CMSId'=> $params['id']
				)
			]);
	}

	public static function import($params){
		return View::render('import_product_collection', [
				'title' => 'Import Collections'
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

	//not implement yet
	public static function addlist($params)
	{
		return View::render('add_product_collection', [
			'title' => 'Add Product',
			'viewBag' => array('catId' => $_POST['category'])
		]);
	}

	public static function cat($params) 
	{
		return View::render('list_product_collection');
	}

	public static function catadd($params) 
	{
		return View::render('list_product_collection');
	}

	public static function group($params) 
	{
		return View::render('list_product_collection');
	}

	public static function groupadd($params) 
	{
		return View::render('list_product_collection');
	}
	//end not implement yet
}
