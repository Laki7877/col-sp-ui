<?
$inputSize = "width-field-normal";
if (isset($size)) $inputSize = "width-field-$size";
?>
<div class="form-group">
	<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
	<div class="<?= $inputSize ?>">
		<select class="form-control <?= $input_class; ?>" <?= $input_attrs ?> >
			<? foreach ($options as $option): ?>
				<option><?=$option?></option>
			<? endforeach ?>
		</select>
	</div>
	<? if (!empty($tooltip)): ?>
		<div class="width-field-tooltip no-padding-left"><i class="fa fa-2x fa-question-circle color-grey"></i></div>
	<? endif ?>
</div>