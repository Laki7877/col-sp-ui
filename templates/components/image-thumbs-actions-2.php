<?php
	if(!isset($array))
		$array = "null";
?>
<div class="image-thumbs-actions">
	<div class="image-thumbs-img-wrapper">
		<img ng-src="{{ <?=$image_url?>.length > 0 && <?= $image_url ?> || '/assets/img/loader.gif'	}}" />
	</div>
	<div class="actions-wrapper actions-2">
		<a class="action" ng-click="$emit('zoom', <?= $image ?>, <?= $array ?>, $index, <?= $uploader ?>)"><i class="fa fa-search-plus"></i></a>
		<a class="action" ng-click="$emit('delete', <?= $image ?>, <?= $array ?>, $index, <?= $uploader ?>)"><i class="fa fa-trash"></i></a>
	</div>
</div>