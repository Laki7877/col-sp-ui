<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="TestCtrl">
    <!-- Should use vader@nsa.gov -->
    <!-- Should has permission AddProduct -->

    <h3>Prerequisite: Should has permission AddProduct</h3>
    <ol>
      <li ng-permission="AddProduct">Should see (Add Product)</li>
      <li ng-repeat="i in [1,2]" ng-permission="AddProduct">Should see {{i}}th repeat (Add Product)</li>
      <li ng-permission="AddProduct || EditProduct">Should see (AddProduct || EditProduct)</li>
      <li ng-permission="!EditProduct">Should see (!EditProduct)</li>
      <li ng-permission="EditProduct">Should not see (EditProduct)</li>
      <li ng-permission="Add Product && EditProduct">Should not see (AddProduct && EditProduct)</li>
    </ol>
  </div>
<?php $this->stop() ?>
