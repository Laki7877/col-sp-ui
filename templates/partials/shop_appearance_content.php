<div id="shop-setting-content">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Layouts</h2>
                </div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Position 1" nc-template-options-path="shopAppearanceForm/Layout">
                        <select class="form-control">
                            <option seleted value='NewArrival'>New Arrival</option>
                            <option value='Available'>Available</option>
                        </select>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Position 2" nc-template-options-path="shopAppearanceForm/Layout">
                        <select class="form-control">
                            <option seleted value=''>-- Select Colletion --</option>
                            <option value='Available'>Available</option>
                        </select>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Position 3" nc-template-options-path="shopAppearanceForm/Layout">
                        <select class="form-control">
                            <option seleted value=''>-- Select Colletion --</option>
                            <option value='Available'>Available</option>
                        </select>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Position 4" nc-template-options-path="shopAppearanceForm/Layout">
                        <select class="form-control">
                            <option seleted value=''>-- Select Colletion --</option>
                            <option value='Available'>Available</option>
                        </select>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Position 5" nc-template-options-path="shopAppearanceForm/Layout">
                        <select class="form-control">
                            <option seleted value=''>-- Select Colletion --</option>
                            <option value='Available'>Available</option>
                        </select>
                    </div>
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