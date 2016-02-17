<div id="add-product-approval-list-content">
    <!--	
  <div class="row">
    <div class="col-xs-12">
      <div class="form-section">
        <div class="form-section-header"><h2>Advanced Search</h2></div>
        <div class="form-section-content">
          <? $this->insert('components/forms/input-text-with-label', ["label" => "Product Name", ]) ?>
          <? $this->insert('components/forms/input-text-with-label', ["label" => "PID" ]) ?>
          <? $this->insert('components/forms/dropdown_tags', ["label" => "Brand Name", "default_choices" => ["Gulp", "Adico"], "choices" => ["Gulp", "Adico","Pascal"] ]) ?>
          <? $this->insert('components/forms/input-text-with-label', ["label" => "Global Category Name" ]) ?>
          <? $this->insert('components/forms/input-text-with-label', ["label" => "Shop Name" ]) ?>
          <? $this->insert('components/forms/input_tags', ["label" => "Search Tag", "default_choices" => ["Gulp", "Adico"], "choices" => ["Gulp", "Adico","Pascal"] ]) ?>
          <? $this->insert('components/forms/input_from_to', ["label" => "Price", "label_extend" => "To" ]) ?>
          <? $this->insert('components/forms/input_from_to', ["label" => "Created Date", "input_class" => "input-icon-calendar", "label_extend" => "To" ]) ?>
          <? $this->insert('components/forms/input_from_to', ["label" => "Modified Date", "input_class" => "input-icon-calendar", "label_extend" => "To" ]) ?>
          <div class="form-group">
            <div class="width-label"><label class="control-label"></label></div>
            <div class="button-size-normal">
              <a class="button-size-normal btn btn-blue btn-width-xl">Search</a>
            </div>
            <div class="button-size-normal">
              <a class="button-size-normal margin-left-10 btn btn-white btn-width-xl">Clear</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>-->
    <div class="row">
        <div class="col-xs-12">
            <div class="form-section margin-bottom-0">
                <div class="form-section-content margin-filter">


                    <div nc-template="common/input/form-group-with-label" nc-label="Product Status" nc-template-form="addProductForm.Keywords">
                        <div class="ah-select2-dropdown">
                            <select ng-model="p" class="form-control" ng-init="p = {text:'All', value: 'All'}" ng-options="i as i.text for i in [{ text: 'All', value: 'All'}] track by i.value" required>
                            </select>
                        </div>
                    </div>

                    <div class="form-group margin-bottom-0">
                        <div class="filter-section filter-input">
                            <div class="filter-container-input">
                                <span>Filters:</span>
                                <a class="filter-first-option first-label filter-active">None</a>
                                <a class="filter-seperator">Information</a>
                                <a class="filter-seperator">Image</a>
                                <a class="filter-seperator">Variation</a>
                                <a class="filter-seperator">More</a>
                                <a class="filter-seperator">Ready for Action</a>
                            </div>
                        </div>
                        <!--<nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="table-section">
        <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="params.searchText.length > 0">
            <table class="table table-curved">
                <thead>
                    <tr class="table-head">
                        <th class="checkbox-column">
                            <nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox>
                        </th>
                        <th></th>
                        <th nc-sort="ProductNameEn">Product Name </th>
                        <th nc-sort="Shop">Shop</th>
                        <th nc-sort="OriginalPrice">Info.</th>
                        <th nc-sort="Status">Img.</th>
                        <th nc-sort="Status">Cat.</th>
                        <th nc-sort="Status">Var.</th>
                        <th nc-sort="Status">More.</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th nc-sort="UpdatedDt" >Submitted</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="row in list.data">
                        <td class="checkbox-column">
                            <nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox>
                        </td>
                        <td class="display-column">
                            <div class="img-holder">
                                <img ng-if='!row.ImageUrl' class="logo-img" src="<?= $this->asset('/assets/img/placeholder-no-image.png') ?>" />
                                <img ng-if='row.ImageUrl' class="logo-img" src="{{ row.ImageUrl }}" />
                            </div>
                        </td>
                        <td class="column-text-ellipsis" nc-link="/admin/products/{{row.ProductId}}">
                            {{row.ProductNameEn}}
                        </td>
                        <td>{{row.Shop.ShopNameEn}}</td>
                        <td> <span class="{{ asStatus(row.InformationTabStatus).color }}"><i class="fa fa-circle"></i></span></td>
                        <td>
                            <span class="{{ asStatus(row.CategoryTabStatus).color }}"><i class="fa fa-circle"></i></span>
                        </td>
                        <td> <span class="{{ asStatus(row.CategoryTabStatus).color }}"><i class="fa fa-circle"></i></span> </td>
                        <td>
                            <span class="{{ asStatus(row.VariantTabStatus).color }}"><i class="fa fa-circle"></i></span>
                        </td>
                        <td> <span class="{{ asStatus(row.MoreOptionTabStatus).color }}"><i class="fa fa-circle"></i></span> </td>
                        <td>
                            <span class="{{ asStatus(row.Status).color }}"><i class="fa" ng-class="asStatus(row.Status).icon "></i> {{ asStatus(row.Status).name }} </span>
                        </td>
                        <td><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
                        <td>{{row.UpdatedDt | dateTh }}</td>
                    </tr>
                </tbody>
            </table>
        </nc-table>
        <nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
    </div>

</div>