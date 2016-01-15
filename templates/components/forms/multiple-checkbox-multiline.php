<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
	<div class="width-field-normal">
		<div class="checkbox multiple-checkbox multiline">
			<? foreach ($choices as $choice): ?>
				<label><input type="checkbox" name="todo--change-name" class="<?= $input_class; ?>"><?=$choice?></label>
			<? endforeach ?>
		</div>
	</div>
</div>