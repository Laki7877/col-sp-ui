<?php 

class ShopController extends Controller {
    public static function settings($params) {
        return View::render('seller_shop_setting', [
			'viewBag' => array('id' => $params['id'])
		]);
    }
}