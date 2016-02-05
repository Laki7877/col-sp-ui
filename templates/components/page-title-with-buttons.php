<!-- TODO: If UI wants this to be modular,
we should just make it modular by creating initializer -->
<div class="page-header with-border">
    <h1 class="float-left page-header-title"><?= $text ?></h1>
    <span class="float-right page-header-action">
        <a ng-click="startExportProducts()" class="btn-white btn margin-right-10">
          <span class="">Export</span>
        </a>
        <a href="/products/import" class="btn-white btn margin-right-10">
          <span class="">Import</span>
        </a>
        <a href="/products/select" class="btn-blue btn btn-width-xl">
          <span class="">Add Product</span>
        </a>
    </span>
</div>
