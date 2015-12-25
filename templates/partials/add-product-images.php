<div id="add-product-images-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header">Upload New Product Images</div>
				<div class="form-section-content padding-left-15 padding-right-15">
					<div class="col-xs-7">
						<? $this->insert('components/image-dropzone', ["id" => "product-images"]) ?>
					</div>
					<div class="col-xs-5">
						<h4>Product images style guideline</h4>
						<p>Choose images that are clear, information-rich, and attractive. Images must meet the following requirements:</p>
						<ul>
							<li>Products must fill at least 85% of the image. Images must show only the product that is for sale, with few or no props and with no logos, watermarks, or inset images. Images may only contain text that is a part of the product.</li>
							<li>Main images must have a pure white background, must be a photo (not a drawing), and must not contain excluded accessories.</li>
						</ul>
					</div>
				</div>
				<div class="section-break"></div>
				<div class="form-section-content padding-left-15 padding-right-15">
					<? $this->insert('components/image-thumbs-list', ["action" => 2, "sep" => 1, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550"]]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><input type="checkbox" /> <span>Upload 360 Degree Images</span></div>
				<div class="form-section-content padding-left-15 padding-right-15">
					<div class="col-xs-7">
						<? $this->insert('components/image-dropzone', ["id" => "product-360"]) ?>
					</div>
					<div class="col-xs-5">
						<h4>Product images style guideline</h4>
						<p>Choose images that are clear, information-rich, and attractive. Images must meet the following requirements:</p>
						<ul>
							<li>You must set the name of the image to “img360_X” in which “X” is the number of the sequence of the image.</li>
							<li>You must upload at least 60 images to get a proper 360 degree result.</li>
						</ul>
					</div>
				</div>
				<div class="section-break"></div>
				<div class="form-section-content padding-left-15 padding-right-15">
					<? $this->insert('components/image-thumbs-list', ["action" => 2, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550"]]) ?>
				</div>
			</div>
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