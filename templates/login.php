<?php $this->layout('layouts/page-plain', ['title' => 'Login']) ?>

<?php $this->start('page-body') ?>
<div class="login-page" ng-controller="LoginCtrl">

	<div class="logo-img-wrapper">
		<img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
	</div>

	<form ng-submit="doLogin()" name="loginForm" novalidate>
		<div class="form-login" ng-cloak>
			<div ng-template="common/input/text2"
				ng-template-options="{
				'label': 'Email',
				'error' : {
				'messages': {
					required: 'Please enter your email address'
				},
				'show': isInvalid(loginForm.user),
				'conditions' : loginForm.user.$error 
				}
				}">
				<input
				class="form-control width-field-large"
				name="user" 
				ng-model="uform.user"
				ng-class="{ 'has-error' : isInvalid(loginForm.user) || (error && loginForm.$pristine) }"
				maxlength="300"
				required />
			</div>

			<div ng-template="common/input/text2"
				ng-template-options="{
				'label': 'Password',
				'error' : {
				'messages': {
					required: 'Please enter your password'
				},
				'show': isInvalid(loginForm.pass),
				'conditions' : loginForm.pass.$error
				}
				}">
				<input
				type="password"
				class="form-control width-field-large"
				name="pass"
				ng-model="uform.pass"
				ng-class="{ 'has-error' : isInvalid(loginForm.pass) || (error && loginForm.$pristine)  }"
				maxlength="300"
				required />
			</div>
			<div class="form-group margin-bottom-5" ng-if="error && loginForm.$pristine">
				<div class="width-label"></div>
				<div class="width-field-normal">
					<span class="help-block color-red text-center">Invalid Email or Password</span>
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
