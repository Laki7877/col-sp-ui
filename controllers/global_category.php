<?php

class GlobalCategoryController extends Controller
{
	public static function add($params)
	{
		return View::render('admin_category');
	}
}