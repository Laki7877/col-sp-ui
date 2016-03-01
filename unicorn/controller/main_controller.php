<?php

class Redirect {
	public static function index($params) {
        return View::render('main');
	}
	public static function admin($params) {
		header('Location: /admin/accounts');
	}
    public static function exception($params) {
		return View::render('exception');
	}
}
