<!doctype html>
<html class="no-js" lang="" ng-app="colspApp">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>
        <?=$title?>
    </title>
    <meta http-equiv="expires" content="Sun, 01 Oct 2016 00:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="<?= $this->asset('/assets/favicon.ico') ?>">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="stylesheet" href="<?=$this->asset('/assets/css/screen.css')?>" />
    <link rel="stylesheet" href="<?=$this->asset('/assets/libs/angular-bootstrap-datetimepicker/datetimepicker.css')?>" />

    <script src="<?= $this->asset('/assets/js/jquery.min.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/jquery.rest.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/bundle.js') ?>"></script>

    <script src="<?= $this->asset('/assets/js/bootstrap.min.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/bootstrap-fixconflict.js') ?>"></script>
</head>

<body class="ahpt" ng-cloak ng-controller="RootCtrl">
    <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <div id="wrapper">
    	<ng-view></ng-view>
    </div>
    <script src="<?= $this->asset('/assets/js/jquery-ui.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/jquery.ui.nestedSortable.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/custom-js.js') ?>"></script>
    <script src="/assets/libs/ckeditor/ckeditor.js"></script>
    <script src="/assets/libs/ckeditor/config.js"></script>
    <script src="/assets/libs/moment/moment.min.js"></script>

    <script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">
    <link rel="stylesheet" type="text/css" href="/assets/libs/angular-select2/select.css">
</body>

</html>
