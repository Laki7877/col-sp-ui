<?php 
	if($size == 'normal') {
		$fieldSize = 'width-field-normal';
	}
	else {
		$fieldSize = 'width-field-xxl';
	}
?>

<div class="form-group <?=$form_group_class?>">
	<div class="width-label"><label class="control-label <?=$label_class?>"><?= $label ?></label></div>
    <div class="<?= $fieldSize ?>">
      <p class="form-control-static"><?= $field_content ?></p>
    </div>
</div>