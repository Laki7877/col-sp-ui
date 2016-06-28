<?= $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Shop Appearance']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerShopAppearanceCtrl">
		<nc-alert nc-model="alert"></nc-alert>
        <nc-page-title nc-title="Shop Appearance" icon="fa-sliders">
            <!--button type="button" class="btn btn-white btn-width-xl margin-right-10">Preview</button-->
            <button class="btn btn-blue btn-width-xl" ng-if="themes.length > 0" ng-click="save()">Save</button>
        </nc-page-title>
		<div ng-show="loading" nc-loading="Loading.."></div>
		<div ng-show="saving" nc-loading="Saving.."></div>
        <form class="ah-form sticky-mainform-action" name="form" ng-submit="save()" ng-show="!loading && !saving">
	    <div>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<div id="shop-setting-content">
						    <div class="row">
        						<div class="col-xs-12">
        							<!-- theme -->
						            <div class="form-section">
						                <div class="form-section-header">
						                    <h2>Shop Theme</h2>
						                </div>
						                <div class="form-section-content image_preview">
											<div class="form-group">
											 	<div class="col-xs-12 no-padding">
													<div class="radio multiple-radio" ng-if="themes.length > 0">
														<label class="label_width" ng-repeat="t in themes track by $index">
															<input type="radio" name="theme{{$index+1}}" ng-model="formData.ThemeId" ng-value="t.ThemeId">{{t.ThemeName}}
															<img class="image_radion_thumbnail" ng-src="{{ t.ThemeImage }}" >
														</label>
													</div>
													<div ng-if="themes.length == 0">
									            		<p class="text-center">This shop has no theme</p>
													</div>
												</div>
											</div>
										</div>
						            </div>
						            <!-- templates -->
						            <div ng-switch="formData.ThemeId">
						            	<!-- basic template -->
						            	<div ng-switch-when="1">
						            		<nc-image-banner-link
						            			source="formData.Data.A_Banner"
						            		 	letter="A"
						            		 	letterx="A1"
						            		 	title="Banner"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="1920" 
						            		 	height="1080" 
						            		 	fail="uploadFail">
						            		</nc-image-banner-link>
						            		<nc-product-layout 
						            			source="formData.Data.B_ProductLayout"
						            			letter="B"
						            			title="Product Layout 1"
						            			refresh="getProducts"
						            			products="products">
						            		</nc-product-layout>
						            		<nc-product-layout 
						            			source="formData.Data.C_ProductLayout"
						            			letter="C"
						            			title="Product Layout 2"
						            			refresh="getProducts"
						            			products="products">
						            		</nc-product-layout>
						            		<nc-product-layout 
						            			source="formData.Data.D_ProductLayout"
						            			letter="D"
						            			title="Product Layout 3"
						            			refresh="getProducts"
						            			products="products">
						            		</nc-product-layout>
						            		<nc-image-banner-video
						            			source="formData.Data.E_Video"
						            		 	letter="E"
						            		 	letterx="E1"
						            		 	title="Video"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="530" 
						            		 	height="300"
						            		 	accept="'.jpg,.jpeg,.png'"
						            		 	fail="uploadFail">
						            		</nc-image-banner-video>
						            		<nc-image-banner-icon
						            			source="formData.Data.F_Icon"
						            		 	letter="F"
						            		 	letterx="F1"
						            		 	title="Social Network Icons"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="64" 
						            		 	height="64" 
						            		 	fail="uploadFail"
						            		 	subtitle="Icon Type"
						            		 	accept="'.png'">
						            		 </nc-image-banner-icon>
						            		 <nc-textareas
						            		 	source="formData.Data.G_Textarea"
						            		 	letter="G"
						            		 	title="Footer Text"
						            		 	size="2">
						            		 </nc-textareas>
						            	</div>
						            	<!-- robinson -->
						            	<div ng-switch-when="2">
						            		<nc-text-link 
						            			source="formData.Data.A_Text"
						            			letter="A"
						            			letterx="A1"
						            			title="Top Menu 1">
						            		</nc-text-link>
						            		<nc-image-links 
						            			source="formData.Data.B_Image"
						            			letter="B"
						            			title="Top Menu 2"
						            			uploader="uploader"
						            			fail="uploadFail"
						            			size="1">
						            		</nc-image-links>
						            		<nc-image-banner-link
						            			source="formData.Data.C_Banner"
						            		 	letter="C"
						            		 	letterx="C1"
						            		 	title="Banner"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="1920" 
						            		 	height="1080" 
						            		 	fail="uploadFail">
						            		 </nc-image-banner-link>
						            		<nc-image-links 
						            			source="formData.Data.D_Image"
						            			letter="D"
						            			title="Sub Banner 1"
						            			uploader="uploader"
						            			fail="uploadFail"
						            			width="[1500,460,460,460,730]"
						            			height="[600,340,340,340,1180]"
						            			size="5">
						            		</nc-image-links>
						            		<nc-image-banner-link
						            			source="formData.Data.E_Banner"
						            		 	letter="E"
						            		 	letterx="E1"
						            		 	title="Banner"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="530" 
						            		 	height="240" 
						            		 	fail="uploadFail"
						            		 	subtitle="Sub Banner"
						            		 	accept="'.png'"
						            		 	heading="true"
						            		 	noauto="true">
						            		</nc-image-banner-link>
						            		<nc-product-layout 
						            			source="formData.Data.F_ProductLayout"
						            			letter="F"
						            			title="Product Layout 1"
						            			refresh="getProducts"
						            			products="products">
						            		</nc-product-layout>
						            		<nc-product-layout 
						            			source="formData.Data.G_ProductLayout"
						            			letter="G"
						            			letterx="G1"
						            			title="Product Layout 2"
						            			subtitle="true"
						            			refresh="getProducts"
						            			products="products">
						            		</nc-product-layout>
						            		<nc-product-layout 
						            			source="formData.Data.H_ProductLayout"
						            			letter="H"
						            			letterx="H1"
						            			title="Product Layout 3"
						            			subtitle="true"
						            			refresh="getProducts"
						            			products="products">
						            		</nc-product-layout>
						            		<nc-image-links 
						            			source="formData.Data.I_Image"
						            			letter="I"
						            			title="Sub Banner 3"
						            			uploader="uploader"
						            			fail="uploadFail"
						            			notitle="true"
						            			width="[2280]"
						            			height="[150]"
						            			accept="'.jpg,.jpeg,.png'"
						            			size="1">
						            		</nc-image-links>
						            		<nc-image-links 
						            			source="formData.Data.J_Image"
						            			letter="J"
						            			title="Sub Banner 4"
						            			uploader="uploader"
						            			fail="uploadFail"
						            			notitle="true"
						            			min-width="[2280]"
						            			accept="'.jpg,.jpeg,.png'"
						            			size="1">
						            		</nc-image-links>
						            		<nc-image-banner-icon
						            			source="formData.Data.K_Icon"
						            		 	letter="K"
						            		 	letterx="K1"
						            		 	title="Social Network Icons"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="64" 
						            		 	height="64" 
						            		 	fail="uploadFail"
						            		 	subtitle="Icon Type">
						            		 </nc-image-banner-icon>
						            		 <nc-textareas
						            		 	source="formData.Data.L_Textarea"
						            		 	letter="L"
						            		 	title="Footer Text"
						            		 	size="2">
						            		 </nc-textareas>
						            	</div>
						            	<div ng-switch-when="3">
						            		<nc-text-link 
						            			source="formData.Data.A_Text"
						            			letter="A"
						            			letterx="A1"
						            			title="Top Menu 1">
						            		</nc-text-link>
						            		<nc-image-links 
						            			source="formData.Data.B_Image"
						            			letter="B"
						            			title="Top Menu 2"
						            			uploader="uploader"
						            			fail="uploadFail"
						            			size="1">
						            		</nc-image-links>
						            		<nc-image-banner-link
						            			source="formData.Data.C_Banner"
						            		 	letter="C"
						            		 	letterx="C1"
						            		 	title="Banner"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="1920" 
						            		 	height="1080" 
						            		 	fail="uploadFail">
						            		 </nc-image-banner-link>
						            		<nc-image-banner-link
						            			source="formData.Data.D_Banner"
						            		 	letter="D"
						            		 	letterx="D1"
						            		 	title="Sub Banner 1"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="520" 
						            		 	height="520" 
						            		 	fail="uploadFail"
						            		 	subtitle="Sub Banner"
						            		 	heading="true"
						            		 	noauto="true">
						            		 </nc-image-banner-link>
						            		<nc-image-banner-link
						            			source="formData.Data.E_Banner"
						            		 	letter="E"
						            		 	letterx="E1"
						            		 	title="Sub Banner 2"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="520" 
						            		 	height="740" 
						            		 	fail="uploadFail"
						            		 	subtitle="Sub Banner"
						            		 	heading="true"
						            		 	noauto="true">
						            		 </nc-image-banner-link>
						            		<nc-product-layout 
						            			source="formData.Data.F_ProductLayout"
						            			letter="F"
						            			title="Product Layout 1"
						            			refresh="getProducts"
						            			subtitle="true"
						            			products="products">
						            		</nc-product-layout>
						            		<nc-product-layout 
						            			source="formData.Data.G_ProductLayout"
						            			letter="G"
						            			letterx="G1"
						            			title="Product Layout 2"
						            			subtitle="true"
						            			refresh="getProducts"
						            			products="products">
						            		</nc-product-layout>
						            		<nc-image-banner-link
						            			source="formData.Data.H_Banner"
						            		 	letter="H"
						            		 	letterx="H1"
						            		 	title="Sub Banner 3"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="320" 
						            		 	height="320" 
						            		 	fail="uploadFail"
						            		 	subtitle="Sub Banner"
						            		 	heading="true"
						            		 	noauto="true">
						            		 </nc-image-banner-link>
						            		<nc-image-banner-video
						            			source="formData.Data.I_Video"
						            		 	letter="I"
						            		 	letterx="I1"
						            		 	title="Video"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="530" 
						            		 	height="300"
						            		 	accept="'.jpg,.jpeg,.png'" 
						            		 	fail="uploadFail">
						            		 </nc-image-banner-video>
						            		<nc-image-banner-link
						            			source="formData.Data.J_Banner"
						            		 	letter="J"
						            		 	letterx="J1"
						            		 	title="Sub Banner 4"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="530" 
						            		 	height="300" 
						            		 	accept="'.jpg,.jpeg,.png'"
						            		 	fail="uploadFail"
						            		 	noauto="true">
						            		 </nc-image-banner-link>
						            		<nc-image-links 
						            			source="formData.Data.K_Image"
						            			letter="K"
						            			title="Sub Banner 5"
						            			uploader="uploader"
						            			fail="uploadFail"
						            			min-width="[2280]"
						            		 	accept="'.jpg,.jpeg,.png'"
						            			size="1">
						            		</nc-image-links>
						            		<nc-image-banner-icon
						            			source="formData.Data.L_Icon"
						            		 	letter="L"
						            		 	letterx="L1"
						            		 	title="Social Network Icons"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="64" 
						            		 	height="64" 
						            		 	fail="uploadFail"
						            		 	subtitle="Icon Type">
						            		 </nc-image-banner-icon>
						            		 <nc-textareas
						            		 	source="formData.Data.M_Textarea"
						            		 	letter="M"
						            		 	title="Footer Text"
						            		 	size="2">
						            		 </nc-textareas>
						            	</div>
						            	<div ng-switch-when="4">
						            		<nc-image-links
						            			source="formData.Data.A_Image"
						            			letter="A"
						            			title="Top Menu 1"
						            			uploader="uploader"
						            			fail="uploadFail"
						            			size="1">
						            		</nc-image-links>
						            		<nc-image-banner-link
						            			source="formData.Data.B_Banner"
						            		 	letter="B"
						            		 	letterx="B1"
						            		 	title="Banner 1"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="1140" 
						            		 	height="640" 
						            		 	fail="uploadFail">
						            		</nc-image-banner-link>
						            		<nc-image-links-hover
						            			source="formData.Data.C_Image"
						            			letter="C"
						            			title="Sub Banner 1"
						            			uploader="uploader"
						            			fail="uploadFail"
						            			width="[750,360,360,360]"
						            			height="[218,218,218,488]"
						            			size="4">
						            		</nc-image-links-hover>
						            		<nc-title-view
						            			source="formData.Data.D_Title"
						            			letter="D"
						            			letterx="D1"
						            			refresh="getCategories"
						            			categories="categories"
						            			title="Title Head">
						            		</nc-title-view>
						            		<nc-image-links-hover
						            			source="formData.Data.E_Image"
						            			letter="E"
						            			title="Sub Banner 2"
						            			uploader="uploader"
						            			fail="uploadFail"
						            			width="[404,416,416]"
						            			height="[488,218,218]"
						            			size="3">
						            		</nc-image-links-hover>
						            		<nc-small-banner 
						            			source="formData.Data.F_SmallBanner"
						            			letter="F"
						            			title="Side Banner 1"
						            			uploader="uploader"
						            			fail="uploadFail"
						            			width="[262,262,262,262,262,262,262,262]"
						            			height="[102,102,102,102,102,102,102,102]"
						            			size="8">
						            		</nc-small-banner>
						            		<nc-image-banner-link
						            			source="formData.Data.G_Banner"
						            		 	letter="G"
						            		 	letterx="G1"
						            		 	title="Sub Banner 1"
						            		 	uploader="uploader" 
						            		 	size="1" 
						            		 	width="1140" 
						            		 	height="300" 
						            		 	accept="'.jpg,.jpeg,.png'"
						            		 	fail="uploadFail"
						            		 	noauto="true">
						            		 </nc-image-banner-link>
						            		<nc-title-view
						            			source="formData.Data.H_Title"
						            			letter="H"
						            			letterx="H1"
						            			title="Title Head 2">
						            		</nc-title-view>
						            		<nc-image-banner-icon
						            			source="formData.Data.I_Icon"
						            		 	letter="I"
						            		 	letterx="I1"
						            		 	title="Social Network Icons"
						            		 	uploader="uploader" 
						            		 	size="8" 
						            		 	width="64" 
						            		 	height="64" 
						            		 	fail="uploadFail"
						            		 	subtitle="Icon Type">
						            		 </nc-image-banner-icon>
						            		 <nc-textareas
						            		 	source="formData.Data.J_Textarea"
						            		 	letter="J"
						            		 	title="Footer Text"
						            		 	size="2">
						            		 </nc-textareas>
						            	</div>
						            	<div ng-switch-default>
						            	</div>
						            </div>
	          						<!--nc-image-banner2 ng-if="hasComponent('Banner')"  name="Banner" nc-model="formData.Banner.Images" source="formData" title="Banner Upload" uploader="bannerUploader" on-fail="uploadBannerFail" size="getComponent('Banner')"></nc-image-banner2>
						            <div ng-if="hasComponent('Layout')" class="form-section">
						                <div class="form-section-header">
						                    <h2><input style="margin-right:10px" type="checkbox" ng-model="formData.IsLayout" />Layouts</h2>
						                </div>
						                <div class="form-section-content" ng-show="formData.IsLayout">
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
						                <div class="form-section-content" ng-show="formData.IsVideo">
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
						            </div-->
							    </div>
							</div>
						</div>
					</div>
					<div class="add-product-form-action main-form-action full-width-row">
						<div class="container-fluid">
							<div class="float-right">
								<button class="btn btn-blue btn-width-xl" ng-if="themes.length > 0" ng-click="save()">Save</button>
							</div>
						</div>
					</div>
				</div>
		    </div>
        </form>
	</div>

<?php $this->stop() ?>
