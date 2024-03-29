<?
$inputSize = "width-field-normal";
if (isset($size)) $inputSize = "width-field-$size";
?>
<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label <?= $label_class ?>"><?= $label ?></label></div>
	<div class="<?= $inputSize ?>">
		<textarea
			<?php if(isset($ng_model)): ?>
			ng-model="<?=$ng_model?>"
	
			<?php endif; ?>
	       	class="form-control" ng-ckeditor="ckOptions"></textarea>
	</div>
	<? if (!empty($tooltip)): ?>
		<div class="width-field-tooltip no-padding-left"><i class="fa fa-2x fa-question-circle color-grey" data-toggle="btooltip" data-placement="right" title="<?= $tooltip ?>"></i></div>
	<? endif ?>
</div>
