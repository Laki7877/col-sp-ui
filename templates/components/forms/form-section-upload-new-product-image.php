<div class="form-section">
	<div class="form-section-header <?= isset($checkbox) ? "checkbox" : "" ?>">
        <?php if(isset($checkbox)): ?>
		<label>
             <input type="checkbox" ng-model="<?= $model ?>._override.uploadProductImages"> Override "Upload Product Images"
        </label>
        <?php endif; ?>
        <?php if(!isset($checkbox)): ?>
            Upload Product Images
        <?php endif;?>
	</div>
	<div class="form-section-content padding-left-15 padding-right-15"
        <?php if(isset($checkbox)): ?>
		  ng-show="<?= $model ?>._override.uploadProductImages"
        <?php endif; ?>
    >
		<div class="col-xs-7">
			<? $this->insert('components/image-dropzone', ["id" => "product-images", "uploader" => $uploader]) ?>
		</div>
		<div class="col-xs-5">
			<?php if(!isset($no_guideline)): ?>
				<h4>Product images style guideline</h4>
				<p>Choose images that clearly  represent your product. Images must meet the following requirements:</p>
				<ul>
					<li>Image width or height must be between at least <strong>1500px</strong> but not larger than <strong>2000px</strong></li>
					<li>Image portion must be in square format.</li>
					<li>File size must not be larger than 5MB and.</li>
					<li>File format must be JPG.</li>
				</ul>
			<?php endif; ?>
		</div>
	</div>
	<div class="form-section-content padding-left-15 padding-right-15" style="margin-bottom:0px;"
        <?php if(isset($checkbox)): ?>
		  ng-show="<?= $model ?>._override.uploadProductImages"
        <?php endif; ?>
    >

		<? $this->insert('components/image-thumbs-list', [
			"sep" => 1,
			"action" => 4,
			"images" => $images,
			"uploader" => $uploader]) ?>

	</div>
</div>
