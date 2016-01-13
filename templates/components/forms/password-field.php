<?
$inputSize = "width-field-normal";
if (isset($size)) $inputSize = "width-field-$size";
?>
<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
	<div class="<?= $inputSize ?>">
		<div class="input-password">
			<input type="password" class="form-control <?= $input_class; ?>" placeholder="<?=$placeholder?>" <?=$input_attrs?> />
			<i class="fa fa-eye fa-lg color-theme input-password-eye"></i>
		</div>
		<? if (!empty($hint)): ?>
			<span class="help-block"><?= $hint ?></span>
		<? endif ?>
		<? if (!empty($error_message)): ?>
			<span class="help-block color-red"><?= $error_message ?></span>
		<? endif ?>
	</div>
	<? if (!empty($tooltip)): ?>
		<div class="width-field-tooltip no-padding-left"><i class="fa fa-2x fa-question-circle color-grey" data-toggle="btooltip" data-placement="right" title="<?= $tooltip ?>"></i></div>
	<? endif ?>
	<? if (!empty($loading)): ?>
		<div class="no-padding-left"><img class="logo-img" src="<?= $this->asset('/assets/img/loader.gif') ?>" width="30" /></div>
	<? endif ?>
</div>