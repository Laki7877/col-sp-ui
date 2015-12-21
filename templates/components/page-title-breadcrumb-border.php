<?php
$extracted = explode('/', $text);
$extracted = array_map(function($item, $idx) {
  return "<span class=\"ah-breadcrumb-path ah-breadcrumb-idx-$idx\">".$item.'</span>';
}, $extracted, array_keys($extracted));
$newText = implode('<span class="ah-breadcrumb-splitter">/</span>', $extracted);
?>
<div class="page-header no-padding with-border">
    <h1 class="float-left page-header-title ah-breadcrumb"><?= $newText ?></h1>
</div>