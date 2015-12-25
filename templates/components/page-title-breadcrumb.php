<?php
$extracted = explode('/', $text);
$extracted = array_map(function($item, $idx) {
  return "<a class=\"ah-breadcrumb-path ah-breadcrumb-idx-$idx\">".$item.'</a>';
}, $extracted, array_keys($extracted));
$newText = implode('<span class="ah-breadcrumb-splitter">/</span>', $extracted);
?>
<div class="page-header no-padding">
    <h1 class="float-left page-header-title ah-breadcrumb"><?= $newText ?></h1>
    <div class="page-actions float-right">
		<button class="btn btn-white btn-width-xl">Preview</button>
		<button class="btn btn-white btn-width-xl">Save as Draft</button>
		<button class="btn btn-blue btn-width-xl">Publish</button>
	</div>
</div>