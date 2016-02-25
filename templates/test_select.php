<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>
<?php $this->start('page-body') ?>
{{treeSelectModel}}
<div ng-controller="TestCtrl">
	<nc-tree-select nc-model="treeModel" nc-tree-select-tree="treeSelectTree"></nc-tree-select>
	<nc-breadcrumb-select nc-model="treeSelectModel" nc-breadcrumb-select-tree="treeSelectTree"></nc-breadcrumb-select>
</div>

<?php $this->stop() ?>