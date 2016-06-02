<?php

class SellerController extends Controller
{
    //Account
    public static function listAccount($params)
    {
        return View::render('seller_account');
    }
    public static function addAccount($params)
    {
        return View::render('seller_add_account');
    }
    public static function editAccount($params)
    {
        return View::render('seller_add_account',  ['params' => json_encode_n($params)]);
    }
    //Role
    public static function listRole($params)
    {
        return View::render('seller_role');
    }
    public static function addRole($params)
    {
        return View::render('seller_add_role');
    }
    public static function editRole($params)
    {
        return View::render('seller_add_role',  ['params' => json_encode_n($params)]);
    }
    //Coupons
    public static function listCoupon($params)
    {
        return View::render('seller_coupons');
    }
    public static function addCoupon($params)
    {
        return View::render('seller_coupons_detail');
    }
    public static function editCoupon($params)
    {
        return View::render('seller_coupons_detail',  ['params' => json_encode_n($params)]);
    }
    //Coupons
    public static function listReturnRequest($params)
    {
        return View::render('seller_return');
    }
    public static function editReturnRequest($params)
    {
        return View::render('seller_return_detail',  ['params' => json_encode_n($params)]);
    }
    //Inventory
    public static function listInventory($params)
    {
        return View::render('seller_inventory');
    }
    //Newsletter
    public static function listNewsletter($params)
    {
        return View::render('seller_newsletters');
    }
    //Home
    public static function onboarding($params)
    {
        return View::render('seller_onboarding');
    }
    public static function dashboard($params)
    {
        return View::render('seller_dashboard');
    }
    //Order
    public static function listOrder($params)
    {
        return View::render('seller_order');
    }
    public static function editOrder($params)
    {
        return View::render('seller_order_detail',  ['params' => json_encode_n($params)]);
    }
    public static function shipOrder($params)
    {
        return View::render('seller_order_shipping_list');
    }
    
    //Report
	public static function report($params)
    {
        return View::render('seller_report',  ['params' => json_encode_n($params)]);
    }
	public static function listStandardReport($params) 
	{
		return View::render('seller_report_std_saleforseller');
	}

	public static function listStockReport($params) 
	{
		return View::render('seller_report_std_stockstatus');
	}

	public static function listOnHoldReport($params) 
	{
		return View::render('seller_report_std_itemonhold');
	}

	public static function listReturnReport($params) 
	{
		return View::render('seller_report_std_return');
	}

    public static function listOiReport($params) 
    {
        return View::render('seller_report_std_oi');
    }

    public static function listNonMoveReport($params) 
    {
        return View::render('seller_report_std_nonmove');
    }

    //CMS
    public static function listCMSCategory($params)
    {
        return View::render('seller_cms_category');
    }
    public static function addCMSCategory($params)
    {
        return View::render('seller_add_cms_category', ['title' => 'Add Category']);
    }
    public static function editCMSCategory($params)
    {
        return View::render('seller_add_cms_category', ['params' => json_encode_n($params), 'title' => 'Detail']);
    }
     public static function listCMSGroup($params)
    {
        return View::render('seller_cms_group');
    }
    public static function addCMSGroup($params)
    {
        return View::render('seller_add_cms_group', ['title' => 'Add CMS Group']);
    }
    public static function editCMSGroup($params)
    {
        return View::render('seller_add_cms_group', ['params' => json_encode_n($params), 'title' => 'CMS Group Detail']);
    }
    public static function listCMSMaster($params)
    {
        return View::render('seller_cms_master');
    }
    public static function addCMSMaster($params)
    {
        return View::render('seller_add_cms_master', ['title' => 'Add CMS Static & Collection']);
    }
    public static function editCMSMaster($params)
    {
        return View::render('seller_add_cms_master', ['params' => json_encode_n($params), 'title' => 'Detail']);
    }


}
