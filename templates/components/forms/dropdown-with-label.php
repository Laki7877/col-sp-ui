<?
$inputSize = "width-field-normal";
if (isset($size)) $inputSize = "width-field-$size";
?>
<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
	<div class="<?= $inputSize ?>">
		<div class="ah-select2-dropdown">
			
			<!--<select 
			<?php if(isset($ng_options)): ?>			
			ng-options="<?=$ng_options?>"
			<?php endif; ?>

			<?php if(isset($ng_model)): ?>
			ng-model="<?=$ng_model?>"
			<?php endif; ?>

			<?php if(isset($multiple)): ?>
			multiple="multiple"
			<?php endif; ?>
			 class="form-control select2-init-simple <?= $input_class; ?>" <?= $input_attrs ?> >
			<?php foreach($options as $opt): ?>
			<option><?php echo $opt; ?></option>
			<?php endforeach; ?>
			</select>-->

			<?php if(isset($choices)): ?>
			<ui-select ng-model="<?=$ng_model?>"
				<?php if(isset($multiple)): ?>
					multiple 
				<?php endif; ?>
				<?php if(isset($tagging)): ?>
					tagging
					tagging-label="(New Tag)"
				<?php endif; ?>
			>
			    <ui-select-match>
				<?php if(isset($showBy) && !isset($multiple)): ?>
					<span ng-bind="$select.selected.<?=$showBy?>"></span>
				<?php endif; ?>
				<?php if(!isset($showBy) && !isset($multiple) && !isset($tagging)): ?>
					{{ $select.selected }}
				<?php endif; ?>
				<?php if(isset($showBy) && isset($multiple)): ?>
					<span ng-bind="$item.<?=$showBy?>"></span>
				<?php endif; ?>
				<?php if(isset($tagging)): ?>
					{{ $item }}
				<?php endif; ?>

			    </ui-select-match>
			    <ui-select-choices 
					<?php if(isset($refresh)): ?>
			    		refresh="<?=$refresh?>($select.search)" refresh-delay="2"
					<?php endif; ?>
					repeat="item in (<?= $choices ?>) | filter : $select.search 
					<?php if(isset($trackBy)): ?>
						track by item.<?=$trackBy?>
					<?php endif; ?>">
				<?php if(isset($showBy)): ?>
					<span ng-bind="item.<?=$showBy?>"></span>
				<?php endif; ?>
				<?php if(!isset($showBy)): ?>
					{{ item }}
				<?php endif; ?>

			    </ui-select-choices>
			</ui-select>
			<?php endif; ?>

		</div>
	</div>
	<? if (!empty($tooltip)): ?>
		<div class="width-field-tooltip no-padding-left"><i class="fa fa-2x fa-question-circle color-grey" data-toggle="btooltip" data-placement="right" title="<?= $tooltip ?>"></i></div>
	<? endif ?>
</div>
