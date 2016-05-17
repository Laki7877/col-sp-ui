<?php

class LoginController extends Controller
{
	public static function index($params)
	{
		return View::render('login');
	}

	public static function indexAdmin($params)
	{
		return View::render('login_admin');
	}
}
