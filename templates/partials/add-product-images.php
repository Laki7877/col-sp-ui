<div id="add-product-images-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>

	
	<div class="row" >
		<div class="col-xs-12">
			<div class="alert alert-warning" ng-if="enableProductVariations == 'enable'">
					<strong>Please note: </strong> Images from this tab will be the default images of all product variants.
					However, you may choose to add product variant images and override images from this tab.
			</div>
			<? $this->insert('components/forms/form-section-upload-new-product-image', ['uploader' => 'uploader', 'images' => 'formData.MasterImages']) ?>
			<? $this->insert('components/forms/form-section-upload-new-product-image-360', ['uploader' => 'uploader360', 'images' => 'formData.MasterImages360']) ?>
			<div class="form-section">
				<!-- TODO: change label to span with ng-click -->
				<div class="form-section-header"><input type="checkbox" ng-model="checked_master_video" name="membedv" /> <label style="margin-bottom:0px !important" for="membedv">Embed Video</label></div>
				<div class="form-section-content" ng-if='checked_master_video'>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 1", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "Only YouTube link is allowed.", "ng_model" => "formData.VideoLinks[0]"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 2", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "Only YouTube link is allowed.", "ng_model" => "formData.VideoLinks[1]"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 3", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "Only YouTube link is allowed.", "ng_model" => "formData.VideoLinks[2]"]) ?>
				</div>
			</div>
		</div>
	</div>
</div>



<? $this->insert('components/modal-product-image', ['id' => 'product-image-zoom']) ?>
