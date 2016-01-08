<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Global Category']) ?>

<?php $this->start('page-body') ?>
	<div class="global-category-page">
		<? $this->insert('components/page-title-breadcrumb-border', ['text' => 'Products/Add Product']) ?>
		<form class="ah-form margin-top-30">
			<!-- <div class="global-category-radio-section ">
				<span>Type of upload</span>
				<div class="radio multiple-radio">
					<label><input type="radio" name="optradio" checked="checked">Single</label>
					<label><input type="radio" name="optradio">Bulk (via Excel)</label>
				</div>
			</div> -->
			<div class="category-section column-4">
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
					<span>Only shown categories that are allowed for this store.</span>
					<span class="float-right">
						<a type="button" class="btn btn-link btn-width-xl" href="?p=index">Cancel</a>
						<a type="button" class="btn btn-blue btn-width-xl" href="?p=add_product">Select</a>
					</span>
				</div>
			</div>
		</form>
	</div>
<?php $this->stop() ?>