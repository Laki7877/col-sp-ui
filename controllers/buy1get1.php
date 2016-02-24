<?php

class Buy1Get1Controller extends Controller
{
	public static function index($params) 
	{
		return View::render('list_buy1_get1');
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
}
