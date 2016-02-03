<!-- <div class="header container-fluid">
    <span class="header-font-subject">
        {{ $root.Profile.Shop.ShopNameEn }}
    </span>
    <a class="header-font-detail">
        <span>{{ $root.Profile.User.Email }}</span>
        <i class="fa fa-angle-down" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                  <div class='text-nowrap'><a href='#'>View Shop Profile</a></div>
                  <div class='text-nowrap'><a href='#' data-toggle='modal' data-target='#change-password-modal'>Change Password</a></div>
                  <div class='text-nowrap'><a href='#'>Logout</a></div>
                  "></i>
    </a>

    <a class="header-font-detail margin-right-20">
        <span>View your store</span>
    </a>

</div> -->


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
            <li><a href="#">View Shop Profile</a></li>
            <li><a href='#' data-toggle='modal' data-target='#change-password-modal'>Change Password</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </li>
        <li class="dropdown header-font-detail">
          <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span>Storefront</span> 
          <i class="fa fa-angle-down"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#">View Storefront</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Status: <span class="color-red">Inactive</span></a></li>
            <li><a href='#'><span class="color-theme">Change to Active</span></a></li>
          </ul>
      </li>
    </ul>

     <!-- <a class="header-font-detail margin-right-20">
        <span>View Your Store</span>
    </a> -->

 </div>
</nav>

<? $this->insert('components/modal-change-password', ['id' => 'change-password-modal', 'header' => 'Change Password']) ?>


