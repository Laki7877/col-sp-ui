<!doctype html>
<html class="no-js" lang="" ng-app="colspApp">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?=$title?></title>
    <meta http-equiv="expires" content="Sun, 01 Oct 2045 00:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="<?= $this->asset('/assets/favicon.ico') ?>">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">
    <link rel="stylesheet" href="/assets/libs/select2/css/selectize.css">
    <link rel="stylesheet" href="/assets/libs/selectize/dist/css/selectize.default.css"/>
    <link rel="stylesheet" href="<?=$this->asset('/assets/css/screen.css')?>" />
    <link rel="stylesheet" href="<?=$this->asset('/assets/libs/angular-bootstrap-datetimepicker/datetimepicker.css')?>" />
    <script src="<?= $this->asset('/assets/js/jquery.min.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/jquery.rest.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/bundle.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/file-saver.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/bootstrap.min.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/bootstrap-fixconflict.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/jquery-ui.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/jquery.ui.nestedSortable.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/custom-js.js') ?>"></script>
    <script src="/assets/libs/ckeditor/ckeditor.js"></script>
    <script src="/assets/libs/ckeditor/config.js"></script>
    <script src="/assets/libs/ckfinder/ckfinder.js"></script>

    <script src="/assets/libs/moment/moment.min.js"></script>


    <script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>


    <?
      //Browser specific CSS Detection
      $msie = strpos($_SERVER["HTTP_USER_AGENT"], 'MSIE') ? true : false;
      $firefox = strpos($_SERVER["HTTP_USER_AGENT"], 'Firefox') ? true : false;
      $safari = strpos($_SERVER["HTTP_USER_AGENT"], 'Safari') ? true : false;
      $chrome = strpos($_SERVER["HTTP_USER_AGENT"], 'Chrome') ? true : false;

      //Default = ie
      $specificBrowser = 'ie';

      //Firefox
      if ($firefox) {
        $specificBrowser = 'firefox';
      }

      // Safari or Chrome
      if ($safari || $chrome) {
        $specificBrowser = 'webkit';
      }

      // IE - Not working yet
      if ($msie) {
        $specificBrowser = 'ie';
      }
    ?>

    <!-- Specific Stylesheet for each browser-->
    <link rel="stylesheet" href="/assets/css/<? echo $specificBrowser ?>.css" />

    <!--[if IE]>
      <link rel="stylesheet" href="/assets/css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <![endif]-->

</head>

<body id="body" class="ahpt" ng-cloak ng-controller="RootCtrl" ng-strict-di>
    <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <div ng-if="!$root.DisablePage">
        <div id="debug">
            <?= $this->section('debug') ?>
        </div>
        <div id="wrapper">
            <?= $this->section('content') ?>
        </div>
    </div>
    <link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">

    <!--<script src="/assets/libs/select2/js/select2.js"></script>-->
    <!--<link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">-->

    <!--<script src="/assets/libs/angular-select2/select.min.js"></script>-->
    <link rel="stylesheet" type="text/css" href="/assets/libs/angular-select2/select.css">


    <!-- <h4 style="text-align:center;">This is <? echo $specificBrowser ?> (For Test Server Only)</h4> -->

</body>

</html>
