<div class="image-drop-wrapper">
	<? if (isset($id)): ?>
		<input type="file" name="<?= $id ?>" id="<?= $id ?>" />
	<? endif ?>
	<div class="image-drop-zone">
		<div class="image-drop-zone-text">
			<? foreach ($texts as $t): ?>
				<p><?= $t ?></p>
			<? endforeach ?>
		</div>
	</div>
</div>