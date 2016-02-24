<div id="create_coupon_information_tab_content">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Credit Card Number Condition</h2>
                </div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Card Type">
                        <div class="ah-select2-dropdown">
                            <select ng-model="formData.Conditions.Card[0].Id" class="form-control" required="">
                                <option ng-repeat="opt in dataSet.criteria" value="{{ opt.value }}">
                  {{ opt.text }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div ng-show="formData.Conditions.Card[0].Id == '15A'" ng-init="formData.Conditions.Card[0].Id = '0'" nc-template="common/input/form-group-with-label" nc-label="Format" nc-template-options-path="PromotionForm/Format15AValue">
                        <input type="text" ng-model="formData.Conditions.Card[0].Value" class="form-control" placeholder="34XXXXXXXXXXXXX or 37XXXXXXXXXXXXX" />
                    </div>
                    <div ng-show="formData.Conditions.Card[0].Id == '14D'" ng-init="formData.Conditions.Card[0].Id = '0'" nc-template="common/input/form-group-with-label" nc-label="Format" nc-template-options-path="PromotionForm/Format14DValue">
                        <input type="text" ng-model="formData.Conditions.Card[0].Value" class="form-control" placeholder="PREFIX: 300 to 305, 36" />
                    </div>
                    <div ng-show="formData.Conditions.Card[0].Id == '14C'" ng-init="formData.Conditions.Card[0].Id = '0'" nc-template="common/input/form-group-with-label" nc-label="Format" nc-template-options-path="PromotionForm/Format14CValue">
                        <input type="text" ng-model="formData.Conditions.Card[0].Value" class="form-control" placeholder="38XXXXXXXXXXXX" value="38XXXXXXXXXXXX" />
                    </div>
                    <div ng-show="formData.Conditions.Card[0].Id == '16D'" ng-init="formData.Conditions.Card[0].Id = '0'" nc-template="common/input/form-group-with-label" nc-label="Format" nc-template-options-path="PromotionForm/Format16DValue">
                        <input type="text" ng-model="formData.Conditions.Card[0].Value" class="form-control" placeholder="6011XXXXXXXXXXXX" value="6011XXXXXXXXXXXX" />
                    </div>
                    <div ng-show="formData.Conditions.Card[0].Id == '15E'" ng-init="formData.Conditions.Card[0].Id = '0'" nc-template="common/input/form-group-with-label" nc-label="Format" nc-template-options-path="PromotionForm/Format15EValue">
                        <input type="text" ng-model="formData.Conditions.Card[0].Value" class="form-control" placeholder="2014XXXXXXXXXX, 2149XXXXXXXXXX " />
                    </div>
                    <div ng-show="formData.Conditions.Card[0].Id == '16J'" ng-init="formData.Conditions.Card[0].Id = '0'" nc-template="common/input/form-group-with-label" nc-label="Format" nc-template-options-path="PromotionForm/Format16JValue">
                        <input type="text" ng-model="formData.Conditions.Card[0].Value" class="form-control" placeholder="3XXXXXXXXXXXXXXX" />
                    </div>
                    <div ng-show="formData.Conditions.Card[0].Id == '15J'" ng-init="formData.Conditions.Card[0].Id = '0'" nc-template="common/input/form-group-with-label" nc-label="Format" nc-template-options-path="PromotionForm/Format15JValue">
                        <input type="text" ng-model="formData.Conditions.Card[0].Value" class="form-control" placeholder="2131XXXXXXXXXXX or 1800XXXXXXXXXXX" />
                    </div>
                    <div ng-show="formData.Conditions.Card[0].Id == '16M'" ng-init="formData.Conditions.Card[0].Id = '0'" nc-template="common/input/form-group-with-label" nc-label="Format" nc-template-options-path="PromotionForm/Format16MValue">
                        <input type="text" ng-model="formData.Conditions.Card[0].Value" class="form-control" placeholder="PREFIX: 51 to 55" />
                    </div>
                    <div ng-show="formData.Conditions.Card[0].Id == '13V'" ng-init="formData.Conditions.Card[0].Id = '0'" nc-template="common/input/form-group-with-label" nc-label="Format" nc-template-options-path="PromotionForm/Format13VValue">
                        <input type="text" ng-model="formData.Conditions.Card[0].Value" class="form-control" placeholder="4XXXXXXXXXXXX" value="4XXXXXXXXXXXX" />
                    </div>
                    <div ng-show="formData.Conditions.Card[0].Id == '16V'" ng-init="formData.Conditions.Card[0].Id = '0'" nc-template="common/input/form-group-with-label" nc-label="Format" nc-template-options-path="PromotionForm/Format16VValue">
                        <input type="text" ng-model="formData.Conditions.Card[0].Value" class="form-control" placeholder="4XXXXXXXXXXXXXXX" />
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-6 col-sm-10">
                            <button ng-click="addItem()" class="btn btn-primary">Add to list</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-12" style="text-align: right">
                            <h3>Total Items: {{getTotalItems()}}</h3>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <table class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>Card Type</th>
                                    <th>Card Format</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr ng-repeat="item in items">
                                    <td>{{item.Type}}</td>
                                    <td>{{item.Value}}</td>
                                    <td>
                                        <a ng-click="removeItems($item,$index)" class="btn btn-mini btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>







    </div>
