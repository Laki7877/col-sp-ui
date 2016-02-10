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
    <!-- Modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-loading">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h3 class="modal-title margin-bottom-20">Processing...</h3>
                    <div class="progress margin-0">
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                        </div>
                    </div>
                </div>
                <!-- end .modal-body -->
            </div>
            <!-- end .modal-content -->
        </div>
        <!-- end .modal-dialog -->
    </div>
    <!-- end .modal -->

    <div id="debug">
        <?= $this->section('debug') ?>
    </div>
    <div id="wrapper">
        <?= $this->section('content') ?>
    </div>
    <!--<script src="<?= $this->asset('/assets/js/jquery-ui.js') ?>"></script>-->
    <!-- <script src="<?= $this->asset('/assets/js/jquery.ui.nestedSortable.js') ?>"></script> -->
    <script src="<?= $this->asset('/assets/js/custom-js.js') ?>"></script>
    <script src="/assets/libs/ckeditor/ckeditor.js"></script>
    <script src="/assets/libs/ckeditor/config.js"></script>
    <script src="/assets/libs/moment/moment.min.js"></script>

    <script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">

    <!--<script src="/assets/libs/select2/js/select2.js"></script>-->
    <!--<link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">-->

    <!--<script src="/assets/libs/angular-select2/select.min.js"></script>-->
    <link rel="stylesheet" type="text/css" href="/assets/libs/angular-select2/select.css">

    <script>
        /*
        	    $('[ckeditor-initialize]').each(function(idx, textarea) {
                        CKEDITOR.replace( textarea );
                    });
                    $('.input-icon-calendar').datetimepicker({
                        format: "LL" // this is momentjs format make it show only date, no time will be show. see: http://momentjs.com/docs/#/displaying/format/
                    });

                    $.fn.select2.defaults.set("tokenSeparators", [",", " "]);
                    $.fn.select2.defaults.set("minimumResultsForSearch", Infinity);
                    var select2Init = $(".select2-init")
                    $(document).on('shown.bs.tab ready', select2Init.select2.bind(select2Init));

                    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

                    $('.image-drop-zone').on('dragover', function(e) {
                        var $this = $(this);
                        e.preventDefault();
                        $this.addClass('hover');
                    }).on('dragleave drop', function(e) {
                        var $this = $(this);
                        e.preventDefault();
                        $this.removeClass('hover');
                    });
                    $('[data-trigger="file"]').on('click', function(e) {
                        e.preventDefault();
                        var $this = $(this);
                        var target = $this.data('target');
                        $(target).trigger('click');
                    });
                    $('#product-images, #product-360').on('drop', function(e) {
                        e.preventDefault();
                        console.log(e.type);
                        //TODO: UPLOAD FILE WHEN USER DROPPED INTO DROPZONE
                        return false;
                    })
         */
    </script>


</body>

</html>