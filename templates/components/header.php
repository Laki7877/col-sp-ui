<div class="header container-fluid">
    <span class="header-font-subject">
        Lara Thailand
    </span>
    <span class="header-font-detail">
        <span>user1@lara.co.th</span>
        <i class="fa fa-angle-down" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                  <div class='text-nowrap'><a href='#'>View Shop Profile</a></div>
                  <div class='text-nowrap'><a href='#' data-toggle='modal' data-target='#change-password-modal'>Change Password</a></div>
                  <div class='text-nowrap'><a href='?p=login'>Logout</a></div>
                  "></i>
    </span>
    <span class="header-font-detail margin-right-20">
        <span>View your store</span>
        <i class="fa fa-angle-down"></i>
    </span>

</div>
<? $this->insert('components/modal-change-password', ['id' => 'change-password-modal', 'header' => 'Change Password']) ?>


