<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>
<?php $this->start('page-body') ?>
{{treeSelectModel}}
<div ng-controller="TestCtrl">
	<pre>{{datatype.model | json}}</pre>
	<ui-select ng-model="datatype.model">
		<ui-select-match placeholder="test">{{$select.selected}}</ui-select-match>
		<ui-select-choices repeat="i.value as i in dataTypeOptions">{{i}}</ui-select-choices>
	</ui-select>
</div>

<?php $this->stop() ?>