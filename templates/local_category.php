<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Local Category']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">
		<? $this->insert('components/page-title-breadcrumb-border', ['text' => 'Local Category']) ?>
		<div class="local-category-section">
			<div class="col-xs-12 category-header no-padding">
				<span class="col-xs-8">
					Category Name
				</span>
				<span class="col-xs-1">
					Products
				</span>
				<span class="col-xs-1">
					Visible
				</span>
				<span class="col-xs-1">
					Action	
				</span>
				<span class="col-xs-1">
					Move
				</span>
			</div>
			<div class="col-xs-12 no-padding">
				<ol class="sortable no-padding">
				    <li>
				    	<div class="category-content row no-margin">
				    		<div class="category-content-padding">
					    		<span class="col-xs-8 local-category-toggle-area">
									<i class="fa fa-chevron-right toggle-button"></i>Category Name1
								</span>
								<span class="col-xs-1">
									Products
								</span>
								<span class="col-xs-1">
									Visible
								</span>
								<span class="col-xs-1">
									Action	
								</span>
								<span class="col-xs-1">
									Move
								</span>
							</div>
				    	</div>
				    </li>
				    <li>
				    	<div class="category-content row no-margin">
				    		<div class="category-content-padding">
					    		<span class="col-xs-8">
					    			<i class="fa fa-level-up fa-rotate-90 caret-grey"></i>
									Category Name2
								</span>
								<span class="col-xs-1">
									Products
								</span>
								<span class="col-xs-1">
									Visible
								</span>
								<span class="col-xs-1">
									Action	
								</span>
								<span class="col-xs-1">
									Move
								</span>
							</div>
				    	</div>
				    </li>
				    <li>
				    	<div class="category-content row no-margin">
				    		<div class="category-content-padding">
					    		<span class="col-xs-8">
					    			<i class="fa fa-level-up fa-rotate-90 caret-grey"></i>
									Category Name3
								</span>
								<span class="col-xs-1">
									Products
								</span>
								<span class="col-xs-1">
									Visible
								</span>
								<span class="col-xs-1">
									Action	
								</span>
								<span class="col-xs-1">
									Move
								</span>
							</div>
				    	</div>
				    </li>
				    <li>
				    	<div class="category-content row no-margin">
				    		<div class="category-content-padding">
					    		<span class="col-xs-8 local-category-toggle-area">
									<i class="fa fa-chevron-right toggle-button"></i>Category Name1
								</span>
								<span class="col-xs-1">
									Products
								</span>
								<span class="col-xs-1">
									Visible
								</span>
								<span class="col-xs-1">
									Action	
								</span>
								<span class="col-xs-1">
									Move
								</span>
							</div>
				    	</div>
				    </li>
				    <li>
				    	<div class="category-content row no-margin">
				    		<div class="category-content-padding">
					    		<span class="col-xs-8">
					    			<i class="fa fa-level-up fa-rotate-90 caret-grey"></i>
									Category Name2
								</span>
								<span class="col-xs-1">
									Products
								</span>
								<span class="col-xs-1">
									Visible
								</span>
								<span class="col-xs-1">
									Action	
								</span>
								<span class="col-xs-1">
									Move
								</span>
							</div>
				    	</div>
				    </li>
				    <li>
				    	<div class="category-content row no-margin">
				    		<div class="category-content-padding">
					    		<span class="col-xs-8">
					    			<i class="fa fa-level-up fa-rotate-90 caret-grey"></i>
									Category Name3
								</span>
								<span class="col-xs-1">
									Products
								</span>
								<span class="col-xs-1">
									Visible
								</span>
								<span class="col-xs-1">
									Action	
								</span>
								<span class="col-xs-1">
									Move
								</span>
							</div>
				    	</div>
				    </li>
				</ol>	
			</div>
		</div>
	</div>
<?php $this->stop() ?>