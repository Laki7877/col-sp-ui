<?php

class SellerController extends Controller
{
	//Account
	public static function listAccount($params)
	{
		return View::render('user_account');
	}
	public static function addAccount($params)
	{
		return View::render('user_add_account');
	}
	public static function editAccount($params)
	{
		return View::render('user_add_account',  ['params' =>  json_encode_n($params)]);
	}

	//Role
	public static function listRole($params)
	{
		return View::render('user_role');
	}
	public static function addRole($params)
	{
		return View::render('user_add_role');
	}
	public static function editRole($params)
	{
		return View::render('user_add_role',  ['params' =>  json_encode_n($params)]);
	}


	public static function inventory($params)
	{
		return View::render('seller_inventory');
	}
}