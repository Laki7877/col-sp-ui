<div id="create_cms_schedulers_tab_content">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header">
                    <h2>CMS Master Schedulers</h2>
                </div>
                <div class="form-section-content">
                    <div class="form-group">
                        <div class="width-label">
                            <label class="control-label">Effective On</label>
                        </div>
                        <div class="width-field-normal">
                            <div class="dropdown">
                                <a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
                                    <input readonly style="background-color:white" type="text" ng-class="{'has-error': formData.ExpireDate <= formData.EffectiveDate }" placeholder="Select date and time when cms will go online" class="input-icon-calendar form-control" value="{{ formData.EffectiveDate | date: 'dd/MM/yy HH:mm' }}" />
                                </a>
                                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                    <datetimepicker data-ng-model="formData.EffectiveDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'hour' }" />
                                </ul>
                            </div>
                            <span class="help-block"></span>
                        </div>
                        <div class="width-field-tooltip no-padding-left">
                            <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter" uib-tooltip="Date when your cms will go online"></i>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="width-label">
                            <label class="control-label">Expire On</label>
                        </div>
                        <div class="width-field-normal">
                            <div class="dropdown">
                                <a class="dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" data-target="#" href="#">
                                    <input readonly style="background-color:white" type="text" placeholder="Select date and time when cms will go offline" class="input-icon-calendar form-control" name="ExpiryDate" ng-class="{'has-error': formData.ExpiryDate <= formData.EffectiveDate }" value="{{ formData.ExpiryDate | date: 'dd/MM/yy HH:mm' }}">
                                </a>
                                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                    <datetimepicker data-ng-model="formData.ExpiryDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown3', minView: 'hour' }" />
                                </ul>
                            </div>
                            <div class="width-field-large">
                                <span class="help-block color-red" ng-if="formData.ExpiryDate <= formData.EffectiveDate">
                                    <span>Effective date/time must come before expire date/time</span>
                                </span>
                            </div>

                        </div>
                        <div class="width-field-tooltip no-padding-left">
                            <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter" uib-tooltip="Date when your cms will go offline"></i>
                        </div>
                    </div>

                </div>


            </div>
            <!--
            <div class="form-group">
                <div class="col-sm-offset-6 col-sm-10">
                    <button ng-click="addItem()" class="btn btn-primary">Add to list</button>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12" style="text-align: right">
                    <h3>Total: {{getTotalItems()}}</h3>
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
                            <td>{{item.CreditCardTypeText}}</td>
                            <td>{{item.CreditNumberFormat}}</td>
                            <td>
                                <a ng-click="removeItems($item,$index)" class="btn btn-mini btn-danger">Delete</button>
                            </td>
                        </tr>
                            </tbody>
                    </table>
                </div>
            </div>-->
        </div>
    </div>
</div>

