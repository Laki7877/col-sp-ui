<?php
$extracted = explode('/', $text);
$extracted = array_map(function($item, $idx) {
  return "<a class=\"ah-breadcrumb-path ah-breadcrumb-idx-$idx\">".$item.'</a>';
}, $extracted, array_keys($extracted));
$newText = implode('<span class="ah-breadcrumb-splitter">/</span>', $extracted);
?>
<div class="page-header with-border">
    <h1 class="float-left page-header-title ah-breadcrumb"><?= $newText ?></h1>
    <div class="page-actions float-right">
		<button type="button" class="btn-white btn margin-right-10">
          <span class="">Export</span>
        </button>
        <button type="button" class="btn-white btn margin-right-10">
          <span class="">Import</span>
        </button>
        <button type="button" class="btn-blue btn btn-width-xl">
          <span class="">Add Product</span>
        </button>
	</div>
</div>