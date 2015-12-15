<?php
require __DIR__.'/../vendor/autoload.php';

$templates = new League\Plates\Engine(__DIR__.'/../templates');
$templates->loadExtension(new League\Plates\Extension\Asset(__DIR__));

echo $templates->render('index', array());