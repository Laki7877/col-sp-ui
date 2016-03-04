<div id="add-product-more-option-tab-content">
        <div nc-template="add-product/inner-tab-breadcrumb" nc-view-bag="formData"></div>

        <div class="row">
            <div class="col-xs-12">
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Relationship</h2></div>
                    <div class="form-section-content">

                        <div nc-template="common/input/form-group-with-label" nc-label="Related Products" nc-template-form="addProductForm.RelatedProducts" nc-template-options-path="addProductForm/RelatedProducts">
                            <ui-select ng-model="formData.RelatedProducts" name="RelatedProducts" nc-tag-validator nc-max-tag-count="10" multiple>
                                <ui-select-match placeholder="Input Product Name">
                                    <span>{{ $item.ProductNameEn }}</span>
                                </ui-select-match>
                                <ui-select-choices repeat="item in (dataSet.RelatedProducts | exclude: formData.RelatedProducts : 'ProductId' | exclude: [formData] : 'ProductId' ) track by item.Pid" refresh="refreshRelatedProducts($select.search)" refresh-delay="1">
                                    {{ item.ProductNameEn }}
                                </ui-select-choices>
                            </ui-select>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>SEO</h2></div>
                    <div class="form-section-content">

                        
                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.SEO_MetaTitleEn" nc-label="Meta Title (English)" 
                        nc-template-options-path="addProductForm/Nothing">
                            <input class="form-control width-field-normal" name="SEO_MetaTitleEn" ng-model="formData.SEO.MetaTitleEn" maxlength="60" />
                        </div>
                        
                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.SEO_MetaTitleTh" nc-label="Meta Title (ไทย)" 
                        nc-template-options-path="addProductForm/Nothing">
                            <input class="form-control width-field-normal" name="SEO_MetaTitleTh" ng-model="formData.SEO.MetaTitleTh" maxlength="60" />
                        </div>

                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.SEO_MetaDescriptionEn" nc-label="Meta Description (English)" nc-template-options-path="addProductForm/Nothing">
                            <input maxlength="150" class="form-control width-field-normal" name="SEO_MetaDescriptionEn" ng-model="formData.SEO.MetaDescriptionEn" />
                        </div>
                        
                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.SEO_MetaDescriptionTh" nc-label="Meta Description (ไทย)" nc-template-options-path="addProductForm/Nothing">
                            <input maxlength="150" class="form-control width-field-normal" name="SEO_MetaDescriptionTh" ng-model="formData.SEO.MetaDescriptionTh" />
                        </div>

                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.SEO_MetaKeywordsEn" nc-label="Meta Keywords (English)" nc-template-options-path="addProductForm/Nothing">
                            <input placeholder="Keywords separated by comma" class="form-control width-field-normal" name="SEO_MetaKeywordsEn" ng-model="formData.SEO.MetaKeywordEn" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.SEO_MetaKeywordsEn) }" />
                        </div>

                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.SEO_MetaKeywordsTh" nc-label="Meta Keywords (ไทย)" nc-template-options-path="addProductForm/Nothing">
                            <input placeholder="Keywords separated by comma" class="form-control width-field-normal" name="SEO_MetaKeywordsTh" ng-model="formData.SEO.MetaKeywordTh" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.SEO_MetaKeywordsTh) }" />
                        </div>

                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.SEO_ProductUrlKeyEn" nc-label="Product URL Key" 
                        nc-template-options-path="addProductForm/Nothing">
                            <input maxlength="300" class="form-control width-field-normal" ng-pattern="/^[A-Za-z0-9_\-]+$/" name="SEO_ProductUrlKeyEn" ng-model="formData.SEO.ProductUrlKeyEn" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.SEO_ProductUrlKeyEn) }" />
                        </div>

                        <div nc-template="common/input/form-group-with-label" nc-template-options-path="addProductForm/Nothing" nc-template-form="addProductForm.SEO_ProductBoostingWeight" nc-label="Product Boosting Weight">
                            <input type="number" class="form-control width-field-normal" min="0" max="10000" step="1" 
                            ng-pattern="/^[0-9]+$/" name="SEO_ProductBoostingWeight" ng-model="formData.SEO.ProductBoostingWeight" 
                            ng-class="{ 'has-error' : $root.isInvalid(addProductForm.SEO_ProductBoostingWeight) }"/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>More Details</h2></div>
                    <div class="form-section-content">

                        <div class="form-group">
                            <div class="width-label">
                                <label class="control-label">Effective On</label>
                            </div>
                            <div class="width-field-normal">
                                <div class="dropdown">
                                    <a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
                                        <input readonly style="background-color:white" type="text" ng-class="{'has-error': formData.ExpireDate && formData.ExpireDate <= formData.EffectiveDate }" placeholder="Select date and time when product will go online" class="input-icon-calendar form-control"
                                        value="{{ formData.EffectiveDate | date: 'dd/MM/yy HH:mm' }}" />
                                    </a>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                        <datetimepicker data-ng-model="formData.EffectiveDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'hour' }" />
                                    </ul>
                                </div>
                                <span class="help-block"></span>
                            </div>
                            <div class="width-field-tooltip no-padding-left">
                                <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter" uib-tooltip="Date when your product will go online"></i>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="width-label">
                                <label class="control-label">Expire On</label>
                            </div>
                            <div class="width-field-normal">
                                <div class="dropdown">
                                    <a class="dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" data-target="#" href="#">
                                        <input readonly style="background-color:white" type="text" placeholder="Select date and time when product will go offline" class="input-icon-calendar form-control" name="ExpireDate" ng-class="{'has-error': formData.ExpireDate && formData.ExpireDate <= formData.EffectiveDate }"
                                        value="{{ formData.ExpireDate | date: 'dd/MM/yy HH:mm' }}">
                                    </a>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                        <datetimepicker data-ng-model="formData.ExpireDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown3', minView: 'hour' }" />
                                    </ul>
                                </div>
                                <div class="width-field-large">
                                    <span class="help-block color-red" ng-if="formData.ExpireDate && formData.ExpireDate <= formData.EffectiveDate">
								                              <span>Effective date/time must come before expire date/time</span>
                                    </span>
                                </div>

                            </div>
                            <div class="width-field-tooltip no-padding-left">
                                <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter" uib-tooltip="Date when your product will go offline"></i>
                            </div>
                        </div>

                        
                        <div class="form-group">
                            <div class="width-label"><label class="control-label">Control Flag</label></div>
                            <div class="width-field-normal">
                                <div class="checkbox multiple-checkbox">

                                        <label><input type="checkbox"  ng-model="formData.ControlFlags.Flag1">Flag 1</label>
                                        <label><input type="checkbox"  ng-model="formData.ControlFlags.Flag2">Flag 2</label>
                                        <label><input type="checkbox"  ng-model="formData.ControlFlags.Flag3">Flag 3</label>

                                </div>
                            </div>
                        </div>

                        <div nc-template="common/input/form-group-with-label" nc-template-options-path="addProductForm/Remark" nc-template-form="addProductForm.Remark" nc-label="Remark">
                                <textarea class="form-control" ng-pattern="/^[^<>]+$/"  maxlength="2000" name="Remark" ng-model="formData.Remark"  />
                                </textarea>
                            </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="row">
            <div class="col-xs-12">
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Approve Versions</h2></div>
                    <div class="form-section-content">
                        <div class="table-wrapper">
                            <table class="table" id="add-product-approve-versions">
                                <thead>
                                    <tr>
                                        <th class="thead-approved-date">Approved Date</th>
                                        <th class="thead-submitted-date">Submitted Date</th>
                                        <th class="thead-submitted-by">Submitted By</th>
                                        <th class="thead-actions">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>14/10/2015 at 13:14:50</td>
                                        <td>10/10/2015 at 13:14:50</td>
                                        <td>Andrea Bolan</td>
                                        <td>
                                            <button class="btn btn-white">View</button>
                                            <button class="btn btn-white">Restore</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>14/10/2015 at 13:14:50</td>
                                        <td>10/10/2015 at 13:14:50</td>
                                        <td>John Dara</td>
                                        <td>
                                            <button class="btn btn-white">View</button>
                                            <button class="btn btn-white">Restore</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
</div>