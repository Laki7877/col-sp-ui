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
    <div class="table-section">
      <table class="table">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"></th>
            <th class="display-column"></th>
            <th>Product Name</th>
            <th class="price-column">Price</th>
            <th>Info.</th>
            <th>Image</th>
            <th class="status-column">Status</th>
            <th class="live-column">Live</th>
            <th class="visible-column">Visible</th>
            <th class="modified-column">Modified</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-column"></td>
            <td class="display-column"></td>
            <td>After all this years</td>
            <td class="price-column"></td>
            <td class="info-column"></td>
            <td class="image-column"></td>
            <td class="status-column"></td>
            <td class="live-column"></td>
            <td class="visible-column"></td>
            <td class="modified-column"></td>
          </tr>
          <tr>
            <td class="checkbox-column"></td>
            <td class="display-column"></td>
            <td>After all this years</td>
            <td class="price-column"></td>
            <td class="info-column"></td>
            <td class="image-column"></td>
            <td class="status-column"></td>
            <td class="live-column"></td>
            <td class="visible-column"></td>
            <td class="modified-column"></td>
          </tr>
        </tbody>
      </table>
    </div>
	</div>
<?php $this->stop() ?>