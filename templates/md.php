<!--page-with-sidebar-->

<html class="no-js" lang="" ng-app="colspApp">
<head >
    <script src="<?= $this->asset('/assets/js/bundle.js') ?>"></script>
    
      <script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.js"></script>

    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.css">

    <title>Test MD</title>
</head>

<body>
    <form ng-submit="$event.preventDefault()">
        <div ng-controller="TestCtrl">
            <md-content layout-padding layout="column">
            <md-autocomplete md-selected-item="ctrl.selectedItem"
            md-search-text="ctrl.searchText"
            md-no-cache="!cacheEnable"
            md-items="item in querySearch(ctrl.searchText)" 
            md-item-text="item.ProductNameEn" 
            md-min-length="1"
            md-delay="500"
            placeholder="Search for Product">
                <md-item-template>
                    <span md-highlight-text="ctrl.searchText" md-highlight-flags="^i">{{item.ProductNameEn}}</span>
                </md-item-template>
                <md-not-found>
                    No Product Found
                </md-not-found>
            </md-autocomplete>
            </md-content>
        </div>
    </form>

</body>

</html>