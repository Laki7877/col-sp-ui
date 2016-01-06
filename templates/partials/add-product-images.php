<div id="add-product-images-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>
	
	<div class="row">
		<div class="col-xs-12">
			<? $this->insert('components/forms/form-section-upload-new-product-image', ['uploader' => 'uploader', 'images' => 'images']) ?>
			<? $this->insert('components/forms/form-section-upload-new-product-image-360', ['uploader' => 'uploader360', 'images' => 'images360']) ?>
			<div class="form-section">
				<div class="form-section-header"><input type="checkbox" /> <span>Embed Video</span></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 1", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "This is a tooltip"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 2", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "This is a tooltip"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 3", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "This is a tooltip"]) ?>
				</div>
			</div>
		</div>
	</div>
</div>