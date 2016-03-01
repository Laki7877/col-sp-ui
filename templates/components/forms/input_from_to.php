<?
$inputSize = "width-field-small-input";
if (isset($size)) $inputSize = "width-field-$size";
?>
<div class="form-group">
<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
	<div class="<?=$inputSize?>">
		<input type="text" class="form-control <?= $input_class; ?>" placeholder="<?=$placeholder?>" <?=$input_attrs?> />
	</div>
	<div class="width-label-extend"><label class="control-label <?=$label_class?>"><?= $label_extend ?></label></div>
	<div class="<?=$inputSize?>">
		<input type="text" class="form-control <?= $input_class; ?>" placeholder="<?=$placeholder?>" <?=$input_attrs?> />
	</div>
</div>