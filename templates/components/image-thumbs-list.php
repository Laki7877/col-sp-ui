<?php
	if(!isset($images)) $images = "[]";
	if(isset($sep)) {
		$sep = ' $index == '. $sep;
	}
	else {
		$sep = '';
	}
?>
<ul class="image-vertical-list">
	<li class="list-section-break" ng-if="<?=$sep?>" ng-repeat-start="item in <?=$images?> track by $index">
	</li>
	<li class="list-item" ng-repeat-end="">
		<div><? $this->insert('components/image-thumbs-actions-'. $action, [
			"image" => "item", 
			"image_url" => "item.url",
			"array" => $images,
			"uploader" => $uploader ]) ?>
		</div>
		<div style="text-align:center; padding-top: 10px; color: grey" ng-if="$index == 0">
			<? if(!isset($ignore)):?>Featured Image<? endif; ?>
		</div>
	</li>
</ul>
