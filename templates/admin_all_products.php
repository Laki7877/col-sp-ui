<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminProductCtrl">
       <nc-page-title options="{
        title: 'All Products',
        buttons: [{
            'action': 'export()',
            'title' : 'Export',
            'classes' : ['btn-white']
        }]
       }"></nc-page-title>

	    <div class="row search-section-wrapper">
  			<nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="ProductId"></nc-bulk>
      		<nc-search nc-model="params.searchText" nc-search-event="onSearch" nc-search-placeholder="'Search for Product Name'"></nc-search>
		  	<nc-advance-search-button nc-model="searchAdvance"></nc-advance-search-button>
		</div>
		<nc-advance-search nc-model="params" nc-advance-search-toggle="searchAdvance" nc-advance-search-event="onAdvanceSearch"></nc-advance-search>
		<nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
	</div>
<?php $this->stop() ?>