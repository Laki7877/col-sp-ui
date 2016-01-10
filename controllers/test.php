<?php

class TestController extends Controller
{
	public static function any($params) 
	{
		return View::render($params['name']);
	}
}