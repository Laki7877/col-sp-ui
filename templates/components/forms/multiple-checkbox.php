<div class="form-group">
	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
	<div class="width-field-normal">
		<div class="checkbox multiple-checkbox">
			<? foreach ($choices as $choice): ?>
				<label><input type="checkbox" class="<?= $input_class; ?>"> <?= $choice ?></label>
			<? endforeach ?>
		</div>
	</div>
</div>