<?php $this->layout('layouts/page-with-sidebar', ['title' => 'User Profile']) ?>

<?php $this->start('page-body') ?>
	<div>
    <div class="page-body-header">
        <span class="page-name">Products</span>

        <span class="float-right">
            <button type="button" class="button-white btn btn-default margin-right-10">
              <span class="">Export</span>
            </button>
            <button type="button" class="button-white btn btn-default margin-right-10">
              <span class="">Import</span>
            </button>
            <button type="button" class="button-blue btn btn-default">
              <span class="">Add Product</span>
            </button>
        </span>
    </div>
    <?= $this->section('search-section', $this->fetch('components/search-section')); ?>
    <div class="filter-section">
      <div class="filter-container">
        <span>Filters:</span>
        <a class="filter-first-option filter-active">All</a>
        <a class="filter-seperator">Approved</a>
        <a class="filter-seperator">Not Approved</a>
        <a class="filter-seperator">Wait for Approval</a>
        <a class="filter-seperator">Not Approved</a>            
      </div>
    </div>
	</div>
<?php $this->stop() ?>