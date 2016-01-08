<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
	<div class="width-field-xxl">
		<div class="multiple-input">
			<div class="input-column">
				<input type="text" class="form-control" 
					<?php if(isset($ng_model_dimension)): ?>
						ng-model="<?=$ng_model?>"
					<?php endif; ?>
				/>
			</div>
			<div class="input-column select input-xl">
				<div class="ah-select2-dropdown">
					<select ng-model="formData.WeightUnit" class="form-control select2-init"
						<?php if(isset($ng_model_dimension)): ?>
							ng-model="<?=$ng_model_dimension?>"
						<?php endif; ?>
					>
						<option> - Select Unit - </option>
						<option value="G"> Grams </option>
						<option value="KG"> Kilograms </option>
					</select>
				</div>
			</div>
		</div>
	</div>
</div>