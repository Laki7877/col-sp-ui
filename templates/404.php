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
        
        html {
            background: #fff;
            color: #222;
            padding: 15px
        }
        
        body {
            margin: 7% auto 0;
            max-width: 390px;
            min-height: 180px;
            padding: 30px 0 15px
        }
        
        p {
            margin: 11px 0 22px;
            overflow: hidden
        }
        
        ins {
            color: #777;
            text-decoration: none
        }
        
        a img {
            border: 0
        }
        
        @media screen and (max-width:772px) {
            body {
                background: none;
                margin-top: 0;
                max-width: none;
                padding-right: 0
            }
        }
        
        #logo {
            background: url(/assets/img/seller_logo.png) no-repeat;
            background-size: auto auto;
            margin-left: -5px
        }
        
        @media only screen and (min-resolution:192dpi) {
            #logo {
                background: url(//www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png) no-repeat 0% 0%/100% 100%;
                -moz-border-image: url(//www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png) 0
            }
        }
        
        @media only screen and (-webkit-min-device-pixel-ratio:2) {
            #logo {
                background: url(//www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png) no-repeat;
                -webkit-background-size: 100% 100%
            }
        }
        
        #logo {
            display: inline-block;
            height: 94px;
            width: 350px
        }
    </style>
</head>

<body>
    <a href="/"><img src="/assets/img/seller_logo.png" height="85" /></a>
    <p><b>404 Page not found</b>
    </p>
    <p>The page or resource you requested <ins><?= parse_url($_SERVER['REQUEST_URI'])['path'] ?></ins>
    </br>
    does not exist.
    </p>
    <a class='btn btn-primary' href="/">Go Home</a>
</body>

</html>