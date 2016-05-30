<div id="create_coupon_information_tab_content">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header"><h2>Credit Card Information</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Name TH" nc-template-form="formData.NameTH" nc-template-options-path="PromotionForm/NameTH">
                        <input class="form-control width-field-large" name="NameTH" ng-model="formData.NameTH" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Name EN" nc-template-form="formData.NameEN" nc-template-options-path="PromotionForm/NameEN">
                        <input class="form-control width-field-large" name="NameEN" ng-model="formData.NameEN" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Bank Name TH" nc-template-form="formData.BankNameTH" nc-template-options-path="PromotionForm/BankNameTH">
                        <input class="form-control width-field-large" name="BankNameTH" ng-model="formData.BankNameTH" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Bank Name EN" nc-template-form="formData.BankNameEN" nc-template-options-path="PromotionForm/BankNameEN">
                        <input class="form-control width-field-large" name="BankNameEN" ng-model="formData.BankNameEN" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Payment Id" nc-template-form="formData.PaymentId" nc-template-options-path="PromotionForm/PaymentId">
                        <input class="form-control width-field-large" name="PaymentId" ng-model="formData.PaymentId" ng-pattern="/^[^<>]+$/" maxlength="300" />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Promotion Code" nc-template-form="formData.PromotionCode" nc-template-options-path="PromotionForm/PromotionCode">
                        <input class="form-control width-field-large" name="PromotionCode" ng-model="formData.PromotionCode" ng-pattern="/^[^<>]+$/" maxlength="300" />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Status">
                        <div class="ah-select2-dropdown">
                            <select ng-model="formData.Status" class="form-control" required>
                                <option value="AT"> Active</option>
                                <option value="IA"> Inactive</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            <div class="form-section">
                <div class="form-section-header"><h2>Action</h2></div>
                <div class="form-section-content">

                    <div nc-template="common/input/form-group-with-label" nc-label="Discount Type">
                        <div class="ah-select2-dropdown">
                            <select ng-model="formData.DiscountType" class="form-control" required="">
                                <option value="PER"> Discount by percentage</option>
                                <option value="FIX"> Discount by fix rate</option>
                            </select>
                        </div>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Minimum Order Amount" nc-template-options-path="PromotionForm/MinimumOrderAmount">
                        <input type="text" class="form-control" ng-model="formData.MinimumOrderAmount" />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Maximum Discount Amount" nc-template-options-path="PromotionForm/MaximumDiscountAmount">
                        <input type="text" class="form-control" ng-model="formData.MaximumDiscountAmount" />
                    </div>

                </div>
            </div>
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Description</h2>
                </div>
                <div class="form-section-content">

                    <div nc-template="common/input/form-group-with-label" nc-label="Short Description (ไทย)" nc-template-options-path="PromotionForm/ShortDescriptionTH" nc-template-form="ShortDescriptionTH">
                        <textarea ng-pattern="/^[^<>]+$/" class="form-control" maxlength="300" style="max-width: 100%" name="ShortDescriptionTH" ng-model="formData.ShortDescriptionTH" />
                                </textarea>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Short Description (English)" nc-template-options-path="PromotionForm/ShortDescriptionEN" nc-template-form="ShortDescriptionEN">
                        <textarea ng-pattern="/^[^<>ก-๙]+$/" class="form-control" maxlength="300" style="max-width: 100%" name="ShortDescriptionEN" ng-model="formData.ShortDescriptionEN" />
                                    </textarea>
                    </div>
                </div>
            </div>
            <div class="form-section">
                <div class="form-section-header"><h2>Icon</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Icon URL TH" nc-template-options-path="PromotionForm/IconURLTH">
                        <input type="text" class="form-control" ng-model="formData.IconURLTH" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Icon URL EN" nc-template-options-path="PromotionForm/IconURLEN">
                        <input type="text" class="form-control" ng-model="formData.IconURLEN" />
                    </div>
                </div>
            </div>

            <div class="form-section">
                <div class="form-section-header">
                    <h2>More Details</h2>
                </div>
                <div class="form-section-content">
                    <div class="form-group">
                        <div class="width-label">
                            <label class="control-label">Effective On</label>
                        </div>
                        <div class="width-field-normal">
                            <div class="dropdown">
                                <a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
                                    <input readonly style="background-color:white" type="text" ng-class="{'has-error': formData.ExpireDate <= formData.EffectiveDate }" placeholder="Select date and time when credit card will go online" class="input-icon-calendar form-control" value="{{ formData.EffectiveDate | date: 'dd/MM/yy HH:mm' }}" />
                                </a>
                                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                    <datetimepicker data-ng-model="formData.EffectiveDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'minute', minuteStep: 30 }" />
                                </ul>
                            </div>
                            <span class="help-block"></span>
                        </div>
                        <div class="width-field-tooltip no-padding-left">
                            <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter" uib-tooltip="Date when your credit card will go online"></i>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="width-label">
                            <label class="control-label">Expire On</label>
                        </div>
                        <div class="width-field-normal">
                            <div class="dropdown">
                                <a class="dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" data-target="#" href="#">
                                    <input readonly style="background-color:white" type="text" placeholder="Select date and time when credit card will go offline" class="input-icon-calendar form-control" name="ExpiryDate" ng-class="{'has-error': formData.ExpiryDate <= formData.EffectiveDate }" value="{{ formData.ExpiryDate | date: 'dd/MM/yy HH:mm' }}">
                                </a>
                                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                    <datetimepicker data-ng-model="formData.ExpiryDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown3', minView: 'minute', minuteStep: 30 }" />
                                </ul>
                            </div>
                            <div class="width-field-large">
                                <span class="help-block color-red" ng-if="formData.ExpiryDate <= formData.EffectiveDate">
                                    <span>Effective date/time must come before expire date/time</span>
                                </span>
                            </div>

                        </div>
                        <div class="width-field-tooltip no-padding-left">
                            <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter" uib-tooltip="Date when your credit card will go offline"></i>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    </div>
</div>
