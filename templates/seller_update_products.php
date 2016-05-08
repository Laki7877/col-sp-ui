<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Import Products']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">
		<? $this->insert('components/alert-text', ['close' => true, 'color' => 'green', 'text' => 'Successfully Import Products. <a class="color-black text-underline">View Product List</a>']) ?>
		<? $this->insert('components/alert-text', ['close' => true, 'color' => 'red', 'text' => 'Fail to import products', 'header_class' => 'font-weight-bold',
		 'text_multilines' => ['- Wrong template file or format'
		,'- Required fields are missing'
		, '- Products with wrong PID'
		, '- Cannot update product that are "Wait for Apporval"'
		, '- Products with wrong brand or category ID'
		, '- Wrong data type'
		, '- Alien Attack'
		]]) ?>

		<? $this->insert('components/page-title-breadcrumb-border', ['text' => 'Products/Import - Add New Products']) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">

						<div id="import-product-content-page">

							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Getting Started</h2></div>
										<div class="form-section-content">

											<div class="form-group ">
												<div class="width-label"><label class="control-label">If not already export</label></div>
												<div class="button-size-large">
													<a class="button-size-large btn btn-white btn-width-xl" href="/?p=seller_export_products">Export All Product</a>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Upload File</h2></div>
										<div class="form-section-content">
											<? $this->insert('components/forms/upload-field-with-label', ["label" => "Choose File", "input_attrs" => "Browse from your computer"]) ?>
											<? $this->insert('components/forms/button-with-label', ["buttonText" => "Import", "btnClass" => "btn-blue", "modalData" => 'data-toggle="modal" data-target="#import-product"']) ?>
										</div>
									</div>
								</div>
							</div>

							<div class="page-header no-padding with-border margin-top-20 margin-bottom-20">
							    <h1 class="float-left page-header-title ah-breadcrumb">Template Guideline</h1>
							</div>

							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Brand Guideline</h2></div>
										<div class="form-section-content">
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Search Brand", 'input_class' => 'input-icon-right-search', 'placeholder' => 'Search for Brand Name']) ?>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Brand Name
													</label>
												</div>
												<div class="width-field-normal ">
													<label class="control-label ">
														Nike <a href="#" class="margin-left-10">Copy to Clipboard</a>
													</label>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Attribute Guideline</h2></div>
										<div class="form-section-content">
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Search Attribute", 'input_class' => 'input-icon-right-search', 'placeholder' => 'Search for Attribute Name']) ?>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Attribute Name
													</label>
												</div>
												<div class="width-field-normal ">
													<label class="control-label ">
														Dog Size
													</label>
												</div>
											</div>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Enable Variation
													</label>
												</div>
												<div class="width-field-normal ">
													<label class="control-label ">
														Yes
													</label>
												</div>
											</div>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Attribute Type
													</label>
												</div>
												<div class="width-field-normal ">
													<label class="control-label ">
														Dropdown
													</label>
												</div>
											</div>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Attribute Options
													</label>
												</div>
												<div class="width-field-normal ">
													<label class="control-label-results">
														<ul>
															<li>Small / เล็ก <a href="#" class="margin-left-10">Copy to Clipboard</a></li>
															<li>Medium / กลาง <a href="#" class="margin-left-10">Copy to Clipboard</a></li>
															<li>Large / ใหญ่ <a href="#" class="margin-left-10">Copy to Clipboard</a></li>
														</ul>
													</label>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>

							<form class="ah-form margin-top-30">
								<div class="category-section column-4">
									<div class="category-section-border-box">
										<div class="category-header">
											<span>Global Category Guideline</span>
										</div>
										<div class="category-content no-padding">
											<ul class="content-column">
												<li class="category-active">Electronic</li>
												<li>Fashion</li>
												<li>Home & Living</li>
												<li>Mom & Kids</li>
												<li>Electronic</li>
												<li>Fashion</li>
												<li>Home & Living</li>
												<li>Mom & Kids</li>
												<li>Electronic</li>
												<li>Fashion</li>
												<li>Home & Living</li>
												<li>Mom & Kids</li>
												<li>Electronic</li>
												<li>Fashion</li>
												<li>Home & Living</li>
												<li>Mom & Kids</li>
												<li>Electronic</li>
												<li>Fashion</li>
												<li>Home & Living</li>
												<li>Mom & Kids</li>
											</ul>
											<ul class="content-column">
												<li>Computer</li>
												<li class="category-active">Phone</li>
												<li>Speaker</li>
											</ul>
											<ul class="content-column">
												<li>Smart Phone</li>
												<li>Office Phone</li>
												<li class="category-active">Accessory</li>
											</ul>
											<ul class="empty-column content-column"></ul>
										</div>
									</div>
									<div class="category-footer no-padding text-align-right">
										<span>Global Category ID: A2141</span> <a href="#" class="margin-left-10">Copy to Clipboard</a>
									</div>
								</div>
							</form>

							<form class="ah-form margin-top-30">
								<div class="category-section column-4">
									<div class="category-section-border-box">
										<div class="category-header">
											<span>Local Category Guideline</span>
										</div>
										<div class="category-content no-padding">
											<ul class="content-column">
												<li class="category-active">Electronic</li>
												<li>Fashion</li>
												<li>Home & Living</li>
												<li>Mom & Kids</li>
												<li>Electronic</li>
												<li>Fashion</li>
												<li>Home & Living</li>
												<li>Mom & Kids</li>
												<li>Electronic</li>
												<li>Fashion</li>
												<li>Home & Living</li>
												<li>Mom & Kids</li>
												<li>Electronic</li>
												<li>Fashion</li>
												<li>Home & Living</li>
												<li>Mom & Kids</li>
												<li>Electronic</li>
												<li>Fashion</li>
												<li>Home & Living</li>
												<li>Mom & Kids</li>
											</ul>
											<ul class="content-column">
												<li>Computer</li>
												<li class="category-active">Phone</li>
												<li>Speaker</li>
											</ul>
											<ul class="content-column">
												<li>Smart Phone</li>
												<li>Office Phone</li>
												<li class="category-active">Accessory</li>
											</ul>
											<ul class="empty-column content-column"></ul>
										</div>
									</div>
									<div class="category-footer no-padding text-align-right">
										<span>Local Category ID: A2141</span> <a href="#" class="margin-left-10">Copy to Clipboard</a>
									</div>
								</div>
							</form>


						</div>

					</div>
				</div>
			</form>
		</div>
	</div>

<? $this->insert('components/modal-local-category', ['id' => 'local-category-detail', 'header' => 'Local Category Detail']) ?>


<div class="modal fade" tabindex="-1" role="dialog" id="modal-choose-template">
  <div class="modal-dialog modal-category-section column-4">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title">Choose Template</h3>
      </div>
      <div class="modal-body">
            <div class="category-section column-<?= $numberOfColumn ?>">
                <div class="category-section-border-box">
                    <div class="category-header">
                        <span class="required">Global Category</span>
                    </div>
                    <div class="category-content no-padding">
                        <ul class="content-column">
                            <li class="category-active">Electronic</li>
                            <li>Fashion</li>
                            <li>Home & Living</li>
                            <li>Mom & Kids</li>
                            <li>Electronic</li>
                            <li>Fashion</li>
                            <li>Home & Living</li>
                            <li>Mom & Kids</li>
                            <li>Electronic</li>
                            <li>Fashion</li>
                            <li>Home & Living</li>
                            <li>Mom & Kids</li>
                            <li>Electronic</li>
                            <li>Fashion</li>
                            <li>Home & Living</li>
                            <li>Mom & Kids</li>
                            <li>Electronic</li>
                            <li>Fashion</li>
                            <li>Home & Living</li>
                            <li>Mom & Kids</li>
                        </ul>
                        <ul class="content-column">
                            <li>Computer</li>
                            <li class="category-active">Phone</li>
                            <li>Speaker</li>
                        </ul>
                        <ul class="content-column">
                            <li>Smart Phone</li>
                            <li>Office Phone</li>
                            <li class="category-active">Accessory</li>
                        </ul>
                        <ul class="empty-column content-column"></ul>
                    </div>
                </div>
                <div class="category-footer no-padding">


                 	<span class="float-left">
                 		<div class="dropdown">
							<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" disabled>
								Select Attribute Set
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a href="#">Attribute Set 1</a></li>
								<li><a href="#">Attribute Set 2</a></li>
								<li><a href="#">Attribute Set 3</a></li>
							</ul>
						</div>
                 	</span>

                    <span class="float-right">
                        <a class="link-btn-plain" data-dismiss="modal">Cancel</a>
                        <button type="button" class="btn btn-blue btn-width-xl">Download</button>
                    </span>
                </div>
            </div>
      </div>
    </div>
  </div>
</div>

<? $this->insert('components/modal-import-product', ['id' => 'import-product', 'newProductNum' => '', 'updatedProductNum' => '1,500 products to be updated']) ?>


<?php $this->stop() ?>
