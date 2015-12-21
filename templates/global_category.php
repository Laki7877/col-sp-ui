<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Global Category']) ?>

<?php $this->start('page-body') ?>
	<div class="global-category-page">
		<? $this->insert('components/page-title-with-buttons', ['text' => 'Products/Add Product']) ?>
		<div class="global-category-radio-section ">
			<div>
				Type of upload
			</div>
			<div>
				<span class="radio radio-first">
				  <label><input type="radio" name="optradio">Single</label>
				</span>
				<span class="radio radio-second">
				  <label><input type="radio" name="optradio">Bulk (via Excel)</label>
				</span>
			</div>
		</div>
		<div class="category-section">
			<div class="col-xs-12 category-header">Global Category</div>
			<div class="col-xs-12 category-content no-padding">
				<div class="col-xs-3 no-padding">
					<div class="category-active">Electronic</div>
					<div>Fashion</div>
					<div>Home & Living</div>
					<div>Mom & Kids</div>
				</div>
				<div class="col-xs-3 no-padding">
					<div>Computer</div>
					<div class="category-active">Phone</div>
					<div>Speaker</div>
				</div>
				<div class="col-xs-3 no-padding">
					<div>Smart Phone</div>
					<div>Office Phone</div>
					<div class="category-active">Accessory</div>
				</div>
				<div class="col-xs-3 no-padding empty-column">
				</div>
			</div>
			<div class="col-xs-12 category-footer no-padding">
				<span>Only shown categories that are allowed for this store.
				</span>
				<span class="float-right">
		        	<button type="button" class="btn btn-link button-wide">Cancel</button>
		       		<button type="button" class="btn btn-primary button-wide">Select</button>
		      	</span>
			</div>
		</div>
	</div>
<?php $this->stop() ?>