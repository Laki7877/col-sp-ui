<?php

class AdminController extends Controller
{
	public static function category($params)
	{
		return View::render('admin_category');
	}
    
    public static function detail($params)
	{
		return View::render('admin_product_detail',  [
            'title' => 'Product Detail',
            'viewBag' => array( 'productId' => $params['productid']),
        ]);
	}
    
    public static function approve($params)
	{
		return View::render('admin_product_approval');
	}

    public static function admin_coupons_list($params)
	{
		return View::render('admin_coupons');
	}
    
	public static function admin_coupons_edit($params)
	{
	  	return View::render('admin_coupons_detail',  [
        'viewBag' => array('id' => $params["id"])
    ]);
	}

    public static function admin_coupons_create($params)
	{
		return View::render('admin_coupons_detail');
	}
    
    public static function seller_coupons_create($params)
	{
		return View::render('seller_coupons_detail');
	}

    public static function seller_coupons($params)
	{
		return View::render('seller_coupons');
	}

    public static function allProducts($params)
    {
        return View::render('admin_all_products', []);
    }
	//Attribute
	public static function listAttribute($params)
	{
		$params['success'] = $_POST['success'];

		return View::render('admin_attribute', ['params' => json_encode_n($params)]);
	}

	public static function addAttribute($params)
	{
		return View::render('admin_add_attribute', ['title' => 'Add Attribute']);
	}

	public static function editAttribute($params)
	{
        return View::render('admin_add_attribute', ['params' => json_encode_n($params), 'title' => 'Attribute Detail']);
	}

	//Attribute set
	public static function listAttributeSet($params)
	{
		$params['success'] = $_POST['success'];

		return View::render('admin_attribute_set', ['params' => json_encode_n($params)]);
	}
	public static function addAttributeSet($params)
	{
		return View::render('admin_add_attribute_set', ['title' => 'Add Attribute Set']);
	}
	public static function editAttributeSet($params)
	{
        return View::render('admin_add_attribute_set', ['params' => json_encode_n($params), 'title' => 'Attribute Set Detail']);
	}

	//Brand
	public static function listBrand($params)
	{
		return View::render('admin_brand');
	}
	public static function addBrand($params)
	{
        return View::render('admin_add_brand', ['title' => 'Add Brand']);
	}
	public static function editBrand($params)
	{
        return View::render('admin_add_brand',  ['params' => json_encode_n($params), 'title' => 'Brand Detail']);
	}

	//Account
	public static function listAccount($params)
	{
		return View::render('admin_account');
	}
	public static function addAccount($params)
	{
        return View::render('admin_add_account', ['title' => 'Add Admin Account']);
	}
	public static function editAccount($params)
	{
        return View::render('admin_add_account',  ['params' => json_encode_n($params), 'title' => 'Admin Account Detail']);
	}

	//Role
	public static function listRole($params)
	{
		return View::render('admin_role');
	}
	public static function addRole($params)
	{
        return View::render('admin_add_role', ['title' => 'Add Admin Role']);
	}
	public static function editRole($params)
	{
        return View::render('admin_add_role',  ['params' => json_encode_n($params), 'title' => 'Admin Role Detail']);
	}

	//Shop
	public static function listShop($params)
	{
		return View::render('admin_shop_account');
	}
	public static function addShop($params)
	{
        return View::render('admin_add_shop_account', ['title' => 'Add Shop Account']);
	}
	public static function editShop($params)
	{
        return View::render('admin_add_shop_account',  ['params' => json_encode_n($params), 'title' => 'Shop Account Detail']);
	}

	//Shop types
	public static function listShoptype($params)
	{
		return View::render('admin_shop_type');
	}
	public static function addShoptype($params)
	{
        return View::render('admin_add_shop_type', ['title' => 'Add Shop Types']);
	}
	public static function editShoptype($params)
	{
        return View::render('admin_add_shop_type',  ['params' => json_encode_n($params), 'title' => 'Shop Type Detail']);
	}


    //On top credit
	public static function listOntopcredit($params)
	{
		return View::render('admin_ontopcredit');
	}
	public static function addOntopcredit($params)
	{
        return View::render('admin_add_ontopcredit', ['title' => 'Add Admin On top credit card']);
	}
	public static function editOntopcredit($params)
	{
        return View::render('admin_add_ontopcredit',  ['params' => json_encode_n($params), 'title' => 'Admin On Top Credit Card Detail']);
	}
}
