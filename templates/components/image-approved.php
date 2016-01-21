<?php
if (!isset($text)) {
  $text = 'Drag &amp; drop your product images here';
}
?>
<div class="image-drop-wrapper">
	<input type="file" id="<?= $id ?>_input" />
	<div class="image-drop-zone" id="<?= $id ?>">
		<div class="image-drop-zone-text">
			<p>This product is</p>
			<p>already approved</p>
		</div>
		<div class="image-select-alternative-text <?=$alternative_class?>">
			<a href="#" data-trigger="file" data-target="#<?= $id ?>_input">Click here to edit</a>
		</div>
	</div>
</div>	