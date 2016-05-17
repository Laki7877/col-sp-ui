<!-- TODO: If UI wants this to be modular,
we should just make it modular by creating initializer -->
<div class="page-header with-border">
    <h1 class="float-left page-header-title"><?= $text ?></h1>
    <span class="float-right page-header-action">
        <a ng-click="startExportBuy1Get1()" class="btn-white btn margin-right-10">
          <span class="">Export</span>
        </a>
        <a href="/buy1get1/import" class="btn-white btn margin-right-10">
          <span class="">Import</span>
        </a>
        <a href="/buy1get1/add" class="btn-blue btn btn-width-xl" style="width:140px;">
          <span class="">Add Buy 1 Get 1</span>
        </a>
    </span>
</div>
