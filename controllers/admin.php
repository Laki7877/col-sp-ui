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
	
	public static function listBrand($params)
	{
		return View::render('admin_brand');
	}

	public static function editAttribute($params)
	{
		return View::render('admin_add_attribute', ["params" =>  json_encode_n($params), "title" => "{{formData.AttributeNameEn}}"]);
	}

	public static function addAttribute($params)
	{
		return View::render('admin_add_attribute');
	}

	public static function addAttributeSet($params)
	{
		return View::render('admin_add_attribute_set');
	}
	public static function addAttributeEdit($params)
	{
		return View::render('admin_add_attribute', ["params" =>  json_encode_n($params), "title" => "{{formData.AttributeNameEn}}"]);
	}
	public static function addBrand($params)
	{
		return View::render('admin_add_brand');
	}
}