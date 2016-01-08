<?php
class AttributeSetController extends Controller
{
	public static function add($params) 
	{
		return View::render('admin_add_attribute_set');
	}
}