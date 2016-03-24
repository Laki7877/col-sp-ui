<?php $this->layout('layouts/page-plain', ['title' => 'Seller Portal']) ?>
<!--page-with-sidebar-->
<?php $this->start('page-body') ?>

<div ng-controller="TestCtrl">
    <md-autocomplete
          md-selected-item="ctrl.selectedItem"
          md-search-text="ctrl.searchText"
          md-items="item in querySearch(ctrl.searchText)"
          md-item-text="item.ProductNameEn"
          md-min-length="0"
          placeholder="What is your favorite US state?">
        <md-item-template>
          <span md-highlight-text="ctrl.searchText" md-highlight-flags="^i">{{item.ProductNameEn}}</span>
        </md-item-template>
        <md-not-found>
          No states matching "{{ctrl.searchText}}" were found.
        </md-not-found>
      </md-autocomplete>
</div>

<?php $this->stop() ?>
