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
        <div class="row search-section">
          <div class="col-xs-6">
            <div class="input-group">
              <div class="input-group-btn">
                <button type="button" class="body-dropdown-button btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                    <span class="dropdown-text margin-right-10">- Choosen Action -</span>
                    <span class="caret margin-left-10"></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </div><!-- /btn-group -->
              <!-- <input type="text" class="form-control" aria-label="..."> -->
              <button type="button" class="button-white btn btn-default">
                <span class="button-text-blue">Confirm</span>
              </button>
            </div><!-- /input-group -->
          </div>
        </div>
	</div>
<?php $this->stop() ?>