<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
	<div class="width-field-normal">
		<div class="input-with-unit">
			<input type="text" class="form-control 

			<? if(isset($required)): ?>
			required
			<? endif; ?>
			<? if(isset($ng_model)): ?>
			ng-model="<?=$ng_model?>"
			<? endif; ?>

			<?= $input_class; ?>" 
			placeholder="<?=$placeholder?>" />
			<span class="input-unit"><?=$unit?></span>
		</div>
	</div>
</div>