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
			<p>Choose images that are clear, information-rich, and attractive. Images must meet the following requirements:</p>
			<ul>
				<li>Products must fill at least 85% of the image. Images must show only the product that is for sale, with few or no props and with no logos, watermarks, or inset images. Images may only contain text that is a part of the product.</li>
				<li>Main images must have a pure white background, must be a photo (not a drawing), and must not contain excluded accessories.</li>
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
