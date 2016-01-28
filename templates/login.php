<?php $this->layout('layouts/page-plain', ['title' => 'Login']) ?>

<?php $this->start('page-body') ?>
  <div class="login-page">
    <div class="logo-img-wrapper">
      <img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
    </div>
    <div class="form-login">
      <form>
        <fieldset class="form-group">
          <label for="formGroupExampleInput">Username:</label>
          <input type="text" class="form-control" id="formGroupExampleInput">
        </fieldset>
        <fieldset class="form-group margin-bottom-30">
          <label for="formGroupExampleInput2">Password:</label>
          <input type="password" class="form-control" id="formGroupExampleInput2">
        </fieldset>
        <fieldset class="form-group">
          <button class="btn btn-blue btn-100">Login</button>
        </fieldset>
        <fieldset class="form-group text-center">
          <a href="" data-toggle="modal" data-target="#forget-password">Forget password?</a>
        </fieldset>
      </form>
    </div>
  </div>

  <? $this->insert('components/modal-forget-password', ['id' => 'forget-password', 'header' => 'Forget password?']) ?>



<?php $this->stop() ?>