<?php

class AdminController extends Controller
{
	public static function category($params)
	{
		return View::render('admin_category');
	}

	public static function attribute($params)
	{
		return View::render('admin_attribute');
	}

	public static function attributeSet($params)
	{
		return View::render('admin_attribute_set');
	}

	public static function attributeAdd($params)
	{
		return View::render('admin_attribute_add');
	}

	public static function attributeSetAdd($params)
	{
		return View::render('admin_attribute_set_add');
	}
}