<?php
$extracted = explode('/', $text);
if(!isset($urls)) {
  $urls = [];
}
while(count($urls) < count($extracted)) {
	array_push($urls, "");
}
$extracted = array_map(function($item, $idx, $url) {
  return "<a href=\"$url\" class=\"ah-breadcrumb-path ah-breadcrumb-idx-$idx\">".$item.'</a>';
}, $extracted, array_keys($extracted), $urls);
$newText = implode('<span class="ah-breadcrumb-splitter">/</span>', $extracted);

if (! isset($border_class)) {
	$border_class = 'with-border';
}

?>

<div class="page-header <?=$border_class?>">
    <h1 class="float-left page-header-title ah-breadcrumb"><?= $newText ?></h1>
    <?php if(!isset($ignored)): ?>
    <div class="page-actions float-right">
		<a class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</a>
		<button class="btn btn-blue btn-width-xl" ng-click="save()"  ng-show="result == 100" ng-class="<?= $class ?>">Save</button>
	</div>
	<?php endif;?>
</div>


