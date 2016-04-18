<div id="shop-setting-content">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Shop Theme</h2>
                </div>
                <div class="form-section-content image_preview">
                    <? $this->insert('components/forms/multiple-radio-image', ["choices" => ["Basic Theme"]]) ?>
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Highlight Video</h2></div>
                <div class="form-section-content">
                    <div class="margin-bottom-40">
                        <div nc-template="common/input/form-group-with-label" nc-label="Video Link 1" nc-template-options-path="shopAppearanceForm/VideoLink">
                            <input class="form-control" type="text" />
                        </div>
                        <div nc-template="common/input/form-group-with-label" nc-label="Description" nc-template-options-path="">
                            <textarea class="form-control" rows="4" type="text" ng-model="" /></textarea>
                        </div>
                        <? $this->insert('components/forms/upload-field-input-with-label', ["label" => "Thumbnail Image"]) ?>
                        <? $this->insert('components/forms/image-preview', ["label" => "Thumbnail Image Preview"]) ?>
                    </div>
                    <div>
                        <div nc-template="common/input/form-group-with-label" nc-label="Video Link 1" nc-template-options-path="shopAppearanceForm/VideoLink">
                            <input class="form-control" type="text" />
                        </div>
                        <div nc-template="common/input/form-group-with-label" nc-label="Description" nc-template-options-path="">
                            <textarea class="form-control" rows="4" type="text" ng-model="" /></textarea>
                        </div>
                        <? $this->insert('components/forms/upload-field-input-with-label', ["label" => "Thumbnail Image"]) ?>
                        <? $this->insert('components/forms/image-preview', ["label" => "Thumbnail Image Preview"]) ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>