<div id="add-product-images-tab-content" ng-show='(formData.Variants || []).length == 0'>
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>

	<div class="row" >
		<div class="col-xs-12">
			<? $this->insert('components/forms/form-section-upload-new-product-image', ['uploader' => 'uploader', 'images' => 'formData.MasterImages']) ?>
			<? $this->insert('components/forms/form-section-upload-new-product-image-360', ['uploader' => 'uploader360', 'images' => 'formData.MasterImages360']) ?>
			<div class="form-section">
				<div class="form-section-header"><input type="checkbox" /> <span>Embed Video</span></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 1", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "Only YouTube link is allowed.", "ng_model" => "formData.VideoLinks[0]"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 2", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "Only YouTube link is allowed.", "ng_model" => "formData.VideoLinks[1]"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 3", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "Only YouTube link is allowed.", "ng_model" => "formData.VideoLinks[2]"]) ?>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="add-product-images-tab-content" ng-if='(formData.Variants || []).length > 0'>
	<div class="row">
		<div class="col-xs-12">
			<h4>Your Product contains Variations</h4>
			For Items with variants, images detail may be added via the Variation Tab. 
		</div>
	</div>
</div>


<? $this->insert('components/modal-product-image', ['id' => 'product-image-zoom']) ?>
