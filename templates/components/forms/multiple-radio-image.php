<?
$inputSize = "width-field-normal";
if (isset($size)) $inputSize = "width-field-$size";
?>
<div class="form-group <?=$form_group_class?>">
<!-- 	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
 -->	<div class="col-xs-12 no-padding">
		<div class="radio multiple-radio">
			<? foreach ($choices as $key=>$choice): ?>
				<label class="<?=$label_class[$key]?> label_width">
					<input type="radio" name="todo--change-name" class="<?= $input_class; ?>"><?=$choice?>
					<img class="image_radion_thumbnail" src="/assets/img/200x112.png" alt="Can't open image" >
				</label>
			<? endforeach ?>
		</div>
	</div>
</div>