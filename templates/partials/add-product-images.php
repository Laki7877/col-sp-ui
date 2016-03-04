<div id="add-product-images-tab-content">
        <div nc-template="add-product/inner-tab-breadcrumb" nc-view-bag="formData"></div>

        <div class="row">
            <div class="col-xs-12">
                <nc-alert nc-model="image_alert"></nc-alert>
                        <?php $this->insert('components/forms/form-section-upload-new-product-image', ['uploader' => 'uploader', 'images' => 'formData.MasterImages']) ?>
                        <div class="form-section">
                            <div class="form-section-header checkbox">
                                <label>
                                    <input type="checkbox" ng-model="controlFlags.enableSections.embedVideo"> Embed Video
                                </label>
                            </div>
                            <div class="form-section-content" ng-if='controlFlags.enableSections.embedVideo'>
                                <div ng-template="common/input/text2" ng-template-options="{
				                        'label': 'Video Link 1',
				                        'hint': {
				                        	'show': true,
				                        	'message': 'Example: https://www.youtube.com/watch?v=f78M4nKW1Ms'
				                        },
				                        'error' : {
				                              'messages': {
				                              	'url': 'Please enter valid URL'
				                              },
				                              'show': $root.isInvalid(addProductForm.VideoLinks0),
				                              'conditions' : addProductForm.VideoLinks0.$error
				                         }
				                      }">
                                    <input class="form-control width-field-normal" name="VideoLinks0" type="url" maxlength="500" ng-model="formData.VideoLinks[0]" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.VideoLinks0) }" />
                                </div>

                                <div ng-template="common/input/text2" ng-template-options="{
				                        'label': 'Video Link 2',
				                        'hint': {
				                        	'show': true,
				                        	'message': 'Example: https://www.youtube.com/watch?v=f78M4nKW1Ms'
				                        },
				                        'error' : {
				                              'messages': {
				                              	'url': 'Please enter valid URL'
				                              },
				                              'show': $root.isInvalid(addProductForm.VideoLinks1),
				                              'conditions' : addProductForm.VideoLinks1.$error
				                         }
				                      }">
                                    <input class="form-control width-field-normal" name="VideoLinks1" type="url" maxlength="500" ng-model="formData.VideoLinks[1]" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.VideoLinks1) }" />
                                </div>

                                <div ng-template="common/input/text2" ng-template-options="{
				                        'label': 'Video Link 3',
				                        'hint': {
				                        	'show': true,
				                        	'message': 'Example: https://www.youtube.com/watch?v=f78M4nKW1Ms'
				                        },
				                        'error' : {
				                              'messages': {
				                              	'url': 'Please enter valid URL'
				                              },
				                              'show': $root.isInvalid(addProductForm.VideoLinks2),
				                              'conditions' : addProductForm.VideoLinks2.$error
				                         }
				                      }">
                                    <input type="url" class="form-control width-field-normal" name="VideoLinks2" maxlength="500" ng-model="formData.VideoLinks[2]" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.VideoLinks2) }" />
                                </div>

                            </div>
                        </div>
            </div>
        </div>
</div>

<!-- modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="product-image-zoom">
	<div class="modal-dialog modal-product-image">
		<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt=""/>
	</div>
</div>