<?php $this->layout('layouts/page-plain', ['title' => 'Login']) ?>

<?php $this->start('page-body') ?>
  <div class="login-page" ng-controller="LoginCtrl">

    <div class="logo-img-wrapper">
      <img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
    </div>

    <form ng-submit="doLogin()">

    <div class="form-login">
        <div ng-show="alert.show" uib-alert template-url="common/alert" type="{{alert.type}}" close="alert.close()">
            {{alert.message}}
        </div>
        <div ng-show="!loading">
          <fieldset class="form-group">
            <label for="formGroupExampleInput">Username:</label>
            <input type="text" class="form-control" ng-model="user" id="formGroupExampleInput">
          </fieldset>
          <fieldset class="form-group margin-bottom-30">
            <label for="formGroupExampleInput2">Password:</label>
            <input type="password" class="form-control" ng-model="pass" id="formGroupExampleInput2">
          </fieldset>
          <fieldset class="form-group">
            <button type="submit" class="btn btn-blue btn-100">Login</button>
          </fieldset>
          <fieldset class="form-group text-center">
            <a href="" data-toggle="modal" data-target="#forget-password">Forget password?</a>
          </fieldset>
        </div>
         <div class="row" ng-show="loading">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                 <img src="/assets/img/loader.gif" width="55"/>
            </div>  
            <div class="col-md-4"></div>
         </div>
    </div>
    </form>


  </div>


  <? $this->insert('components/modal-forget-password', ['id' => 'forget-password', 'header' => 'Forget password?']) ?>

<?php $this->stop() ?>