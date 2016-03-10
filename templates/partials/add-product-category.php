<div id="add-product-category-tab-content">
        <div nc-template="add-product/inner-tab-breadcrumb" nc-view-bag="formData"></div>

	<div class="row">
		<div class="col-xs-9">
			<div class="form-section">
				<div class="form-section-header"><h2>Global Category</h2></div>
				<div class="form-section-content">
					<div class="form-group" ng-repeat="item in formData.GlobalCategories track by $index" ng-cloak>
						<div class="width-label" ng-if="$index == 0"><label class="control-label">Global Category:</label></div>
						<div class="width-label" ng-if="$index != 0 && formData.GlobalCategories[$index - 1] != null"><label class="control-label">{{$index | ordinal}} Alternative:</label></div>
						<div class="width-field-normal" ng-if="$index == 0"><span class="form-text">{{item.NameEn}}</span></div>
						<div class="width-field-normal" ng-if="$index != 0 && item != null">
							<a class="form-text" data-toggle="modal" data-target="#global-category" ng-click="$emit('openGlobalCat', item, $index)">{{item.NameEn}}</a>
							<!-- Only deletable if last -->
							<i ng-if="!formData.GlobalCategories[$index + 1]"
							 ng-click="$emit('deleteGlobalCat', $index)"class="clickable color-dark-grey fa fa-trash margin-left-10"></i>
						</div>
						<div class="width-field-normal" ng-if="$index != 0 && item == null && formData.GlobalCategories[$index - 1] != null">
							<a class="like-text form-text" data-toggle="modal" data-target="#global-category" ng-click="$emit('openGlobalCat', item, $index)">
								<i class="fa fa-plus-circle color-theme"></i> Add Alternative Category
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-3">
			<h4>Global Category</h4>
			<p>Global category is where this product will belong to when user finds it on the market place. You can have one main global category, but you can have an alternative category where the product will be cloned into.</p>
		</div>
	</div>

	<div class="row">
		<div class="col-xs-9">
			<div class="form-section">
				<div class="form-section-header"><h2>Local Category</h2></div>
				<div class="form-section-content">
					<div class="form-group" ng-repeat="item in formData.LocalCategories track by $index" ng-cloak>
						<div class="width-label" ng-if="$index == 0"><label class="control-label">Local Category:</label></div>
						<div class="width-label" ng-if="$index != 0 && formData.LocalCategories[$index - 1] != null"><label class="control-label">{{$index | ordinal}} Alternative:</label></div>
						<div class="width-field-normal" ng-if="item != null">
							<a class="form-text" data-toggle="modal" data-target="#local-category" ng-click="$emit('openLocalCat', item, $index)">{{item.NameEn}}</a>
							<!-- can only delete bottom up -->
							<i ng-if="!formData.LocalCategories[$index + 1]"
							 ng-click="$emit('deleteLocalCat', $index)"class="clickable color-dark-grey fa fa-trash margin-left-10"></i>
						</div>
						<div class="width-field-normal" ng-if="item == null && (formData.LocalCategories[$index - 1] != null || $index == 0)">
							<a class="like-text form-text" data-toggle="modal" data-target="#local-category" ng-click="$emit('openLocalCat', item, $index)">
								<i class="fa fa-plus-circle color-theme"></i> Add 
								<span ng-if="$index == 0">Local</span>
								<span ng-if="$index > 0">Alternative Local</span>
								 Category
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-3">
			<h4>Local Category</h4>
			<p>Local category is where this product will belong when user finds it on this store. You can have one main local category but many alternative ones.</p>
		</div>
	</div>
</div>

<!-- <a data-toggle="modal" data-target="#leave-page-warning">Show Warning</a> -->

<? $this->insert('components/modal-add-alternative-global-category', ['id' => 'global-category', 'header' => 'Add Alternative Global Category', 'ng_model' => 'viewCategorySelected', 'template' => 'viewCategoryColumns']) ?>
<? $this->insert('components/modal-add-local-category', ['id' => 'local-category', 'header' => 'Add Local Category', 'ng_model' => 'viewCategorySelected', 'template' => 'viewCategoryColumns']) ?>