<div id="shop-setting-content">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Shop Information</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Shop ID" nc-template-options-path="shopSettingForm/ShopId">
                        <input class="form-control" type="text" ng-model="formData.ShopId" readonly value="DE39222" disabled/>
                    </div>
                    <!-- Shop Status -->
                    <div ng-template="common/input/dropdown" ng-template-options="{
                      'label' : 'Shop Status',
                      'labelClass' : 'required'
                      }">
                        <ui-select ng-model="formData.Status" search-enabled="false" required>
                            <ui-select-match placeholder="- Select Shop Status -">
                                <span ng-bind="$select.selected.name"></span>
                            </ui-select-match>
                            <ui-select-choices repeat="item in statusDropdown">
                                <span ng-bind="item.name"></span>
                            </ui-select-choices>
                        </ui-select>
                    </div>

                    <div class="form-group">
                        <div class="width-label">
                            <label class="control-label">Shop Logo</label>
                        </div>
                        <div class="width-field-normal">
                            <div nc-template="components/single-upload" nc-view-bag="uploadViewBag"></div>
                        </div>
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Name" nc-template-options-path="shopSettingForm/ShopNameEn">
                        <input class="form-control" type="text" ng-model="formData.ShopNameEn" ng-pattern="/^[^<>]+$/" required/>
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Description (English)" nc-template-options-path="shopSettingForm/ShopDescriptionEn">
                        <textarea class="form-control" rows="4" type="text" ng-model="formData.ShopDescriptionEn"></textarea>
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Description (ไทย)" nc-template-options-path="shopSettingForm/ShopDescriptionTh">
                        <textarea class="form-control" rows="4" type="text" ng-model="formData.ShopDescriptionTh"></textarea>
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Float Message (English)" nc-template-options-path="shopSettingForm/FloatMessageEn">
                        <input class="form-control" type="text" ng-model="formData.FloatMessageEn" />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Float Message (ไทย)" nc-template-options-path="shopSettingForm/FloatMessageTh">
                        <input class="form-control" type="text" ng-model="formData.FloatMessageTh" />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Address" nc-template-options-path="shopSettingForm/ShopAddress">
                        <textarea class="form-control" rows="4" type="text" ng-model="formData.ShopAddress" /></textarea>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Social Media Link</h2></div>
                <div class="form-section-content">

                    <div nc-template="common/input/form-group-with-label" nc-label="Facebook" nc-template-options-path="shopSettingForm/Facebook">
                        <input class="form-control" type="text" ng-model="formData.Facebook" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="YouTube" nc-template-options-path="shopSettingForm/YouTube">
                        <input class="form-control" type="text" ng-model="formData.YouTube" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Twitter" nc-template-options-path="shopSettingForm/Twitter">
                        <input class="form-control" type="text" ng-model="formData.Twitter" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Instagram" nc-template-options-path="shopSettingForm/Instagram">
                        <input class="form-control" type="text" ng-model="formData.Instagram" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Pinterest" nc-template-options-path="shopSettingForm/Pinterest">
                        <input class="form-control" type="text" ng-model="formData.Pinterest" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header">
                    <h2>More Options</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Gift Wrap" nc-template-options-path="shopSettingForm/GiftWrap">
                        <select class="form-control" ng-model="formData.GiftWrap">
                            <option value='NotAvailable'>Not Available</option>
                            <option value='Available'>Available</option>
                        </select>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Tax Invoice" nc-template-options-path="shopSettingForm/TaxInvoice">
                        <select class="form-control" ng-model="formData.TaxInvoice">
                            <option value='NotAvailable'>Not Available</option>
                            <option value='Available'>Available</option>
                        </select>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Stock Alert" nc-template-options-path="shopSettingForm/StockAlert">
                        <input class="form-control" type="text" ng-model="formData.StockAlert" ng-pattern-restrict="^[0-9]*$" />
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Shop Address and Contact Information</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" 
                        nc-label="Address 1">
                        <input class="form-control" ng-model="formData.Address1" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" 
                        nc-label="Address 2">
                        <input class="form-control" ng-model="formData.Address2" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" 
                        nc-label="Address 3">
                        <input class="form-control" ng-model="formData.Address3" />
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.OverseaShop"
                        nc-label="Oversea Shop"
                        nc-template-options-path="addShopAccountForm/OverseaShop">
                            <ui-select name="OverseaShop" ng-model="formData.OverseaShop" search-enabled="false">
                                <ui-select-match placeholder="- Select Oversea Shop -">
                                    <span ng-bind="$select.selected.name"></span>
                                </ui-select-match>
                                <ui-select-choices repeat="item.value as item in overseaShops">
                                    <span ng-bind="item.name"></span>
                                </ui-select-choices>
                            </ui-select>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.Country"
                        nc-label="Country"
                        nc-template-options-path="addShopAccountForm/Country">
                            <ui-select name="Country" ng-model="formData.Country" search-enabled="false">
                                <ui-select-match placeholder="- Select Country -">
                                    <span ng-bind="$select.selected.name"></span>
                                </ui-select-match>
                                <ui-select-choices repeat="item.value as item in countries">
                                    <span ng-bind="item.name"></span>
                                </ui-select-choices>
                            </ui-select>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.CountryCode"
                        nc-label="Country Code"
                        nc-template-options-path="addShopAccountForm/CountryCode">
                            <ui-select name="CountryCode" ng-model="formData.CountryCode" search-enabled="false">
                                <ui-select-match placeholder="- Select CountryCode -">
                                    <span ng-bind="$select.selected.name"></span>
                                </ui-select-match>
                                <ui-select-choices repeat="item.value as item in countryCodes">
                                    <span ng-bind="item.name"></span>
                                </ui-select-choices>
                            </ui-select>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.Province"
                        nc-label="Province"
                        nc-template-options-path="addShopAccountForm/Province">
                            <ui-select name="Province" ng-model="formData.Province" search-enabled="false">
                                <ui-select-match placeholder="- Select Province -">
                                    <span ng-bind="$select.selected.name"></span>
                                </ui-select-match>
                                <ui-select-choices repeat="item.value as item in provinces">
                                    <span ng-bind="item.name"></span>
                                </ui-select-choices>
                            </ui-select>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.City"
                        nc-label="City"
                        nc-template-options-path="addShopAccountForm/City">
                            <ui-select name="City" ng-model="formData.City" search-enabled="false">
                                <ui-select-match placeholder="- Select City -">
                                    <span ng-bind="$select.selected.name"></span>
                                </ui-select-match>
                                <ui-select-choices repeat="item.value as item in cities">
                                    <span ng-bind="item.name"></span>
                                </ui-select-choices>
                            </ui-select>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.District"
                        nc-label="District"
                        nc-template-options-path="addShopAccountForm/District">
                            <ui-select name="District" ng-model="formData.District" search-enabled="false">
                                <ui-select-match placeholder="- Select District -">
                                    <span ng-bind="$select.selected.name"></span>
                                </ui-select-match>
                                <ui-select-choices repeat="item.value as item in districts">
                                    <span ng-bind="item.name"></span>
                                </ui-select-choices>
                            </ui-select>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.PostalCode"
                        nc-template-options-path="addShopAccountForm/PostalCode"
                        nc-label="Postal Code">
                            <input name="PostalCode" ng-model="formData.PostalCode" />
                    </div>
                    <div class="margin-top-40"
                        nc-template="common/input/form-group-with-label"
                        nc-template-form="form.PhoneNumber"
                        nc-template-options-path="addShopAccountForm/PhoneNumber"
                        nc-label="Phone Number">
                            <input name="PhoneNumber" ng-model="formData.PhoneNumber" ng-pattern-restrict="[0-9]*"/>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.FaxNumber"
                        nc-template-options-path="addShopAccountForm/FaxNumber"
                        nc-label="Fax Number">
                            <input name="FaxNumber" ng-model="formData.FaxNumber" ng-pattern-restrict="[0-9]*"/>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.RemittanceFaxNumber"
                        nc-template-options-path="addShopAccountForm/RemittanceFaxNumber"
                        nc-label="Remittance Fax Number">
                            <input name="RemittanceFaxNumber" ng-model="formData.RemittanceFaxNumber" ng-pattern-restrict="[0-9]*"/>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.Telex"
                        nc-template-options-path="addShopAccountForm/Telex"
                        nc-label="Telex">
                            <input name="Telex" ng-model="formData.Telex"/>
                    </div>
                    <div class="margin-top-40"
                        nc-template="common/input/form-group-with-label"
                        nc-template-form="form.ContactPersonFirstName"
                        nc-template-options-path="addShopAccountForm/ContactPersonFirstName"
                        nc-label="Contact Person First Name">
                            <input name="ContactPersonFirstName" ng-model="formData.ContactPersonFirstName"/>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.ContactPersonLastName"
                        nc-template-options-path="addShopAccountForm/ContactPersonLastName"
                        nc-label="Contact Person Last Name">
                            <input name="ContactPersonLastName" ng-model="formData.ContactPersonLastName"/>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.Email"
                        nc-template-options-path="addShopAccountForm/Email"
                        nc-label="Email Address">
                            <input name="Email" ng-model="formData.Email"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header"><h2>Financial Information</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.TaxPayerId"
                        nc-label="Tax Payer ID"
                        nc-template-options-path="addShopAccountForm/TaxPayerId">
                           <input class="form-control" name="TaxPayerId" type="text" ng-model="formData.TaxPayerId" required/>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.TermOfPayment"
                        nc-label="Term of Payment"
                        nc-template-options-path="addShopAccountForm/TermOfPayment">
                            <ui-select name="TermOfPayment" ng-model="formData.TermOfPayment" search-enabled="false" required>
                                <ui-select-match placeholder="- Select Term of Payment -">
                                    <span ng-bind="$select.selected.name"></span>
                                </ui-select-match>
                                <ui-select-choices repeat="item.value as item in termOfPayments">
                                    <span ng-bind="item.name"></span>
                                </ui-select-choices>
                            </ui-select>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.Payment"
                        nc-label="Payment"
                        nc-template-options-path="addShopAccountForm/Payment">
                            <input type="radio" name="Payment" ng-model="formData.Payment" value="1" required/> Check
                            <br/>
                            <input type="radio" name="Payment" ng-model="formData.Payment" value="2" required/> EFT
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.VendorTaxRate"
                        nc-label="Term of Payment"
                        nc-template-options-path="addShopAccountForm/VendorTaxRate">
                            <ui-select name="VendorTaxRate" ng-model="formData.VendorTaxRate" search-enabled="false" ng-disabled="true" required>
                                <ui-select-match placeholder="- Select Vendor Tax Rate -">
                                    <span ng-bind="$select.selected.name"></span>
                                </ui-select-match>
                                <ui-select-choices repeat="item.value as item in vendorTaxRates">
                                    <span ng-bind="item.name"></span>
                                </ui-select-choices>
                            </ui-select>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.WithholdingTax"
                        nc-label="Term of Payment"
                        nc-template-options-path="addShopAccountForm/WithholdingTax">
                            <ui-select name="WithholdingTax" ng-model="formData.WithholdingTax" search-enabled="false" ng-disabled="true" required>
                                <ui-select-match placeholder="- Select Withholding Tax -">
                                    <span ng-bind="$select.selected.name"></span>
                                </ui-select-match>
                                <ui-select-choices repeat="item.value as item in withholdingTaxes">
                                    <span ng-bind="item.name"></span>
                                </ui-select-choices>
                            </ui-select>
                    </div>
                    <div class="margin-top-10" 
                        nc-template="common/input/form-group-with-label"
                        nc-template-form="form.BankName"
                        nc-label="Bank Name"
                        nc-template-options-path="addShopAccountForm/BankName">
                           <input class="form-control" name="BankName" type="text" ng-model="formData.BankName" ng-disabled="true" required/>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.BankAccountNumber"
                        nc-label="Bank Account Number"
                        nc-template-options-path="addShopAccountForm/BankAccountNumber">
                           <input class="form-control" name="BankAccountNumber" type="text" ng-model="formData.BankAccountNumber" ng-disabled="true" required/>
                    </div>
                    <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.BankAccountName"
                        nc-label="Bank Account Name"
                        nc-template-options-path="addShopAccountForm/BankAccountName">
                           <input class="form-control" name="BankAccountName" type="text" ng-model="formData.BankAccountName" ng-disabled="true" required/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <p class="text-align-right"><span class="color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
        </div>
    </div>
</div>