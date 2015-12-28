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
		<? $this->insert('components/image-thumbs-list', ["action" => 4, "sep" => 1, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550"]]) ?>
	</div>
</div>