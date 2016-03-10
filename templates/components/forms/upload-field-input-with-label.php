<?
$inputSize = "width-field-normal";
if (isset($size)) $inputSize = "width-field-$size";
?>
<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
	<div class="<?= $inputSize ?> padding-top-6">
		<form action="">
		  <input class="no-border get_file" type="file" name="pic">
		</form>
	</div>
</div>