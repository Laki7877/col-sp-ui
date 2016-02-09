<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>
<?php $this->start('page-body') ?>
<div ng-controller="TestCtrl">
	<ui-select ng-model="tags" tagging tagging-label="" multiple nc-tag-test>
		<ui-select-match>{{$item}}</ui-select-match>
		<ui-select-choices repeat="i in []">{{i}}</ui-select-choices>
	</ui-select>
</div>

<?php $this->stop() ?>