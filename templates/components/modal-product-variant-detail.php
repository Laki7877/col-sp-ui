<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h3 class="modal-title"><?=$header?></h3>
			</div>
			<div class="modal-body margin-top-20">
				<div class="row">
					<div class="col-xs-12">
						<div class="form-section">
							<div class="form-section-header"><h2>Vital Information</h2></div>
							<div class="form-section-content modal-custom">
								<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Name (Thai)"]) ?>
								<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Name (English)"]) ?>
								<? $this->insert('components/forms/multiple-radio-multiline', ["label" => "Display", "choices" => ["Show as group of variants", "Show as individual product"]]) ?>
							</div>
						</div>
						<div class="form-section">
							<div class="form-section-header"><h2>Description</h2></div>
							<div class="form-section-content">
								<? $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (Thai)", "size" => "xxl", "label_class" => "required"]) ?>
								<? $this->insert('components/forms/textarea-with-label', ["label" => "Short Description (Thai)", "tooltip" => "This is a tooltip text", "size" => "xxl"]) ?>
								<? $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (English)", "size" => "xxl", "label_class" => "required"]) ?>
								<? $this->insert('components/forms/textarea-with-label', ["label" => "Short Description (English)", "tooltip" => "This is a tooltip text", "size" => "xxl"]) ?>
							</div>
						</div>
						<div class="form-section">
							<div class="form-section-header"><h2>Package Detail</h2></div>
							<div class="form-section-content">
								<? $this->insert('components/forms/multiple-input-with-label', ["label" => "Package Dimension"]) ?>
								<? $this->insert('components/forms/multiple-input', ["label" => "Weight"]) ?>
							</div>
						</div>
						<? $this->insert('components/forms/form-section-upload-new-product-image') ?>
						<div class="form-section">
							<div class="form-section-header"><input type="checkbox" /> <span>Embed Video</span></div>
							<div class="form-section-content">
								<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 1", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "This is a tooltip"]) ?>
								<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 2", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "This is a tooltip"]) ?>
								<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 3", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "This is a tooltip"]) ?>
							</div>
						</div>
					</div> <!-- end .col-xs-12 -->
					<div class="col-xs-12">
						<span class="float-right">
							<a class="link-btn-plain" data-dismiss="modal">Cancel</a>
							<button type="button" class="btn btn-blue btn-width-xl">Save</button>
						</span>
					</div> <!-- end .col-xs-12 -->
				</div> <!-- end .row -->
			</div> <!-- end .modal-body -->
		</div> <!-- end .modal-content -->
	</div> <!-- end .modal-dialog -->
</div> <!-- end .modal -->