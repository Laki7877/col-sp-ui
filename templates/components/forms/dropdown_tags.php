<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
	<div class="width-field-normal">
		<div class="ah-select2-dropdown">
			<select class="form-control select2-init" multiple="multiple">
				<? foreach ($choices as $choice): ?>
					<? if (in_array($choice, $default_choices)): ?>
						<option selected value="<?=$choice?>" class="<?= $input_class; ?>"><?=$choice?></option>
					<? else: ?>
						<option value="<?=$choice?>" class="<?= $input_class; ?>"><?=$choice?></option>
					<? endif ?>
				<? endforeach ?>
			</select>	
		</div>
	</div>
</div>