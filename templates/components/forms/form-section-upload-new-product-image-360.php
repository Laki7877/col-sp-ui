<div class="form-section">
	<div class="form-section-header"><input type="checkbox" /> <span>Upload 360 Degree Images</span></div>
	<div class="form-section-content padding-left-15 padding-right-15">
		<div class="col-xs-7">
			<? $this->insert('components/image-dropzone', ["id" => "product-360", "uploader" => $uploader]) ?>
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
		<div class="col-xs-12">
			<? $this->insert('components/image-thumbs-list', ["action" => 2, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550"]]) ?>
		</div>
	</div>
</div>