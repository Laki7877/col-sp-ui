
<nav class="header">
 <div class="container-fluid">
    <span class="header-font-subject">
        {{ $root.Profile.Shop.ShopNameEn }}
    </span>

    <ul class="nav navbar-nav navbar-right">
      <li class="dropdown header-font-detail">
        <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span>{{ $root.Profile.User.Email }}</span> 
          <i class="fa fa-angle-down"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a href='#' data-toggle='modal' data-target='#change-password-modal'>Change Password</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </li>
        <li class="dropdown header-font-detail">
          <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span>My Shop</span> 
          <i class="fa fa-angle-down"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#">Status: <span class="color-red">Inactive</span></a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">View Storefront</a></li>
            <li><a href="#">View Shop Profile</a></li>
          </ul>
      </li>
    </ul>
 </div>
</nav>

<? $this->insert('components/modal-change-password', ['id' => 'change-password-modal', 'header' => 'Change Password']) ?>


