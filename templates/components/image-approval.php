<?php
if (!isset($text)) {
  $text = 'Drag &amp; drop your product images here';
}
?>
<div class="image-drop-wrapper">
	<input type="file" id="<?= $id ?>_input" />
	<div class="image-drop-zone" id="<?= $id ?>">
		<div class="image-drop-zone-text">
			<p><i class="fa fa-ban fa-3x color-dark-grey"></i></p>
			<p>Cannot upload</p>
			<p>Wait for Approval</p>
		</div>
	</div>
	<div class="image-select-alternative-text <?=$alternative_class?>">
		<span>Or</span> <a href="#" data-trigger="file" data-target="#<?= $id ?>_input">Select Images from your computer</a>
	</div>
</div>	