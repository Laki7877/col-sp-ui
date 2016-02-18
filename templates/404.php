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
          margin-top: 200px;
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
    <img src="/assets/img/seller_logo.png" height="85"/><br><br>
    <p><b>404 Page not found</b>
    </p>
    <p>The page or resource you requested <ins><?= parse_url($_SERVER['REQUEST_URI'])['path'] ?></ins>
    </br>
    does not exist.
    </p>
    <a class='btn btn-primary' href="/">Go Home</a>
</body>

</html>
