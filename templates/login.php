<?php $this->layout('layouts/page-plain', ['title' => 'Login']) ?>

<?php $this->start('page-body') ?>
<div class="login-page" ng-controller="LoginCtrl">

	<div class="logo-img-wrapper">
		<img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
	</div>

	<form ng-submit="doLogin()" name="loginForm" novalidate>

		<div class="form-login">

			<div ng-cloak ng-show="alert.show" uib-alert template-url="common/alert" type="{{alert.type}}" close="alert.close()">
				{{alert.message}}
			</div>

			<div ng-template="common/input/text2"
				ng-template-options="{
				'label': 'Username',
				'error' : {
				'messages': {
					required: 'Please enter your email address'
				},
				'show': $root.isInvalid(loginForm.user),
				'conditions' : loginForm.user.$error 
				}
				}">
				<input
				class="form-control width-field-large"
				name="user" ng-model="uform.user"
				ng-class="{ 'has-error' : $root.isInvalid(loginForm.user) }"
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
				'show': $root.isInvalid(loginForm.pass),
				'conditions' : loginForm.pass.$error
				}
				}">
				<input
				type="password"
				class="form-control width-field-large"
				name="pass"
				ng-model="uform.pass"
				ng-class="{ 'has-error' : $root.isInvalid(loginForm.pass) }"
				maxlength="300"
				required />
			</div>

			<fieldset class="form-group">
				<button type="submit" class="btn btn-blue btn-100">Login<span class="login-loading" ng-cloak ng-show="loading"><i class="fa fa-spinner fa-spin" ></i></span></button>
			</fieldset>
			<fieldset class="form-group text-center">
				<a href="" data-toggle="modal" data-target="#forget-password">Forget password?</a>
			</fieldset>

		</div>
	</form>


</div>


<? $this->insert('components/modal-forget-password', ['id' => 'forget-password', 'header' => 'Forget password?']) ?>

<?php $this->stop() ?>
