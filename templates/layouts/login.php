<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title><?=$title?></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="<?= $this->asset('/assets/favicon.ico') ?>">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <link rel="stylesheet" href="<?=$this->asset('/assets/css/screen.css')?>" />
        <script src="<?= $this->asset('/assets/js/jquery.min.js') ?>"></script>
        <script src="<?= $this->asset('/assets/js/bootstrap.min.js') ?>"></script>
        <script src="<?= $this->asset('/assets/js/bootstrap-fixconflict.js') ?>"></script>
    </head>
    <body class="ahpt">
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->       

        <div id="debug">
            <?= $this->section('debug') ?>
        </div>
        <div id="wrapper-login">
            <?= $this->section('content') ?>
        </div>
        <script src="<?= $this->asset('/assets/js/jquery-ui.js') ?>"></script>   
        <script src="<?= $this->asset('/assets/js/jquery.ui.nestedSortable.js') ?>"></script>   
        <script src="<?= $this->asset('/assets/js/custom-js.js') ?>"></script>
        <script src="/assets/libs/ckeditor/ckeditor.js"></script>
        <script src="/assets/libs/ckeditor/config.js"></script>
        <script src="/assets/libs/moment/moment.min.js"></script>
        
        <script src="/assets/libs/select2/js/select2.min.js"></script>
        <link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">
        
    </body>
</html>