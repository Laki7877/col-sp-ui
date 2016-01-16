<ul class="nav nav-tabs" role="tablist">
	<?php foreach ($items as $item): ?>
		<li role="presentation" ng-class="<?= $item['ng_class'] ?>" class="<?= $item['class'] ?>"><a href="#<?= $item['id'] ?>" data-id="<?= $item['id'] ?>"
		 aria-controls="<?= $item['id'] ?>" role="tab" data-toggle="tab"><?= $item['name'] ?></a></li>
	<?php endforeach ?>
</ul>