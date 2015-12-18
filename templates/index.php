<?php $this->layout('layouts/page-with-sidebar', ['title' => 'User Profile']) ?>

<?php $this->start('page-body') ?>
	<div>
    <?= $this->section('page-body-header', $this->fetch('components/page-body-header')); ?>
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