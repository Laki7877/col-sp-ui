<div id="create_cms_collection_item">

    <div class="row">
        <div class="col-xs-12">

          <div class="form-section">
            <div class="form-section-header">
              <h2>Product Item in This Category</h2>
            </div>
            
            <div class="form-section-content">

              <div ng-repeat="(listName, list) in models.lists" class="col-md-6">
                <div class="form-section">
                  <div class="form-section-header">
                    <h2>List {{listName}}</h2>
                  </div>

                  <div class="form-section-content">
                    <ul dnd-list="list">
                      <li ng-repeat="item in list"
                          dnd-draggable="item"
                          dnd-moved="list.splice($index, 1)"
                          dnd-effect-allowed="move"
                          dnd-selected="models.selected = item"
                          ng-class="{'selected': models.selected === item}">
                        {{item.label}}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
    </div>
</div>
