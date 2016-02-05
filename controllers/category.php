<?php

class CategoryController extends Controller
{
	public static function index($params)
	{
		return View::render('local_category');
	}
}