<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div>
            
       <nc-page-title options="{
        title: 'All Products',
        buttons: [{
            'action': 'export()',
            'title' : 'Export',
            'classes' : ['btn-white']
        }]
       }"></nc-page-title>

	    <div class="row search-section-wrapper">
		  <div class="search-section section-search">
		    <div class="input-group">
		      <input type="text" class="form-control input-search-icon search-box" placeholder="Search for Product SKU, Name, ..." aria-describedby="basic-addon2" >
		      <span class="input-group-btn">
		        <button class="btn btn-white" type="button">Search</button>
		      </span>
		    </div>
		  </div>
		  <div class="search-section advance-search">
    		<button class="btn btn-white-fluid border_blue" type="button">Advanced Search</button>
  		   </div>
		</div>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/admin_all_products_result_content') ?>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>