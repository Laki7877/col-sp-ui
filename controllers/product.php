<?php

class ProductController extends Controller
{
    public static function index($params)
    {
        return View::render('list_product');
    }

    public static function export($params)
    {
      return View::render('seller_export_products', [
          'viewBag' => array(
            'selectedProducts' =>  $_POST['selected_products'],
            'searchCriteria' => $_POST['search_criteria']
            ),
      ]);
    }
    
    public static function group($params) {
        return View::render('seller_product_grouping_add');
    }

    public static function groupCreate($param){
      return View::render('seller_pending_products_group_add', [
          'viewBag' => $_POST['selected_products'],
      ]);
    }

    public static function add($params)
    {
        return View::render('add_product', [
            'title' => 'Add Product',
            'viewBag' => array('catId' => $_POST['category']),
        ]);
    }

    public static function images($params)
    {
        return View::render('image_management');
    }

    public static function edit($params)
    {
        return View::render('add_product', [
                'title' => 'Product Detail',
                'viewBag' => array(
                    'productId' => $params['productid'],
                ),
            ]);
    }

    public static function import($params)
    {
        return View::render('seller_import_products', [
                'title' => 'Import Product',
        ]);
    }
    public static function importUpdate($params)
    {
        return View::render('seller_import_products', [
                'title' => 'Import Product',
                'update' => true
        ]);
    }

    public static function select($params)
    {
        return View::render('global_category');
    }

    public static function reviews($params)
    {
        return View::render('seller_product_review');
    }
}
