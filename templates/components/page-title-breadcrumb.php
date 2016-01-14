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
?>
<div class="page-header no-padding">
    <h1 class="float-left page-header-title ah-breadcrumb">
    	<a href="\"<?= $newText ?>
    </h1>
    <div class="page-actions float-right">
              <button class="btn btn-white btn-width-xl" ng-show="formData.Status != 'WA'"  ng-click="preview()">Preview</button>
              <button class="btn btn-white btn-width-xl" ng-show="formData.Status != 'WA'"  type="submit"ng-click="publish('DF')">Save as Draft</button>
              <button ng-disabled="addProductForm.$invalid" ng-show="formData.Status != 'WA'" type="submit" class="btn btn-blue btn-width-xl" ng-click="publish('WA')">Publish</button>
	</div>
</div>