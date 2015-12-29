<?php
/**
 *  Lite Unicorn framework - League Plate Template adapted
 *  
 * 
 *  @version 1.0.0
 *  @author poonwu <poon.wuthi@gmail.com>
 */

require __DIR__.'/../vendor/autoload.php';

/**
 * Simple Directory includer
 */
function includeAll($uri)
{
	foreach (glob($uri) as $filename)
	{
		include $filename;
	}
}

/**
 * Route class
 */
class Route
{
	private static $_routes = [];
	private static $_currentRoute = null;

	// add new route
	public static function add($uri, $method, $id = null)
	{
		$tokens = explode('/', $uri);
		$params = [];

		foreach ($tokens as &$t) {
			// get param name
			if(substr($t, 0, 1) == ':') 
			{
				$param = substr($t, 1);
				$params[] = $param;
				$t = '([\w]+)';
			}
		}

		self::$_routes[] = [
			'uri'			=> $uri,
			'pattern' 		=> implode('\/', $tokens),
			'params' 		=> $params,
			'method'		=> $method,
			'id'			=> $id
		];
	} 

	// process route
	public static function process() 
	{
		// base uri
		$uri = $_SERVER['REQUEST_URI'];

		// match route uri
		foreach (self::$_routes as $route) 
		{
			$routePattern = $route['pattern'];
			$len = preg_match("#^$routePattern$#", $uri, $out);
			
			if ($len != false) 
			{
				// get uri params
				$params = [];
				for ($i=1; $i < count($out); $i++) 
				{ 
					$params[$route['params'][$i-1]] = $out[$i];
				}
				self::$_currentRoute = $route;
				
				// pass to controller
				if (is_string($route['method'])) 
				{
					return call_user_func_array($route['method'], array($params));
				}
				else
				{
					return $route['method']($params);
				}
			}
		}

		// no match
		// TODO: change this
		self::$_currentRoute = null;
		die('not found 404');
	}
}

/**
 * View class
 */
class View
{
	private static $templates;
	public static function init() 
	{
		self::$templates = new League\Plates\Engine(__DIR__.'/../templates');
		self::$templates->loadExtension(new League\Plates\Extension\Asset(__DIR__));
	}
	public static function render($page, $params = [])
	{
		echo self::$templates->render($page, $params);
	}
}

/**
 * Controller class
 */
class Controller
{

}

// Make sure view initialized
View::init();