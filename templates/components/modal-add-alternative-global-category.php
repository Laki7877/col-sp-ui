<?php
    $numberOfColumn = 4;
?>
<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
  <div class="modal-dialog modal-category-section column-<?=$numberOfColumn?>">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title"><?=$header?></h3>
      </div>
      <div class="modal-body">
            <div class="category-section column-<?=$numberOfColumn?>">
                <div class="category-section-border-box">
                    <div class="category-header">
                        <span class="required">Global Category</span>
                    </div>
                    <div class="category-content no-padding">
                        <ul ng-repeat="column in <?= $template ?> track by $index" ng-class="{'empty-column': column.list.length <= 0 }" class="content-column">
                            <li ng-repeat="row in (column.list | exclude: formData.GlobalCategories : 'NameEn') track by $index" ng-class="{'category-active' : $index == column.active }" ng-click="$emit('selectGlobalCat', row, $index, $parent.$index)" ng-cloak>{{row.NameEn}}</li>
                        </ul>
                    </div>
                </div>
                <div class="category-footer no-padding">
                    <span>Only shown categories that are allowed for this store.</span>
                    <span class="float-right">
                        <a class="link-btn-plain" data-dismiss="modal">Cancel</a>
                        <button type="button" class="btn btn-blue btn-width-xl" data-dismiss="modal" ng-click="$emit('saveGlobalCat')" ng-class="{'disabled' : !<?= $ng_model?> }">Select</button>
                    </span>
                </div>
            </div>
      </div>
    </div>
  </div>
</div>