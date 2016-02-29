<!-- TODO: If UI wants this to be modular,
we should just make it modular by creating initializer -->
<div class="page-header with-border">
    <h1 class="float-left page-header-title"><?= $text ?></h1>
    <form action="/products/export" method="post">
    <span class="float-right page-header-action">
          <input type="hidden" name="selected_products[]" ng-repeat="(prId,tf) in checkBoxCache"
          value="{{ prId }}" ng-if="tf === true"/>

          <button class="btn-white btn margin-right-10 btn-width-xl">
            Export Temp
          </button>
          <div class="btn-group margin-right-10">
            <button type="button" class="btn btn-white dropdown-toggle btn-width-xl" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Export <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="#">Export All Products</a></li>
              <li><a href="#">Export Selected Products</a></li>
            </ul>
          </div>
          <div class="btn-group margin-right-10">
            <button type="button" class="btn btn-white dropdown-toggle btn-width-xl" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Import <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="/products/import">Add New Products</a></li>
              <li><a href="/products/update">Update Existing Products</a></li>
            </ul>
          </div>
        <a href="/products/select" class="btn-blue btn btn-width-xl">
          <span class="">Add Product</span>
        </a>
    </span>
    </form>
</div>
