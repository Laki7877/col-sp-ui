<?
$inputSize = "width-field-normal";
if (isset($size)) $inputSize = "width-field-$size";
?>
<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
	<div class="<?= $inputSize ?>">
		<div type="text" id="get_file" class="width-100-percent form-control get_file" href="#" placeholder="<?=$placeholder?>" ><span class="color-grey"><?= $input_attrs?></span></div>
		<i class="fa fa-folder-open fa-lg color-dark-grey fa-input-icon"></i>
		<? if (!empty($hint)): ?>
			<div class="help-block"><?= $hint ?></div>
		<? endif ?>
	</div>

	<!-- <input type="button" id="get_file" value="Grab file"> -->
	<input type="file" id="my_file" class="my_file">
</div>