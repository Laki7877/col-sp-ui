<?php

class Buy1Get1Controller extends Controller
{
	public static function index($params) 
	{
		return View::render('list_buy1_get1');
	}

	public static function add($params)
	{
		return View::render('add_buy1get1', [
			'title' => 'Add Buy 1 Get 1',
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
		return View::render('import_buy1get1', [
				'title' => 'Import Buy 1 Get 1 '
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
