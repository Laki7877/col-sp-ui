<?php
?>
<ul class="image-vertical-list">
	<? foreach ($images as $idx => $image): ?>
		<? if (isset($sep) && $sep == $idx): ?>
			<li class="list-section-break"></li>
		<? endif ?>

		<li class="list-item">
			<? $this->insert('components/image-thumbs-actions-'.$action, ["image_url" => $image]) ?>
		</li>
	<? endforeach ?>
</ul>