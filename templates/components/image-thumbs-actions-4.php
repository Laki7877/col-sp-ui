<?php
	if(!isset($array))
		$array = "null";
?>
<div class="image-thumbs-actions">
	<div class="image-thumbs-img-wrapper">
		<img ng-show="<?=$image_url?> && <?=$image_url?>.length > 0" style="background-color:white;" ng-src="{{ <?=$image_url?>.length > 0 && <?= $image_url ?> }}" />
        <h4 style="text-align: center;margin-top:20%" class="color-grey ng-binding"><img src="/assets/img/loader.gif" height="55">
            <br/>
            <span ng-if="<?= $uploader ?>.queue[$index].progress < 100">
                {{ <?= $uploader ?>.queue[$index].progress }}%
            </span>
            <span ng-if="<?= $uploader ?>.queue[$index].progress == 100">
                Processing..
            </span>
        </h4>

	</div>
	<div class="actions-wrapper actions-4">
		<a class="action" ng-click="$emit('zoom', <?= $image ?>, <?= $array ?>, $index, <?= $uploader ?>)"><i class="fa fa-search-plus"></i></a>
		<a class="action" ng-click="$emit('delete', <?= $image ?>, <?= $array ?>, $index, <?= $uploader ?>)"><i class="fa fa-trash"></i></a>
		<a class="action" ng-click="$emit('left', <?= $image ?>, <?= $array ?>, $index, <?= $uploader ?>)"><i class="fa fa-arrow-left"></i></a>
		<a class="action" ng-click="$emit('right', <?= $image ?>, <?= $array ?>, $index, <?= $uploader ?>)"><i class="fa fa-arrow-right"></i></a>
	</div>
</div> 