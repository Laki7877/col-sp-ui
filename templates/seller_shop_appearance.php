<?= $this->layout('layouts/page-with-sidebar', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerShopAppearanceCtrl">
		<nc-alert nc-model="alert"></nc-alert>
        <nc-page-title nc-title="Shop Appearance" icon="fa-sliders">
            <button type="button" class="btn btn-white btn-width-xl margin-right-10">Preview</button>
            <button class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
        </nc-page-title>
		<div ng-show="loading" nc-loading="Loading.."></div>
		<div ng-show="saving" nc-loading="Saving.."></div>
        <form class="ah-form sticky-mainform-action" name="form" ng-submit="save()" ng-show="!loading && !saving">
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
													<label class="label_width" ng-repeat="t in themes track by $index">
														<input type="radio" name="theme{{$index+1}}" ng-model="formData.ThemeId" ng-value="t.ThemeId">{{t.ThemeName}}
														<img class="image_radion_thumbnail" ng-src="{{ t.ThemeImage }}" >
													</label>
												</div>
											</div>
										</div>
									</div>
					            </div>
          						<nc-image-banner2 ng-if="hasComponent('Banner')"  name="Banner" nc-model="formData.Banner.Images" source="formData" title="Banner Upload" uploader="bannerUploader" on-fail="uploadBannerFail" size="getComponent('Banner')"></nc-image-banner2>
					            <div ng-if="hasComponent('Layout')" class="form-section">
					                <div class="form-section-header">
					                    <h2><input style="margin-right:10px" type="checkbox" ng-model="formData.IsLayout" />Layouts</h2>
					                </div>
					                <div class="form-section-content">
					                    <div ng-repeat="layout in formData.Layouts track by $index">
					                    	<div class="form-group">
					                    		<div class="width-label"><label class="control-label">Position {{$index+1}}</label></div>
					                    		<div class="width-field-normal">
							                        <select ng-model="layout.CollectionName" class="form-control">
		                        						<option value="">-- Select Collection --</option>
							                            <option value="New Arrival">New Arrival</option>
							                            <option value="Available">Available</option>
							                        </select>
							                    </div>
						                        <div class="width-field-normal">
						                        	<input class="form-inline" type="checkbox" ng-model="layout.DisplayCountTime"/> Display Countdown Time
						                        </div>
					                    	</div>
					                   	</div>
					                </div>
					            </div>
					            <div ng-if="hasComponent('Video')" class="form-section">
					                <div class="form-section-header">
					                    <h2><input style="margin-right:10px" type="checkbox" ng-model="formData.IsVideo" />Highlight Video</h2></div>
					                <div class="form-section-content">
					                    <div ng-repeat="video in formData.Videos track by $index" class="margin-bottom-40">
					                        <div nc-template="common/input/form-group-with-label"
					                        	nc-label="Video Link {{$index+1}}"
					                        	nc-template-form="form['VideoLink' + $index]"
					                        	nc-template-options-path="addShopAppearanceForm/VideoLink">
					                            <input name="VideoLink{{$index}}" ng-model="video.Url" class="form-control" type="url" />
					                        </div>
					                        <div nc-template="common/input/form-group-with-label"
					                        	nc-label="Description">
					                            <textarea class="form-control" rows="4" type="text" ng-model="video.Description"></textarea>
					                        </div>
					                       	<div nc-template="common/input/form-group-with-label"
								                nc-template-form="form['Thumbnail' + $index]"
								                nc-label="Thumbnail Image">
								                  <button
								                  type="button"
								                  name="Thumbnail{{$index}}"
								                  class="btn btn-default"
								                  ngf-accept="'.png,.jpg,.jpeg'"
								                  ngf-select="uploadThumbnail($file, video)"
								                  >Choose File</button>
								            </div>
								            <div ng-show="video.Thumbnail && video.Thumbnail != ''"
								                nc-template="common/input/form-group-with-label"
								                nc-label="Thumbnail Image Preview">
								                  <img ng-src="{{video.Thumbnail}}" width="160" />
								                  <a style="display:block;" class="margin-top-5" ng-click="video.Thumbnail=''"><i class="fa-trash fa"></i> Delete this image</a>
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
