<!--page-with-sidebar-->

<html class="no-js" lang="" ng-app="colspApp">
<head >
    <script src="<?= $this->asset('/assets/js/bundle.js') ?>"></script>
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.css">

    <title>Test MD</title>
</head>

<body>
    <div ng-controller="TestCtrl">
        <md-autocomplete md-selected-item="ctrl.selectedItem" md-search-text="ctrl.searchText" md-items="item in querySearch(ctrl.searchText)" md-item-text="item.ProductNameEn" md-min-length="0" placeholder="What is your favorite US state?">
            <md-item-template>
                <span md-highlight-text="ctrl.searchText" md-highlight-flags="^i">{{item.ProductNameEn}}</span>
            </md-item-template>
            <md-not-found>
                No states matching "{{ctrl.searchText}}" were found.
            </md-not-found>
        </md-autocomplete>
    </div>


</body>

</html>