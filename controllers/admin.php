<?php

class AdminController extends Controller
{
	public static function category($params)
	{
		return View::render('admin_category');
	}

	public static function listAttribute($params)
	{
		return View::render('admin_attribute');
	}

	public static function listAttributeSet($params)
	{
		return View::render('admin_attribute_set');
	}

	public static function addAttribute($params)
	{
		return View::render('admin_add_attribute');
	}

	public static function addAttributeSet($params)
	{
		return View::render('admin_add_attribute_set');
	}
}