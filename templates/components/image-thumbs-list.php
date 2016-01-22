<?php
if (! isset($list_class)) {
	$list_class = "image-vertical-list";
}
?>
<ul class="<?= $list_class ?>">
	<? foreach ($images as $idx => $image): ?>
		<? if (isset($sep) && $sep == $idx): ?>
			<li class="list-section-break"></li>
		<? endif ?>

		<li class="list-item">
			<? $this->insert('components/image-thumbs-actions-'.$action, ["image_url" => $image]) ?>
		</li>
	<? endforeach ?>
</ul>