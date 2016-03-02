<!doctype html>
<html class="no-js" lang="" ng-app="colsp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title ng-bind-template="{{$route.current.title}}">Central Online</title>
    <meta http-equiv="expires" content="Sun, 01 Oct 2016 00:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="/assets/favicon.ico">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="stylesheet" href="/assets/css/screen.css" />
    <link rel="stylesheet" href="/assets/libs/angular-bootstrap-datetimepicker/datetimepicker.css" />

    <script src="/assets/js/jquery.min.js"></script>
    <script src="/assets/js/jquery.rest.js"></script>
    <script src="/assets/js/vendor.js"></script>
    <script src="/assets/js/bundle.js"></script>
    <script src="/assets/js/bootstrap.min.js"></script>
    <script src="/assets/js/bootstrap-fixconflict.js"></script>
    <script src="/assets/libs/ckeditor/ckeditor.js"></script>
    <script src="/assets/libs/ckeditor/config.js"></script>
    <script src="/assets/libs/moment/moment.min.js"></script>
    <script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>
</head>
<body class="ahpt" ng-cloak 
    ng-controller="RootCtrl" 
    ng-init="$root.initialize(<?php echo htmlspecialchars(json_encode($_POST)) ?>, <?php echo htmlspecialchars(json_encode($_GET)) ?>)">
    <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <div class="{{$route.current.wrapperClass}}">
        <!-- Sidebar -->
        <div ng-if="$route.current.menu" id="sidebar-wrapper">
            <!-- Logo -->
            <div class="logo-img-wrapper">
                <img class="logo-img" src="/assets/img/seller_logo.png" />
            </div>
            <!-- Main menu -->
            <ul class="sidebar-nav no-padding">
                <li ng-repeat="menuItem in $route.current.menu track by $index" class="sidebar-brand {{activeMenuItem(menuItem)}}" ng-mouseenter="menuItem.hover=true" ng-mouseleave="menuItem.hover=false">
                    <i class="fa fa-fw sidebar-font-awesome {{menuItem.icon}}"></i>
                    <a ng-href="{{menuItem.url}}">{{menuItem.header}}</a>
                </li>
            </ul>
            <!-- Submenu --> 
            <ul ng-if="menuItem.submenu.length > 0" ng-repeat="menuItem in $route.current.menu track by $index" class="sub-sidebar" ng-show="menuItem.hover" ng-mouseenter="menuItem.hover=true" ng-mouseleave="menuItem.hover=false">
                <li class="sub-sidebar-header">{{menuItem.header}}</li>
                <li ng-repeat="submenuItem in menuItem.submenu track by $index" class="{{ activeSubmenuItem(submenuItem) }} {{ submenuItem.css }} {{ $index == 0 ? 'margin-top-20' : '' }} item">
                    <a ng-if="submenuItem.url.length > 0" ng-href="{{ submenuItem.url }}">{{ submenuItem.header }}</a>
                </li>
            </ul>
        </div>
        <!-- Main -->
        <div id="page-content-wrapper">
            <!-- Header bar (User info) -->
            <div ng-if="$route.current.headerView"></div>
            <!-- Page body -->
            <div class="container-fluid">
                <div id="page-body-wrapper">
                    <div class="row">
                        <div class="col-xs-12" ng-include-ex="$route.current.view"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">
    <link rel="stylesheet" type="text/css" href="/assets/libs/angular-select2/select.css">
</body>

</html>
