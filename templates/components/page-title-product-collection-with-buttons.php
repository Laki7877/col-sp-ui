<!-- TODO: If UI wants this to be modular,
we should just make it modular by creating initializer -->
<div class="page-header with-border">
    <h1 class="float-left page-header-title"><?= $text ?></h1>
    <span class="float-right page-header-action">
        <a ng-click="startExportProductCollection()" class="btn-white btn margin-right-10">
          <span class="">Export</span>
        </a>
        <a href="/collections/import" class="btn-white btn margin-right-10">
          <span class="">Import</span>
        </a>
        <a href="/collections/add" class="btn-blue btn btn-width-xl">
          <span class="">Add Collection</span>
        </a>
    </span>
</div>
