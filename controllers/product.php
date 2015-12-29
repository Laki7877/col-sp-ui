<?php

class ProductController extends Controller
{
	public static function index($params) 
	{
		return View::render('index');
	}

	public static function add($params)
	{
		return View::render('add_product');
	}
}