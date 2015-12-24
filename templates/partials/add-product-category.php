<div id="add-product-category-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>

	<div class="row">
		<div class="col-xs-9">
			<div class="form-section">
				<div class="form-section-header"><h2>Global Category</h2></div>
				<div class="form-section-content">
					<div class="form-group">
						<div class="width-label"><label class="control-label">Global Category:</label></div>
						<div class="width-field-normal"><span class="form-text">Phone Accessory</span></div>
					</div>
					<div class="form-group">
						<div class="width-label"><label class="control-label">1st Alternative:</label></div>
						<div class="width-field-normal"><a class="form-text">Electronic Gadget</a><i class="clickable fa fa-trash margin-left-10"></i></div>
					</div>
					<div class="form-group">
						<div class="width-label"><label class="control-label">2nd Alternative:</label></div>
						<div class="width-field-normal">
							<a class="like-text form-text" data-toggle="modal" data-target="#global-category">
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
					<div class="form-group">
						<div class="width-label"><label class="control-label">Local Category:</label></div>
						<div class="width-field-normal">
							<a class="like-text form-text" data-toggle="modal" data-target="#local-category">
								<i class="fa fa-plus-circle color-theme"></i> Add Alternative Category
							</a>
						</div>
					</div>
					<div class="form-group">
						<div class="width-label"><label class="control-label">1st Alternative:</label></div>
						<div class="width-field-normal">
							<a class="like-text form-text" data-toggle="modal" data-target="#local-category">
								<i class="fa fa-plus-circle color-theme"></i> Add Alternative Category
							</a>
						</div>
					</div>
					<div class="form-group">
						<div class="width-label"><label class="control-label">2st Alternative:</label></div>
						<div class="width-field-normal">
							<a class="like-text form-text" data-toggle="modal" data-target="#local-category">
								<i class="fa fa-plus-circle color-theme"></i> Add Alternative Category
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

<? $this->insert('components/modal-add-alternative-global-category', ['id' => 'global-category', 'header' => 'Add Alternative Global Category']) ?>
<? $this->insert('components/modal-add-local-category', ['id' => 'local-category', 'header' => 'Add Local Category']) ?>