<div class="form-group">
	<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
	<div class="width-field-normal">
		<select class="form-control <?= $input_class; ?>">
			<? foreach ($options as $option): ?>
				<option><?=$option?></option>
			<? endforeach ?>
		</select>
	</div>
</div>