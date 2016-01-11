<div class="page-header with-border">
    <h1 class="float-left page-header-title"><?= $text ?></h1>
    <span class="float-right page-header-action">
        <button type="button" class="btn-white btn margin-right-10" ng-click="$emit('createLocalCategory')">
          <span class="">Create Local Category</span>
        </button>
        <button type="button" class="btn-blue btn btn-width-xl" ng-click="$emit('saveLocalCategory')">
          <span class="">Save Changes</span>
        </button>
    </span>
</div>