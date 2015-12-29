<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
	<div class="width-field-normal">
		<div class="checkbox multiple-checkbox">
			<? foreach ($choices as $choice): ?>
				<label class="<?= $checkbox_class; ?>"><input type="checkbox" class="<?= $input_class; ?>"> <?= $choice ?></label>
			<? endforeach ?>
		</div>
	</div>
</div>