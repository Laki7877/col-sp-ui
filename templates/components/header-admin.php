<nav class="header">
 <div class="container-fluid">
    <span class="header-font-subject">Administration System</span>

    <ul class="nav navbar-nav navbar-right">
	<li class="dropdown header-font-detail">
	<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
	  <span>{{ $root.Profile.User.NameEn }}</span> 
	  <i class="fa fa-angle-down"></i>
	  </a>
	  <ul class="dropdown-menu">
	    <li><a href='#' data-toggle='modal' data-target='#change-password-modal'>Change Password</a></li>
	    <li><a href="#">Logout of Natt Phenjati</a></li>
	  </ul>
	</li>
       <li class="header-font-detail">
	  <strong>Logged in As Natt Phenjati</strong> 
        </li>

    </ul>
 </div>
</nav>

<? $this->insert('components/modal-change-password', ['id' => 'change-password-modal', 'header' => 'Change Password']) ?>


