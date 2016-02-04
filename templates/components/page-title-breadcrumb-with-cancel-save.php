<?php
$extracted = explode('/', $text);
$extracted = array_map(function($item, $idx) {
  return "<a class=\"ah-breadcrumb-path ah-breadcrumb-idx-$idx\">".$item.'</a>';
}, $extracted, array_keys($extracted));
$newText = implode('<span class="ah-breadcrumb-splitter">/</span>', $extracted);

if (! isset($border_class)) {
	$border_class = 'with-border';
}

?>

<div class="page-header <?=$border_class?>">
    <h1 class="float-left page-header-title ah-breadcrumb"><?= $newText ?></h1>
    <div class="page-actions float-right">
		<a class="btn btn-white btn-width-xl" href="?p=<?= $link ?>">Cancel</a>
		<a class="btn btn-blue btn-width-xl" href="?p=<?= $link ?>">Save</a>
	</div>
</div>


