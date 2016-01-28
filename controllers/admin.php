<?php

class AdminController extends Controller
{
	public static function category($params)
	{
		return View::render('admin_category');
	}

	public static function listAttribute($params)
	{
		$params['success'] = $_POST['success'];
		return View::render('admin_attribute', ['params' => json_encode_n($params)]);
	}

	public static function listAccount($params){
		return View::render('admin_account');
	}

	public static function listAttributeSet($params)
	{
		$params['success'] = $_POST['success'];
		return View::render('admin_attribute_set', ['params' => json_encode_n($params)]);
	}

	public static function listBrand($params)
	{
		return View::render('admin_brand');
	}

	public static function editAttribute($params)
	{
		return View::render('admin_add_attribute', ['params' =>  json_encode_n($params), 'title' => '{{formData.AttributeNameEn}}']);
	}

	public static function addAttribute($params)
	{
		return View::render('admin_add_attribute', ['title' => 'Add Attribute']);
	}

	public static function addAttributeSet($params)
	{
		return View::render('admin_add_attribute_set', ['title' => 'Add Attribute Set']);
	}
	public static function editAttributeSet($params)
	{
		return View::render('admin_add_attribute_set', ['params' =>  json_encode_n($params), 'title' => '{{formData.AttributeSetNameEn}}']);
	}
	public static function addBrand($params)
	{
		return View::render('admin_add_brand' , ['title' => 'Add Brand']);
	}
	public static function editBrand($params)
	{
		return View::render('admin_add_brand',  ['params' =>  json_encode_n($params), 'title' => '{{formData.BrandNameEn}}']);
	}
}
