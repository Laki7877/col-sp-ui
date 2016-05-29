<?php

class ShopController extends Controller {
    public static function settings($params) {
        return View::render('seller_shop_setting');
    }

    public static function appearance($params) {
        return View::render('seller_shop_appearance');
    }
}
