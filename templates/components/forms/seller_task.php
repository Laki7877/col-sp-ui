<div class="home_task home_task_space <?=$home_task_container_class?>" <?=$task_display?>>
  <div class="image-thumbs-img-wrapper" ng-show="!onLoadingFlag">
      <img class="logo-imgx" src="<?= $this->asset('/assets/img/'.$image_name.'.png') ?>" />
  </div>
  <div class="home_task_text">
    <div class="empty-section margin-top-20 margin-bottom-20" ng-show="onLoadingFlag">
        <i class="fa fa-spinner fa-spin color-theme"></i>

    </div>
    <div class="font-size-18" ng-show="!onLoadingFlag"><?=$field_header?></div>
    <div class="color-dark-grey" ng-show="!onLoadingFlag"><?=$field_text?></div>
  </div>
  <div class="loading_text" ng-show="onLoadingFlag">Loading...</div>
  <div class="home_task_button" ng-show="!onLoadingFlag">
    <div>
      <? if(!isset($type))
         $type = 'normal';
      ?>
      <? if($type == 'launch'): ?>
        <a class="btn btn-white btn-width-xxl" ng-click='launchShop()' ng-disabled='!checkBeforeLaunch' type="button"><?=$button_text?></a>
      <? elseif($type == 'changePassword'): ?>
        <a class="btn btn-white btn-width-xxl" ng-click='changePassword()' type="button"><?=$button_text?></a>
      <? elseif($type == 'redirectProduct'): ?>
        <a class="btn btn-white btn-width-xxl" ng-click='redirectToProducts()' type="button"><?=$button_text?></a>
      <? elseif($type == 'redirectShopSetting'): ?>
        <a class="btn btn-white btn-width-xxl" ng-click='redirectToShopSetting()' type="button"><?=$button_text?></a>
      <? elseif($type == 'redirectShopAppearance'): ?>
        <a class="btn btn-white btn-width-xxl" ng-click='redirectToShopAppearance()' type="button"><?=$button_text?></a>
      <? elseif($type == 'redirectUserAccounts'): ?>
        <a class="btn btn-white btn-width-xxl" ng-click='redirectToUserAccounts()' type="button"><?=$button_text?></a>
      <? elseif($type == 'redirectDashboard'): ?>
        <a class="btn btn-white btn-width-xxl" ng-click='redirectToDashboard()' type="button"><?=$button_text?></a>
      <? elseif($type == 'redirectStore'): ?>
        <a class="btn btn-white btn-width-xxl" ng-click='redirectToStore()' type="button"><?=$button_text?></a>

      <? else: ?>
        <a class="btn btn-white btn-width-xxl" <?=$disble_status?> type="button"><?=$button_text?></a>
      <? endif; ?>
    </div>
  </div>
</div>
