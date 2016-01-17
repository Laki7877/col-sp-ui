<?
$inputSize = "button-size-normal";
if (isset($size)) $inputSize = "button-size-$size";
?>
<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
	<div class="<?= $inputSize ?>">
		<a class="<?= $inputSize ?> btn <?= $btnClass ?> btn-width-xl" href="#"><?= $buttonText?></a>
	</div>
	<? if (!empty($tooltip)): ?>
		<div class="width-field-tooltip no-padding-left"><i class="fa fa-2x fa-question-circle color-grey" data-toggle="btooltip" data-placement="right" title="<?= $tooltip ?>"></i></div>
	<? endif ?>
</div>