<nav class="header">
 <div class="container-fluid">
  <ul class="nav navbar-nav navbar-left" ng-if="Profile.User.IsAdmin">
    <li class="dropdown header-font-detail"><strong>Administration System</strong></li>
  </ul>
    <ul class="nav navbar-nav navbar-right">
      <li class="dropdown header-font-detail">
        <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span>{{ Profile.User.NameEn }}</span>
          <i class="fa fa-angle-down"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a ng-click="changePassword()">Change Password</a></li>
            <li><a href="#" ng-click="logout()">Logout</a></li>
          </ul>
        </li>

        <li class="dropdown header-font-detail" ng-if="!Imposter && !Profile.User.IsAdmin">
          <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span>{{ Profile.Shop.ShopNameEn }}</span>
          <i class="fa fa-angle-down"></i>
          </a>
          <ul class="dropdown-menu" ng-if="Profile.Shop">
            <li><a href="/shops/settings">Status: <span class="{{asShopStatus(Profile.Shop.Status).color}}">{{asShopStatus(Profile.Shop.Status).name}}</span></a></li>
            <li role="separator" class="divider"></li>
            <li><a href="http://www.central.co.th" target="_blank">View Storefront</a></li>
            <li><a href="/shops/settings">View Shop Profile</a></li>
          </ul>
         </li>

         <li class="dropdown header-font-detail" ng-if="Imposter">
          <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span><strong>Logged in As {{ Imposter.NameEn }}</strong></span>
          <i class="fa fa-angle-down"></i>
          </a>
          <ul class="dropdown-menu">
             <li><a href="#" ng-click="logout()">Log Out of {{ Imposter.NameEn }}</a></li>
          </ul>
         </li>

    </ul>
 </div>
</nav>

<? $this->insert('components/modal-change-password', ['id' => 'change-password-modal', 'header' => 'Change Password']) ?>
