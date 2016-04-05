<?= $this->layout('layouts/page-with-sidebar', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerShopAppearanceCtrl">
		<div ng-show="loading" nc-loading="Loading Shop Settings.."></div>
		<nc-alert nc-model="alert"></nc-alert>
        <form class="ah-form sticky-mainform-action" name="form" ng-submit="save()" ng-show="!loading">
            <nc-page-title nc-title="Shop Appearance" icon="fa-sliders">
                <button class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
            </nc-page-title>
		    <div>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<div id="shop-setting-content">
						    <div class="row">
					            <div class="form-section">
					                <div class="form-section-header">
					                    <h2>Shop Theme</h2>
					                </div>
					                <div class="form-section-content image_preview">
										<div class="form-group <?=$form_group_class?>">
										 	<div class="col-xs-12 no-padding">
												<div class="radio multiple-radio">
													<label class="label_width" ng-repeat="theme in formData.Themes">
														<input type="radio" name="theme{{$index+1}}">Theme {{$index+1}}
														<img class="image_radion_thumbnail" ng-src="{{ theme.Image.url || '/assets/img/200x112.png'}}" alt="Can't open image" >
													</label>
												</div>
											</div>
										</div>
									</div>
					            </div>
          						<nc-image-banner name="Banner" nc-model="formData.Banner" title="Banner Upload" uploader="bannerUploader" on-fail="uploadBannerFail" size="8"></nc-image-banner>
					            <div class="form-section">
					                <div class="form-section-header">
					                    <h2>Layouts</h2>
					                </div>
					                <div class="form-section-content">
					                    <div ng-repeat="position in formData.Positions track by $index"
					                    	nc-template="common/input/form-group-with-label"
					                    	nc-label="Position {{$index+1}}">
					                        <select ng-model="position.Collection" class="form-control">
                        						<option selected >-- Select Collection --</option>
					                            <option value='NewArrival'>New Arrival</option>
					                            <option value='Available'>Available</option>
					                        </select>
					                        <input type="checkbox" ng-model="position.DisplayCountdownTime"/> Title = Showcase
					                    </div>
					                </div>
					            </div>
					            <div class="form-section">
					                <div class="form-section-header">
					                    <h2>Highlight Video</h2></div>
					                <div class="form-section-content">
					                    <div class="margin-bottom-40">
					                        <div nc-template="common/input/form-group-with-label"
					                        	nc-label="Video Link 1"
					                        	nc-template-form="form.VideoLink1"
					                        	nc-template-options-path="addShopAppearanceForm/VideoLink">
					                            <input name="VideoLink1" ng-model="formData.VideoLink1"class="form-control" type="text" />
					                        </div>
					                        <div nc-template="common/input/form-group-with-label"
					                        	nc-label="Description">
					                            <textarea class="form-control" rows="4" type="text" ng-model="formData.Description1"></textarea>
					                        </div>
					                       	<div nc-template="common/input/form-group-with-label"
								                nc-template-form="form.Thumbnail1"
								                nc-label="Thumbnail Image">
								                  <button
								                  type="button"
								                  name="Thumbnail1"
								                  class="btn btn-default"
								                  ngf-accept="'.png,.jpg,.jpeg'"
								                  ngf-select="uploadLogo($file)"
								                  ng-model="formData.thumbnail1"
								                  ng-class="{'has-error-btn' : isInvalid(form.Thumbnail1)}"
								                  >Choose File</button>
								              </div>
								              <div ng-show="formData.Thumbnail1"
								                nc-template="common/input/form-group-with-label"
								                nc-label="Thumbnail Image Preview">
								                  <img
								                    ng-src="{{formData.Thumbnail1.url}}"
								                    width="160"
								                    />
								                  <a style="display:block;" class="margin-top-5" ng-click="formData.Thumbnail1=null"><i class="fa-trash fa"></i> Delete this image</a>
								              </div>
					                    </div>
					                    <div>
					                        <div nc-template="common/input/form-group-with-label"
					                        	nc-label="Video Link 2"
					                        	nc-template-form="form.VideoLink2"
					                        	nc-template-options-path="addShopAppearanceForm/VideoLink">
					                            <input name="VideoLink2" ng-model="formData.VideoLink2"class="form-control" type="text" />
					                        </div>
					                        <div nc-template="common/input/form-group-with-label"
					                        	nc-label="Description">
					                            <textarea class="form-control" rows="4" type="text" ng-model="formData.Description2"></textarea>
					                        </div>
					                       	<div nc-template="common/input/form-group-with-label"
								                nc-template-form="form.Thumbnail2"
								                nc-label="Thumbnail Image">
								                  <button
								                  type="button"
								                  name="Thumbnail2"
								                  class="btn btn-default"
								                  ngf-accept="'.png,.jpg,.jpeg'"
								                  ngf-select="uploadLogo($file)"
								                  ng-model="formData.thumbnail2"
								                  ng-class="{'has-error-btn' : isInvalid(form.Thumbnail2)}"
								                  >Choose File</button>
								              </div>
								              <div ng-show="formData.Thumbnail2"
								                nc-template="common/input/form-group-with-label"
								                nc-label="Thumbnail Image Preview">
								                  <img
								                    ng-src="{{formData.Thumbnail2.url}}"
								                    width="160"
								                    />
								                  <a style="display:block;" class="margin-top-5" ng-click="formData.Thumbnail2=null"><i class="fa-trash fa"></i> Delete this image</a>
								              </div>
								          </div>
					                </div>
					            </div>
						    </div>
						</div>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<button class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
						</div>
					</div>
				</div>
		    </div>
        </form>
	</div>

<?php $this->stop() ?>
