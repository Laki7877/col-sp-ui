/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handles parsing routev1
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
	.provider('router', function (route) {
		/**
		 * Create renderable tree-array of menu items from tree-object
		 *
		 * @method     generateMenu
		 * @param      {Object}  routeMenu  Tree-object
		 * @return     {Array}   Tree-array
		 */
		var generateMenu = function (routeMenu) {
			var menu = [];
			_.forOwn(routeMenu, function(object, header) {
				var token = header.split('|');
				var menuItem = {
					header: token[0],
					submenu: []
				};

				if(token.length > 1) {
					menuItem.icon = token[1];
				}

				if(!_.isEmpty(object)) {
					_.forOwn(object, function(routeObj, subheader) {
						var urls = [];
						var url = null;
						if(_.isString(routeObj)) {
							url = routeObj;
						}
						else if(_.isArray(routeObj)) {
							_.forEach(routeObj, function(v, k) {
								if(k == 0) {
									url = _.isObject(v) ? v.path : v;
									urls.push(url);
								}
								urls.push(_.isObject(v) ? v.path : v);
							});
						} else if(_.isObject(routeObj)) {
							url = routeObj.path;
						}
						var token2 = subheader.split('|');
						var submenuItem = {
							header: token2[0],
							css: '',
							url: url,
							urls: urls
						};
						
						if(token2.length > 1) {
							submenuItem.css += token2[1];
						}

						menuItem.submenu.push(submenuItem);
					});
					if(menuItem.submenu.length > 0) {
						menuItem.url = menuItem.submenu[0].url;
					}
				}

				menu.push(menuItem);
			});
			return menu;
		};
		/**
		 * Check if path match with matcher
		 *
		 * @method     isActive
		 * @param      {string}   matcher     url-formated string
		 * @param      {string}   path    relative path
		 * @return     {boolean}  is match
		 */
		var isActive = function (matcher, path) {
			var regex = new RegExp('^' + matcher.replace(/\:[a-zA-Z0-9_]+/g, '[A-Z0-9_-]+') + '$');
			return regex.test(path);
		};
		/**
		 * Parse get params
		 *
		 * @method     getParams
		 * @param      {string}  matcher  { description }
		 * @param      {<type>}  path     { description }
		 */
		var getParams = function (matcher, path) {
			var tmp = matcher.split('/');
			var tokens = [];
			for (var i = 0; i < tmp.length; i++) {
				if(tmp[i].startsWith(':')) {
					tokens.push(tmp[i].substring(1));
				}
			}
			//check if token exist
			if(tokens.length > 0) {
				var regex = new RegExp('^' + matcher.replace(/\:[a-zA-Z0-9_]+/g, '([A-Z0-9_-])+') + '$');
				var match = regex.exec(path);
				var obj = {};
				_.forEach(match, function(item) {
					obj[tokens.pop()] = item;
				});
				return obj;
			} else {
				//empty
				return {};
			}
		};
		var traverseRoute = function (tree, context) {
			if(_.has(tree, 'path')) {
				//is leaf
				if(isActive(tree.path, window.location.pathname)) {
					return _.extend({}, context, tree);
				} else {
					return null;
				}
			} else {
				//is branch
				var ctx = _.extend({}, context);
				if(_.has(tree, '$default')) {
					ctx = _.extend(ctx, tree.$default);
				}
				var subtree;
				_.forOwn(tree, function(v,k) {
					if(!k.startsWith('$')) {
						if(_.isNil(subtree))	 {
							subtree = traverseRoute(v, ctx);
						}
					}
				});
				return subtree;
			}
		};
		/* service bootstrap */
		this.$get = function($window) {
			'ngInject';
			//Current route object
			var currentPath = $window.location.pathname;
			var currentRoute = traverseRoute(route.route, {});
			//Assign menu
			if(!_.isNil(currentRoute) && !_.isNil(currentRoute.menu) && _.has(route.menu, currentRoute.menu)) {
				currentRoute.menu = generateMenu(route.menu[currentRoute.menu]);
			} else {
				currentRoute.menu = null;
			}
			return {
				isActive: function(matcher) {
					return isActive(matcher, currentPath);
				},
				currentPath: currentPath,
				current: currentRoute,
				route: route.route,
				GET: getParams(currentRoute.path, currentPath),
				POST: {}, //parse elsewhere
				go: function(path) {
					$window.location.href = _.get(this.route, path + '.path');
				},
				get: function(path) {
					return _.get(this.route, path + '.path');
				},

			};
		};
	});