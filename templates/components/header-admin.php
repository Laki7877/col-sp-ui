<nav class="header">
    <div class="container-fluid">
<!--         <span class="header-font-subject">Administration System</span>
 -->
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown header-font-detail">
                <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <span>{{ $root.Profile.User.NameEn }}</span>
                    <i class="fa fa-angle-down"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><a href='#' data-toggle='modal' data-target='#change-password-modal'>Change Password</a></li>
                    <li><a href="#" ng-click="$root.logout()">Logout</a></li>
                </ul>
            </li>
            <li class="dropdown header-font-detail">
                <a class="dropdown-toggle" href=""><strong>Administration System</strong></a>
            </li>

            <li class="dropdown header-font-detail" ng-if="$root.Imposter">
                <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <span><strong>Logged in As {{ $root.Imposter.NameEn }}</strong></span>
                    <i class="fa fa-angle-down"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="#" ng-click="$root.logout()">Log Out of {{ $root.Imposter.NameEn }}</a></li>
                </ul>
            </li>
        </ul>
    </div>
</nav>

<? $this->insert('components/modal-change-password', ['id' => 'change-password-modal', 'header' => 'Change Password']) ?>
