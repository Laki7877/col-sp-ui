<div class="form-group">
	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
	<div class="width-field-normal">
		<input type="text" class="form-control <?= $input_class; ?>" value="<?=$value?>" disabled="disabled" />
		<? if (!empty($hint)): ?><span class="help-block"><?= $hint ?></span><? endif ?>
	</div>
	<? if (!empty($tooltip)): ?>
		<div class="width-field-tooltip no-padding-left"><i class="fa fa-2x fa-question-circle color-grey" data-toggle="tooltip" data-placement="right" title="<?= $tooltip ?>"></i></div>
	<? endif ?>
</div>