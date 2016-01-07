<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label"><?= $label ?></label></div>
	<div class="width-field-normal">
		<div class="radio multiple-radio multiline">
			<? foreach ($choices as $key => $choice): ?>
				<label><input type="radio" name="todo--change-name" class="<?= $input_class; ?>" value="<?= $key ?>" 
				<?php if(isset($ng_model)): ?>
					ng-model="<?=$ng_model?>"
				<?php endif; ?>
			><?=$choice?></label>
			<? endforeach ?>
		</div>
	</div>
</div>