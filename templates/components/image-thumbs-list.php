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
	<li class="list-section-break" ng-if="<?=$sep?>" ng-repeat-start="item in <?=$images?>">
	</li>
	<li class="list-item" ng-repeat-end="">
		<? $this->insert('components/image-thumbs-actions-'. $action, [
			"image" => "item", 
			"image_url" => "item.src",
			"array" => $images ]) ?>
	</li>
</ul>