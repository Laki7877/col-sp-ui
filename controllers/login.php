<?php

class LoginController extends Controller
{
	public static function index($params)
	{
		return View::render('login');
	}
}