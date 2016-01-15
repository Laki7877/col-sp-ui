<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Brand']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller='AdminBrandAddCtrl' ng-init="init(<?=$params?>)">
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Brand/" . $title, 'link' => "admin_brand"]) ?>
    <div class="row margin-top-30">
      <div class="col-xs-12">
        
        <form class="ah-form sticky-mainform-action">
            <div class="row">
              <div class="col-xs-12">
                <div class="form-section">
                  <div class="form-section-header">
                    <h2>Brand Information</h2>
                  </div>
                  <div class="form-section-content modal-custom">
                    <? $this->insert('components/forms/input-text-with-label', 
                    ["label" => "Brand Name (English)",
                     "ng_model" => "formData.BrandNameEn",
                     "label_class" => "required"
                    ]) 
                    ?>

                    <? $this->insert('components/forms/input-text-with-label', 
                      ["label" => "Brand Name (Thai)",
                       "ng_model" => "formData.BrandNameTh",
                       "label_class" => "required"
                      ]) 
                    ?>

                  </div>
                </div>
                <? $this->insert('components/forms/form-section-upload-new-product-image-single',
                    ["uploader" => "uploader", 
                    "no_guideline" => true,
                    "header" => "Upload New Brand Image (512 x 512)",
                    "images" => "formData.BrandImages"]) 
                ?>
                
                <div class="form-section">
                  <div class="form-section-header"><h2>SEO</h2></div>
                  <div class="form-section-content">
                    <? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Title", "tooltip" => "Test", "ng_model" => "formData.SEO.MetaTitle", "tooltip" => "This is a tooltip text"]) ?>
                    <? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Description", "ng_model"=> "formData.SEO.MetaDescription", "tooltip" => "This is a tooltip text"]) ?>
                    <? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Keywords", "ng_model" => "formData.SEO.MetaKeywords", "tooltip" => "This is a tooltip text"]) ?>
                    <? $this->insert('components/forms/input-text-with-label', ["label" => "Brand URL Key (Thai)", "ng_model" => "formData.SEO.ProductUrlKeyTh", "tooltip" => "This is a tooltip text"]) ?>
                    <? $this->insert('components/forms/input-text-with-label', ["label" => "Brand URL Key (English)", "ng_model"=>"formData.SEO.ProductUrlKeyEn", "tooltip" => "This is a tooltip text"]) ?>
                  </div>
                </div>
              </div> <!-- end .col-xs-12 -->
            </div> <!-- end .row -->

            <div class="row">
              <div class="col-xs-12">
                <p class="text-align-right margin-bottom-30"><span class="color-red">*</span> - Required Field</p>
              </div>
            </div>

            <div class="main-form-action full-width-row">
              <div class="container-fluid">
                <div class="float-right">
                  <a href="#" class="link-btn-plain" ng-click="cancel()">Cancel</a>
                  <button class="btn btn-blue btn-width-xl" type="button" ng-click="save()">Save</button>
                </div>
              </div>
            </div>
        </form>
        <form id="success" action="/admin/brands" method="POST">
          <input type="hidden" name="success" value="true">
        </form>

      </div>
    </div>


<?php $this->stop() ?>