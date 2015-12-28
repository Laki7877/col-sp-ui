<?
$inputSize = "width-field-normal";
if (isset($size)) $inputSize = "width-field-$size";
?>
<div class="form-group">
	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
	<div class="<?= $inputSize ?>">
		<textarea class="form-control"></textarea>
	</div>
	<? if (!empty($tooltip)): ?>
		<div class="width-field-tooltip no-padding-left"><i class="fa fa-2x fa-question-circle color-grey" data-toggle="tooltip" data-placement="right" title="<?= $tooltip ?>"></i></div>
	<? endif ?>
</div>