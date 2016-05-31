<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, minimum-scale=1, width=device-width">
    <title>Unexpected</title>
    <link rel="stylesheet" href="<?=$this->asset('/assets/css/screen.css')?>" />
    <script src="<?= $this->asset('/assets/js/bundle.js') ?>"></script>
    <link rel="shortcut icon" href="<?= $this->asset('/assets/favicon.ico') ?>">
    <style>
        * {
            margin: 0;
            padding: 0
        }

        html,
        code {
            font: 15px/22px arial, sans-serif
        }

        body {
            margin: 0 auto 0;
            max-width: 390px;
            color: #fff;
            background: #252D40;
        }

        p {
            margin: 11px 0 22px;
            overflow: hidden
        }

        ins {
            color: #4899DD;
            text-decoration: none
        }

        img{
          margin-top: 280px;
        }

        @media screen and (max-width:772px) {
            body {
                background: none;
                margin-top: 0;
                max-width: none;
                padding-right: 0
            }
        }

    </style>
</head>

<body>
    <img src="/assets/img/login_logo_horizontal.png" height="50"/><br><br>
    <h3><i class="fa fa-ban"></i> No Permission</h3>
    <p>You do not have the permission to enter this page
    </br>
    please contact Central administration team.
    </p>
</body>

</html>
