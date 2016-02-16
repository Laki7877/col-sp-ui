<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>
<?php $this->start('page-body') ?>
<div ng-controller="TestCtrl">
	<form name="stuff">
	<div nc-template="common/input/form-group-with-label" nc-template-form="stuff" nc-label="SKU" nc-template-options-path="searchForm/SKU">
        <input class="form-control width-field-large" name="SKU" ng-model="formData.SKU" required />
	</div>
</form>
</div>

<?php $this->stop() ?>