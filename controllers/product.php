<?php

class ProductController extends Controller
{
	public static function index($params) 
	{
		return View::render('list_product');
	}

	public static function add($params)
	{
		return View::render('add_product', ['catid' => $_POST['category']]);
	}

	public static function select($params)
	{
		return View::render('global_category');
	}
}