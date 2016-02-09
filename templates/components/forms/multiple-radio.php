<?
$inputSize = "width-field-normal";
if (isset($size)) $inputSize = "width-field-$size";
?>
<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
	<div class="<?=$inputSize?>">
		<div class="radio multiple-radio">
			<? foreach ($choices as $key=>$choice): ?>
				<label class="<?=$label_class[$key]?>"><input type="radio" name="todo--change-name" class="<?= $input_class; ?>"><?=$choice?></label>
			<? endforeach ?>
		</div>
	</div>
</div>