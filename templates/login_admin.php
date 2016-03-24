<?php $this->layout('layouts/page-plain', ['title' => 'Login']) ?>

<?php $this->start('page-body') ?>
<div class="login-page" ng-controller="AdminLoginCtrl">

	<div class="logo-img-wrapper">
		<img class="logo-img" src="<?= $this->asset('/assets/img/login_logo_admin.png') ?>" />
	</div>
	<form ng-submit="doLogin()" name="loginForm" novalidate>
		<div class="form-login" ng-cloak>
			<nc-alert nc-model="alert"></nc-alert>
			<div ng-template="common/input/text2"
				ng-template-options="{
					'label': 'Email'
				}">
				<input
				class="form-control width-field-large"
				name="user"
				ng-model="uform.user"
				ng-class="{ 'has-error' : (events.user === false && loginForm.user.$invalid) || (error && loginForm.$pristine) }"
				maxlength="300"
				ng-focus="events.user=true"
				ng-blur="events.user=false"
				required />
			</div>

			<div ng-template="common/input/text2"
				ng-template-options="{
					'label': 'Password'
				}">
				<input
				type="password"
				class="form-control width-field-large"
				name="pass"
				ng-model="uform.pass"
				ng-class="{ 'has-error' : (events.pass === false && loginForm.pass.$invalid) || (error && loginForm.$pristine)  }"
				maxlength="300"
				ng-focus="events.pass=true"
				ng-blur="events.pass=false"
				required />
			</div>
			<div class="form-group" ng-if="error && loginForm.$pristine">
				<div class="width-label"></div>
				<div class="width-field-normal">
					<span class="help-block color-red text-center margin-bottom-0">Invalid Email or Password</span>
				</div>
			</div>
			<fieldset class="form-group margin-top-30">
				<button type="submit" class="btn btn-blue btn-100"><span class="login-loading" ng-cloak ng-show="loading"><i class="fa fa-spinner fa-spin" ></i></span> Login</button>
			</fieldset>
			<fieldset class="form-group text-center">
				<a href="" data-toggle="modal" data-target="#forget-password">Forget password?</a>
			</fieldset>

		</div>
	</form>


</div>


<? $this->insert('components/modal-forget-password', ['id' => 'forget-password', 'header' => 'Forget password?']) ?>

<?php $this->stop() ?>
