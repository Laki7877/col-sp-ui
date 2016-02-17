<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>
<?php $this->start('page-body') ?>
<div ng-controller="TestCtrl">
	<nc-tree-select nc-model="treeSelectModel" nc-tree-select-tree="treeSelectTree" nc-tree-select-title="Test Category">
	<nc-tree-select>
</div>

<?php $this->stop() ?>