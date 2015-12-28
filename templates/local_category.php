<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Local Category']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">
		<? $this->insert('components/alert-text', ['close' => true, 'color' => 'green', 'text' => 'Your changes have been saved.']) ?>
		<? $this->insert('components/alert-text', ['close' => true, 'color' => 'red', 'text' => 'There is an error!']) ?>

		<? $this->insert('components/page-title-with-buttons-local-category', ['text' => 'Local Category']) ?>

		<div class="local-category-section">
			<div class="col-xs-12 category-header no-padding">
				<span class="col-xs-8">
					Category Name
				</span>
				<span class="col-xs-1 text-align-center">
					Products
				</span>
				<span class="col-xs-1 text-align-center">
					Visible
				</span>
				<span class="col-xs-1 text-align-center">
					Action	
				</span>
				<span class="col-xs-1 text-align-center">
					Move
				</span>
			</div>
			<div class="col-xs-12 no-padding">
				<ol class="sortable no-padding">
					<li><? $this->insert('components/local-category-category-content', ['no_child' => true, 'category' => 'Category Name 0', 'product_count' => 20, 'visible' => true]) ?></li>
					<li>
						<? $this->insert('components/local-category-category-content', ['parent' => true, 'category' => 'Category Name 1', 'product_count' => 20, 'visible' => true]) ?>
						<ol>
							<li><? $this->insert('components/local-category-category-content', ['parent' => false, 'category' => 'Category Name 2', 'product_count' => 10, 'visible' => true]) ?></li>
							<li><? $this->insert('components/local-category-category-content', ['parent' => false, 'category' => 'Category Name 3', 'product_count' => 10, 'visible' => false]) ?></li>
						</ol>
					</li>
				</ol>	
			</div>
		</div>
	</div>

	<script>
		$(document).ready(function() {
			$('.sortable').nestedSortable({
				handle: 'div',
				items: 'li',
				toleranceElement: '> div',
				maxLevels: '5'
			});

			// Toggle Local Category page
			$( "i.local-category-toggle-area" ).click(function() {
				$(this).closest('li').children('ol').slideToggle('slow');
				$(this).toggleClass('fa-chevron-right fa-chevron-down');
			});
		});
	</script>

<? $this->insert('components/modal-local-category', ['id' => 'local-category-detail', 'header' => 'Local Category Detail']) ?>

<?php $this->stop() ?>