<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
	<div class="width-field-normal">
		<div class="input-with-unit">
			<input type="text" class="form-control	<?= $input_class; ?>"

			<? if(isset($required)): ?>
				required
			<? endif; ?>

			<? if(isset($ng_model)): ?>
				ng-model="<?php echo $ng_model; ?>"
			<? endif; ?>

			<? if(isset($value)): ?>
				ng-model="<?php echo $value; ?>"
			<? endif; ?>

			placeholder="<?=$placeholder?>" />
			<span class="input-unit"><?=$unit?></span>
		</div>
	</div>
</div>
