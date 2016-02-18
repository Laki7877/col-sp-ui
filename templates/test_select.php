<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>
<?php $this->start('page-body') ?>
{{treeSelectModel}}
<div ng-controller="TestCtrl">
	{{some}}
	<ui-select ng-model="some" multiple>
		<ui-select-match>{{$item}}</ui-select-match>
		<ui-select-choices repeat="value in ['test', 'test2', 'test3'] track by $index">
			{{value}}
		</ui-select-choices>
	</ui-select>
	<nc-breadcrumb-select nc-model="treeSelectModel" nc-breadcrumb-select-tree="treeSelectTree"></nc-breadcrumb-select>
</div>

<?php $this->stop() ?>