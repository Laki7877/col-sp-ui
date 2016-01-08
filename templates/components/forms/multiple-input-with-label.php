<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
	<div class="width-field-xxl">
		<div class="multiple-input">
			<div class="input-column">
				<label>Length</label>
				<input type="text" class="form-control" 
					<?php if(isset($ng_model_length)): ?>
						ng-model="<?=$ng_model_length?>"
					<?php endif; ?>
				/>
			</div>
			<div class="input-column">
				<label>Height</label>
				<input type="text" class="form-control" 
					<?php if(isset($ng_model_height)): ?>
						ng-model="<?=$ng_model_height?>"
					<?php endif; ?>
				/>
			</div>
			<div class="input-column">
				<label>Width</label>
				<input type="text" class="form-control" 
					<?php if(isset($ng_model_width)): ?>
						ng-model="<?=$ng_model_width?>"
					<?php endif; ?>
				/>
			</div>
			<div class="input-column no-label select input-xl">
				<select ng-model="DimensionUnit" class="form-control"
					<?php if(isset($ng_model_dimension)): ?>
						ng-model="<?=$ng_model_dimension?>"
					<?php endif; ?>
				>
					<option> - Select Unit - </option>
					<option value="MM"> Millimeter </option>
					<option value="CM"> Centimeter </option>
					<option value="M"> Meter </option>
				</select>
			</div>
		</div>
	</div>
</div>